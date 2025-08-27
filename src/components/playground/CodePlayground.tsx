import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, Square, Download, Share2, Settings, Code } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import { LoadingSpinner } from '../ui';

interface CodePlaygroundProps {
  initialCode?: string;
  language?: 'javascript' | 'python';
  onCodeChange?: (code: string) => void;
  onExecutionComplete?: (result: any) => void;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
}

interface ExecutionResult {
  output: string;
  error?: string;
  executionTime: number;
  memoryUsage?: number;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode = '',
  language = 'javascript',
  onCodeChange,
  onExecutionComplete,
  theme = 'light',
  readOnly = false
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 14,
    minimap: true,
    wordWrap: 'on' as 'on' | 'off',
    lineNumbers: 'on' as 'on' | 'off'
  });
  
  const workerRef = useRef<Worker | null>(null);
  const editorRef = useRef<any>(null);

  // Initialize Web Worker for safe code execution
  useEffect(() => {
    if (typeof Worker !== 'undefined' && !workerRef.current) {
      // Create inline worker for code execution
      const workerCode = `
        let tf;
        let lodash;
        let d3;
        
        // Import libraries dynamically
        self.addEventListener('message', async function(e) {
          const { code, language, imports } = e.data;
          
          try {
            const startTime = performance.now();
            let result;
            let logs = [];
            
            // Capture console outputs
            const originalLog = console.log;
            console.log = (...args) => {
              logs.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              ).join(' '));
            };
            
            if (language === 'javascript') {
              // Create a safe execution context
              const safeGlobals = {
                Math,
                Date,
                JSON,
                Array,
                Object,
                String,
                Number,
                Boolean,
                console: { log: console.log },
                performance,
                tf: tf,
                _: lodash,
                d3: d3
              };
              
              // Execute JavaScript code safely
              const func = new Function(...Object.keys(safeGlobals), code);
              result = func(...Object.values(safeGlobals));
            }
            
            const endTime = performance.now();
            const executionTime = endTime - startTime;
            
            // Restore console.log
            console.log = originalLog;
            
            self.postMessage({
              success: true,
              output: logs.join('\\n') || (result !== undefined ? String(result) : 'Execution completed'),
              executionTime,
              result
            });
            
          } catch (error) {
            self.postMessage({
              success: false,
              error: error.message,
              stack: error.stack
            });
          }
        });
      `;
      
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      workerRef.current = new Worker(URL.createObjectURL(blob));
    }
    
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const executeCode = useCallback(async () => {
    if (!workerRef.current || isRunning) return;
    
    setIsRunning(true);
    setOutput(null);
    
    const startTime = performance.now();
    
    try {
      // Send code to worker for execution
      workerRef.current.postMessage({
        code,
        language,
        imports: ['tensorflow', 'lodash', 'd3']
      });
      
      // Listen for worker response
      const handleWorkerMessage = (e: MessageEvent) => {
        const { success, output: workerOutput, error, executionTime, result } = e.data;
        
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        
        const executionResult: ExecutionResult = {
          output: success ? workerOutput : '',
          error: success ? undefined : error,
          executionTime: executionTime || totalTime
        };
        
        setOutput(executionResult);
        setIsRunning(false);
        
        if (onExecutionComplete) {
          onExecutionComplete({ result, executionTime: totalTime });
        }
        
        // Clean up listener
        workerRef.current?.removeEventListener('message', handleWorkerMessage);
      };
      
      workerRef.current.addEventListener('message', handleWorkerMessage);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        if (isRunning) {
          setOutput({
            output: '',
            error: 'Execution timed out after 10 seconds',
            executionTime: 10000
          });
          setIsRunning(false);
        }
      }, 10000);
      
    } catch (error) {
      setOutput({
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: performance.now() - startTime
      });
      setIsRunning(false);
    }
  }, [code, language, isRunning, onExecutionComplete]);

  const handleCodeChange = useCallback((value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  }, [onCodeChange]);

  const stopExecution = useCallback(() => {
    if (workerRef.current && isRunning) {
      workerRef.current.terminate();
      
      // Reinitialize worker
      const workerCode = `
        self.addEventListener('message', function(e) {
          // Worker reinitialized
        });
      `;
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      workerRef.current = new Worker(URL.createObjectURL(blob));
      
      setIsRunning(false);
      setOutput({
        output: '',
        error: 'Execution stopped by user',
        executionTime: 0
      });
    }
  }, [isRunning]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `playground-code.${language === 'javascript' ? 'js' : 'py'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [code, language]);

  const shareCode = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Algorithm Playground Code',
          text: 'Check out this algorithm implementation',
          url: window.location.href
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(code);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(code);
      // You could show a toast notification here
    }
  }, [code]);

  const handleEditorDidMount = useCallback((editor: any) => {
    editorRef.current = editor;
    
    // Add keyboard shortcuts
    editor.addAction({
      id: 'run-code',
      label: 'Run Code',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: executeCode
    });
  }, [executeCode]);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white dark:bg-gray-700 rounded-md p-1">
            <button
              onClick={isRunning ? stopExecution : executeCode}
              disabled={isLoading}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all ${
                isRunning 
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Square size={14} />
                  Stop
                </>
              ) : (
                <>
                  <Play size={14} />
                  Run
                </>
              )}
            </button>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'javascript' ? 'JavaScript' : 'Python'}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={downloadCode}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
            title="Download Code"
          >
            <Download size={16} />
          </button>
          
          <button
            onClick={shareCode}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
            title="Share Code"
          >
            <Share2 size={16} />
          </button>
          
          <button
            onClick={() => setSettings(prev => ({ ...prev, minimap: !prev.minimap }))}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
            title="Settings"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
      
      {/* Code Editor */}
      <div className="flex-1 flex">
        <div className="flex-1">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={handleCodeChange}
            onMount={handleEditorDidMount}
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            options={{
              fontSize: settings.fontSize,
              minimap: { enabled: settings.minimap },
              wordWrap: settings.wordWrap,
              lineNumbers: settings.lineNumbers,
              readOnly,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              folding: true,
              renderLineHighlight: 'all',
              selectionHighlight: true,
              bracketMatching: 'always',
              formatOnPaste: true,
              formatOnType: true
            }}
          />
        </div>
        
        {/* Output Panel */}
        <div className="w-1/3 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col">
          <div className="p-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-2">
              <Code size={16} />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Output</h3>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-auto">
            {isRunning && (
              <div className="flex items-center justify-center py-8">
                <LoadingSpinner />
                <span className="ml-2 text-gray-600 dark:text-gray-400">Executing...</span>
              </div>
            )}
            
            {output && (
              <div className="space-y-3">
                {output.error ? (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                    <div className="text-red-600 dark:text-red-400 font-medium text-sm mb-1">Error</div>
                    <pre className="text-red-700 dark:text-red-300 text-xs whitespace-pre-wrap font-mono">
                      {output.error}
                    </pre>
                  </div>
                ) : (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                    <div className="text-green-600 dark:text-green-400 font-medium text-sm mb-1">Output</div>
                    <pre className="text-gray-800 dark:text-gray-200 text-xs whitespace-pre-wrap font-mono">
                      {output.output || 'No output'}
                    </pre>
                  </div>
                )}
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
                  <div className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-1">Performance</div>
                  <div className="text-blue-700 dark:text-blue-300 text-xs">
                    Execution time: {output.executionTime.toFixed(2)}ms
                  </div>
                  {output.memoryUsage && (
                    <div className="text-blue-700 dark:text-blue-300 text-xs">
                      Memory: {(output.memoryUsage / 1024 / 1024).toFixed(2)}MB
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {!output && !isRunning && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Code size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Run your code to see output</p>
                <p className="text-xs mt-1 opacity-75">Ctrl/Cmd + Enter to execute</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;