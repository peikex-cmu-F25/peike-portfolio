import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { technicalLeadership, openSourceContributions, TechnicalLeadershipData, OpenSourceContribution } from '../data/portfolio';

interface LeadershipCardProps {
  item: TechnicalLeadershipData;
}

const LeadershipCard = ({ item }: LeadershipCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'speaking':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          </svg>
        );
      case 'publication':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
        );
      case 'open_source':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'mentorship':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        );
      case 'community':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        );
      case 'awards':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'speaking': return 'bg-purple-100 text-purple-800';
      case 'publication': return 'bg-blue-100 text-blue-800';
      case 'open_source': return 'bg-green-100 text-green-800';
      case 'mentorship': return 'bg-orange-100 text-orange-800';
      case 'community': return 'bg-cyan-100 text-cyan-800';
      case 'awards': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
              {getTypeIcon(item.type)}
            </div>
            <span className="text-sm font-medium text-gray-500 capitalize">
              {item.type.replace('_', ' ')}
            </span>
          </div>
          <span className="text-sm text-gray-400">
            {new Date(item.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short' 
            })}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>

        <p className="text-sm font-medium text-blue-600 mb-3">
          {item.organization}
        </p>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {item.description}
        </p>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          {item.impact.map((metric, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
              <span className="text-sm text-gray-600">{metric.metric}</span>
              <span className="text-sm font-semibold text-gray-900">{metric.value}</span>
            </div>
          ))}
        </div>

        {/* Technologies */}
        {item.technologies && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.technologies.slice(0, 4).map((tech, index) => (
              <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {tech}
              </span>
            ))}
            {item.technologies.length > 4 && (
              <span className="text-xs text-gray-500">+{item.technologies.length - 4} more</span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-2">
          {item.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
            >
              {link.type === 'github' && (
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              )}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface OpenSourceCardProps {
  project: OpenSourceContribution;
}

const OpenSourceCard = ({ project }: OpenSourceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
  >
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-green-100 text-green-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <span className={`text-sm font-medium px-2 py-1 rounded ${
            project.role === 'Maintainer' ? 'bg-purple-100 text-purple-800' :
            project.role === 'Core Contributor' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {project.role}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
        {project.projectName}
      </h3>

      <p className="text-gray-600 mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center bg-gray-50 rounded-lg p-3">
          <span className="text-lg font-bold text-gray-900 block">⭐ {project.metrics.stars.toLocaleString()}</span>
          <span className="text-xs text-gray-600">Stars</span>
        </div>
        <div className="text-center bg-gray-50 rounded-lg p-3">
          <span className="text-lg font-bold text-gray-900 block">🍴 {project.metrics.forks.toLocaleString()}</span>
          <span className="text-xs text-gray-600">Forks</span>
        </div>
      </div>

      {/* Key Contributions */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Contributions</h4>
        <div className="space-y-2">
          {project.contributions.slice(0, 2).map((contribution, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-blue-600">{contribution.type}</span>
              </div>
              <p className="text-xs text-gray-700 mb-1">{contribution.description}</p>
              <p className="text-xs text-green-600 font-medium">{contribution.impact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 4).map((tech, index) => (
          <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="text-xs text-gray-500">+{project.technologies.length - 4} more</span>
        )}
      </div>

      {/* GitHub Link */}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors group-hover:shadow-md"
      >
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        View Project
      </a>
    </div>
  </motion.div>
);

const TechnicalLeadership = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'speaking' | 'publications' | 'open_source' | 'mentorship'>('all');

  const filteredLeadership = technicalLeadership.filter(item => 
    activeTab === 'all' || 
    (activeTab === 'publications' && item.type === 'publication') ||
    (activeTab !== 'publications' && item.type === activeTab)
  );

  const tabs = [
    { id: 'all', label: 'All Leadership' },
    { id: 'speaking', label: 'Speaking' },
    { id: 'publications', label: 'Publications' },
    { id: 'open_source', label: 'Open Source' },
    { id: 'mentorship', label: 'Mentorship' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Technical Leadership
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Thought leadership, industry contributions, and community impact 
              demonstrating expertise in AI/ML systems and technical mentorship
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Leadership Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Industry Leadership Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="text-3xl font-bold text-purple-600 block">7+</span>
              <span className="text-gray-600">Speaking Engagements</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-blue-600 block">2.4K+</span>
              <span className="text-gray-600">GitHub Stars</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-green-600 block">25+</span>
              <span className="text-gray-600">Students Mentored</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-orange-600 block">500+</span>
              <span className="text-gray-600">Practitioners Reached</span>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Leadership Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredLeadership.map((item) => (
            <LeadershipCard key={item.id} item={item} />
          ))}
        </div>

        {/* Open Source Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Open Source Contributions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Leading and contributing to open source projects that advance the state of 
              enterprise AI/ML systems and help the broader developer community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {openSourceContributions.map((project) => (
              <OpenSourceCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Speaking & Collaboration Opportunities
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Available for technical talks, workshop facilitation, research collaboration, 
            and consulting on enterprise AI/ML system architecture and implementation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Start a Conversation
            </Link>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Speaker Information Kit
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TechnicalLeadership;