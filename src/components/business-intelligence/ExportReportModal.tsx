import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'pdf' | 'excel' | 'powerpoint', options: ExportOptions) => void;
}

interface ExportOptions {
  includeSections: string[];
  dateRange: string;
  executiveSummary: boolean;
  detailedMetrics: boolean;
  charts: boolean;
  recommendations: boolean;
}

const ExportReportModal: React.FC<ExportReportModalProps> = ({ isOpen, onClose, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel' | 'powerpoint'>('pdf');
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    includeSections: ['analytics', 'roi', 'impact', 'performance'],
    dateRange: 'last-30-days',
    executiveSummary: true,
    detailedMetrics: true,
    charts: true,
    recommendations: true
  });

  const sections = [
    { id: 'analytics', name: 'Portfolio Analytics', description: 'Real-time engagement metrics and trends' },
    { id: 'roi', name: 'ROI Calculator Results', description: 'Project ROI analysis and projections' },
    { id: 'impact', name: 'Business Impact', description: 'Cost savings and performance metrics' },
    { id: 'performance', name: 'Technical Benchmarks', description: 'Algorithm performance comparisons' },
    { id: 'market', name: 'Market Analysis', description: 'Industry trends and opportunities' },
    { id: 'consulting', name: 'Consulting Estimates', description: 'Project assessment and recommendations' }
  ];

  const formats = [
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Executive summary with charts and insights',
      icon: '📄',
      size: '~2-4 MB'
    },
    {
      id: 'excel',
      name: 'Excel Workbook',
      description: 'Interactive spreadsheet with data and formulas',
      icon: '📊',
      size: '~500 KB'
    },
    {
      id: 'powerpoint',
      name: 'PowerPoint Presentation',
      description: 'Executive presentation slides',
      icon: '📑',
      size: '~3-5 MB'
    }
  ];

  const handleSectionToggle = (sectionId: string) => {
    setExportOptions(prev => ({
      ...prev,
      includeSections: prev.includeSections.includes(sectionId)
        ? prev.includeSections.filter(id => id !== sectionId)
        : [...prev.includeSections, sectionId]
    }));
  };

  const handleExport = () => {
    onExport(selectedFormat, exportOptions);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={onClose}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <span className="text-3xl">📈</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Export Business Intelligence Report</h3>
                    <p className="text-sm text-gray-500">Generate comprehensive reports for executive presentations</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Format Selection */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Export Format</h4>
                    <div className="space-y-3">
                      {formats.map((format) => (
                        <label key={format.id} className="relative block cursor-pointer">
                          <input
                            type="radio"
                            name="format"
                            value={format.id}
                            checked={selectedFormat === format.id}
                            onChange={(e) => setSelectedFormat(e.target.value as any)}
                            className="sr-only"
                          />
                          <div className={`p-4 border-2 rounded-lg transition-all ${
                            selectedFormat === format.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{format.icon}</span>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{format.name}</div>
                                <div className="text-sm text-gray-500">{format.description}</div>
                                <div className="text-xs text-gray-400 mt-1">Est. size: {format.size}</div>
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Options */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Export Options</h4>
                    
                    {/* Date Range */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                      <select
                        value={exportOptions.dateRange}
                        onChange={(e) => setExportOptions(prev => ({ ...prev, dateRange: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      >
                        <option value="last-7-days">Last 7 days</option>
                        <option value="last-30-days">Last 30 days</option>
                        <option value="last-90-days">Last 90 days</option>
                        <option value="ytd">Year to date</option>
                        <option value="all-time">All time</option>
                      </select>
                    </div>

                    {/* Content Options */}
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={exportOptions.executiveSummary}
                          onChange={(e) => setExportOptions(prev => ({ ...prev, executiveSummary: e.target.checked }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                        />
                        <span className="text-sm text-gray-700">Executive Summary</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={exportOptions.detailedMetrics}
                          onChange={(e) => setExportOptions(prev => ({ ...prev, detailedMetrics: e.target.checked }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                        />
                        <span className="text-sm text-gray-700">Detailed Metrics</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={exportOptions.charts}
                          onChange={(e) => setExportOptions(prev => ({ ...prev, charts: e.target.checked }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                        />
                        <span className="text-sm text-gray-700">Charts and Visualizations</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={exportOptions.recommendations}
                          onChange={(e) => setExportOptions(prev => ({ ...prev, recommendations: e.target.checked }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                        />
                        <span className="text-sm text-gray-700">Strategic Recommendations</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Section Selection */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Include Sections</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sections.map((section) => (
                      <label key={section.id} className="flex items-start">
                        <input
                          type="checkbox"
                          checked={exportOptions.includeSections.includes(section.id)}
                          onChange={() => handleSectionToggle(section.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3 mt-1"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{section.name}</div>
                          <div className="text-xs text-gray-500">{section.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleExport}
                  disabled={exportOptions.includeSections.length === 0}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Generate Report
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExportReportModal;