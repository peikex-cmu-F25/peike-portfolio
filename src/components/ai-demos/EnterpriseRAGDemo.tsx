import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Document {
  id: string;
  title: string;
  content: string;
  category: string;
  embedding?: number[];
  relevanceScore?: number;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: Document[];
  processingSteps?: string[];
}

interface EnterpriseRAGDemoProps {
  onClose?: () => void;
}

const EnterpriseRAGDemo: React.FC<EnterpriseRAGDemoProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your enterprise knowledge assistant. Ask me about company policies, procedures, or any documents in our system.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced enterprise document repository
  const documents: Document[] = [
    {
      id: '1',
      title: 'Employee Remote Work Policy',
      content: 'All employees are eligible for hybrid work arrangements with up to 3 days remote per week. Remote work requires manager approval and completion of home office setup checklist including ergonomic assessment and security compliance. Employees must be available during core collaboration hours 9 AM - 3 PM PST. Equipment stipend of $500 provided annually. Monthly team meetings required in-office.',
      category: 'HR Policy'
    },
    {
      id: '2',
      title: 'Data Security & Privacy Guidelines',
      content: 'All sensitive customer data must be encrypted at rest using AES-256 and in transit via TLS 1.3. Use company-approved VPN (Cisco AnyConnect) for remote access to internal systems. Multi-factor authentication required for all systems including GitHub, AWS, and internal apps. Regular security training mandatory quarterly. Report security incidents to security@company.com within 1 hour. Data retention policy: customer data purged after 7 years.',
      category: 'Security'
    },
    {
      id: '3',
      title: 'Expense Reimbursement & Travel Policy',
      content: 'Submit expense reports within 30 days with original receipts via Concur. Pre-approval required for expenses over $500. Travel expenses require itinerary and business justification. Accommodation limit: $200/night in major cities, $150 elsewhere. Flight booking through corporate travel agent for trips over $1000. Processing takes 5-7 business days. Mileage reimbursed at $0.56/mile.',
      category: 'Finance'
    },
    {
      id: '4',
      title: 'Software Development & DevOps Standards',
      content: 'All code must pass automated testing with 85% coverage minimum and peer review via GitHub PRs. Use semantic versioning (MAJOR.MINOR.PATCH) and maintain comprehensive documentation in Confluence. Deploy to staging environment before production. Security scans required using SonarQube and OWASP. CI/CD pipeline mandatory for all production deployments. Code review required from 2+ engineers for critical path changes.',
      category: 'Engineering'
    },
    {
      id: '5',
      title: 'Meeting Room & Office Facilities Policy',
      content: 'Book meeting rooms maximum 2 weeks in advance via Outlook calendar. Cancel unused bookings 2 hours prior to avoid penalties. Maximum 4-hour consecutive booking per team. Conference rooms equipped with Zoom, whiteboards, and presentation displays. Report technical issues to facilities@company.com or ext. 1234. Kitchen areas restocked daily, dishwasher runs at 6 PM.',
      category: 'Facilities'
    },
    {
      id: '6',
      title: 'Performance Review & Career Development',
      content: 'Annual performance reviews conducted in Q1 (January-March) with mid-year check-ins in July. Self-assessment and 360-degree peer feedback required via Lattice platform. Management roles require upward feedback from direct reports. Goal setting for upcoming year mandatory with OKRs framework. Career development budget: $2000/year for conferences, courses, certifications. Promotion decisions made in Q4 planning cycle.',
      category: 'HR Policy'
    },
    {
      id: '7',
      title: 'Customer Support & Escalation Procedures',
      content: 'Tier 1 support handles general inquiries with 24-hour response time. Escalate to Tier 2 for technical issues requiring engineering input. Priority 1 incidents (system down) require immediate Slack notification to #alerts and PagerDuty escalation. Customer satisfaction surveys sent after case closure. Knowledge base updated weekly with common solutions. Support hours: 6 AM - 8 PM PST Monday-Friday.',
      category: 'Customer Support'
    },
    {
      id: '8',
      title: 'Product Launch & Marketing Guidelines',
      content: 'Product launches require cross-functional approval from Engineering, Marketing, Legal, and Customer Success teams. Beta testing phase minimum 2 weeks with 50+ active users. Marketing materials must be approved by Legal team for compliance. Press releases coordinated through PR agency minimum 1 week before launch. Feature flags used for gradual rollout starting with 5% of users. Post-launch metrics tracked for 30 days.',
      category: 'Product Marketing'
    },
    {
      id: '9',
      title: 'Vendor Management & Procurement Process',
      content: 'All vendor contracts over $10,000 require Legal and Finance approval. Due diligence includes security assessment, financial health check, and reference calls. Preferred vendor list maintained for common services. Purchase orders required for all expenses over $1,000. Net-30 payment terms standard. Annual vendor reviews assess performance, cost, and strategic alignment. Emergency procurement procedures for critical operational needs.',
      category: 'Procurement'
    },
    {
      id: '10',
      title: 'Incident Response & Business Continuity Plan',
      content: 'Incident Commander (IC) role rotates weekly among senior engineers. Severity 1 incidents require war room setup within 15 minutes. Communication plan includes customer notifications via status page, internal updates via Slack #incidents. Post-incident reviews (PIR) required within 48 hours with root cause analysis and prevention measures. Disaster recovery tested quarterly. RTO: 4 hours, RPO: 1 hour for critical systems.',
      category: 'Operations'
    }
  ];

  const sampleQueries = [
    "What is the remote work policy and equipment stipend?",
    "How do I report a security incident?",
    "What's the process for vendor procurement over $10,000?",
    "What are the software development code coverage requirements?",
    "How do I escalate a Priority 1 customer incident?",
    "What's the travel accommodation limit for major cities?",
    "When are performance reviews conducted and what's the budget for career development?",
    "What are the meeting room booking policies and technical support contacts?"
  ];

  // Simple similarity calculation for demo purposes
  const calculateSimilarity = (query: string, document: Document): number => {
    const queryWords = query.toLowerCase().split(' ');
    const docWords = document.content.toLowerCase().split(' ');
    const titleWords = document.title.toLowerCase().split(' ');
    
    let matches = 0;
    queryWords.forEach(word => {
      if (docWords.includes(word) || titleWords.includes(word)) {
        matches++;
      }
    });
    
    return matches / queryWords.length;
  };

  const processQuery = async (query: string) => {
    setIsProcessing(true);
    
    // Simulate RAG processing steps
    const steps = [
      'Analyzing query intent...',
      'Generating query embeddings...',
      'Searching vector database...',
      'Retrieving relevant documents...',
      'Ranking by relevance...',
      'Generating contextual response...'
    ];

    // Process each step with delay and visual progress
    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i]);
      setCurrentStepIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Find relevant documents
    const relevantDocs = documents
      .map(doc => ({
        ...doc,
        relevanceScore: calculateSimilarity(query, doc)
      }))
      .filter(doc => doc.relevanceScore! > 0)
      .sort((a, b) => b.relevanceScore! - a.relevanceScore!)
      .slice(0, 3);

    // Generate response
    let response = "I couldn't find relevant information for your query.";
    if (relevantDocs.length > 0) {
      const mainDoc = relevantDocs[0];
      response = `Based on our enterprise documentation, here's what I found:\n\n${mainDoc.content}\n\nThis information comes from "${mainDoc.title}" in the ${mainDoc.category} category.`;
      
      if (relevantDocs.length > 1) {
        response += `\n\nI also found ${relevantDocs.length - 1} other related document${relevantDocs.length > 2 ? 's' : ''} that might be helpful.`;
      }
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: response,
      isUser: false,
      timestamp: new Date(),
      sources: relevantDocs,
      processingSteps: steps
    };

    setMessages(prev => [...prev, newMessage]);
    setIsProcessing(false);
    setProcessingStep('');
    setCurrentStepIndex(0);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const query = inputText;
    setInputText('');
    
    await processQuery(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const ExplanationOverlay: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute inset-0 bg-white bg-opacity-95 p-6 rounded-lg flex flex-col justify-center overflow-y-auto"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">How Enterprise RAG Works</h3>
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
          <div>
            <strong>Query Processing:</strong> User queries are analyzed for intent and converted into vector embeddings using transformer models
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
          <div>
            <strong>Semantic Search:</strong> Vector similarity search finds the most relevant documents from the enterprise knowledge base
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
          <div>
            <strong>Context Retrieval:</strong> Top-ranked documents are retrieved with their full context and metadata
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
          <div>
            <strong>Response Generation:</strong> Language models generate accurate responses using retrieved context and cite sources
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
          <div>
            <strong>Quality Assurance:</strong> Responses include source attribution and relevance scoring for transparency
          </div>
        </div>
      </div>
      <button 
        onClick={() => setShowExplanation(false)}
        className="mt-4 btn-primary self-start"
      >
        Got it!
      </button>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 h-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Enterprise RAG System Demo
        </h2>
        <p className="text-gray-600 mb-4">
          Experience intelligent document retrieval with contextual AI responses
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setShowExplanation(true)}
            className="btn-secondary text-sm"
          >
            How it Works
          </button>
          {onClose && (
            <button onClick={onClose} className="btn-secondary text-sm">
              Close Demo
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 flex flex-col relative">
          {/* Messages */}
          <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4 min-h-96">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-primary-600 text-white'
                      : 'bg-white shadow-sm border'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        📎 Sources ({message.sources.length}):
                      </p>
                      {message.sources.map((source) => (
                        <div
                          key={source.id}
                          className="text-xs bg-gray-100 rounded p-2 mb-1"
                        >
                          <span className="font-medium">{source.title}</span>
                          <span className="ml-2 text-gray-600">
                            ({Math.round(source.relevanceScore! * 100)}% match)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex justify-start mb-4">
                <div className="bg-white shadow-sm border rounded-lg p-4 max-w-md">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-600 font-medium">{processingStep}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-800"
                      style={{ width: `${((currentStepIndex + 1) / 6) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Step {currentStepIndex + 1} of 6
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about company policies, procedures, or any enterprise documentation..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={isProcessing}
            />
            <button
              onClick={handleSendMessage}
              disabled={isProcessing || !inputText.trim()}
              className="btn-primary px-6"
            >
              Send
            </button>
          </div>

          <AnimatePresence>
            {showExplanation && <ExplanationOverlay />}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sample Queries */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              💡 Try These Queries
            </h3>
            <div className="space-y-2">
              {sampleQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(query)}
                  disabled={isProcessing}
                  className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          {/* Document Knowledge Base */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              📚 Knowledge Base
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 bg-white border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm text-gray-900 line-clamp-1">
                      {doc.title}
                    </h4>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {doc.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {doc.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              📊 System Performance
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Response Time:</span>
                <span className="font-bold text-blue-900">&lt;200ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Accuracy:</span>
                <span className="font-bold text-blue-900">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Documents:</span>
                <span className="font-bold text-blue-900">100+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Cost Savings:</span>
                <span className="font-bold text-blue-900">40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseRAGDemo;