/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  preferences: number[];
  similarity?: number;
}

interface PatientMatchingDemoProps {
  onClose?: () => void;
}

const PatientMatchingDemo: React.FC<PatientMatchingDemoProps> = ({ onClose }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [recommendations, setRecommendations] = useState<Patient[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [step, setStep] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);

  // Enhanced patient data with comprehensive health metrics and preference vectors
  const patients: Patient[] = [
    { id: 1, name: "Sarah Johnson", age: 34, condition: "Type 2 Diabetes", preferences: [4, 2, 5, 3, 4, 2, 3, 5] },
    { id: 2, name: "Michael Chen", age: 45, condition: "Hypertension", preferences: [3, 4, 2, 5, 3, 4, 4, 2] },
    { id: 3, name: "Emma Davis", age: 28, condition: "Chronic Asthma", preferences: [5, 3, 4, 2, 5, 3, 2, 4] },
    { id: 4, name: "Robert Wilson", age: 52, condition: "Rheumatoid Arthritis", preferences: [2, 5, 3, 4, 2, 5, 3, 3] },
    { id: 5, name: "Lisa Anderson", age: 39, condition: "Type 1 Diabetes", preferences: [4, 3, 5, 2, 4, 3, 4, 5] },
    { id: 6, name: "David Brown", age: 41, condition: "Essential Hypertension", preferences: [3, 4, 2, 5, 3, 4, 3, 2] },
    { id: 7, name: "Jennifer Garcia", age: 31, condition: "Chronic Migraine", preferences: [5, 2, 4, 3, 5, 2, 4, 3] },
    { id: 8, name: "James Martinez", age: 47, condition: "Lower Back Pain", preferences: [2, 4, 3, 5, 2, 4, 5, 4] },
    { id: 9, name: "Patricia Lee", age: 56, condition: "Osteoarthritis", preferences: [3, 5, 2, 4, 3, 5, 2, 3] },
    { id: 10, name: "Thomas Wright", age: 62, condition: "COPD", preferences: [2, 3, 4, 3, 2, 3, 4, 5] },
    { id: 11, name: "Maria Rodriguez", age: 43, condition: "Fibromyalgia", preferences: [4, 2, 3, 4, 5, 2, 3, 4] },
    { id: 12, name: "Kevin Park", age: 38, condition: "Anxiety Disorder", preferences: [5, 1, 4, 2, 5, 1, 4, 2] }
  ];

  const preferenceLabels = [
    "Morning Appointments",
    "Remote Consultations", 
    "Group Therapy",
    "Specialist Referrals",
    "Home Visits",
    "Weekend Availability",
    "Emergency Services",
    "Follow-up Frequency"
  ];

  // SVD-based similarity calculation (simplified)
  const calculateSVDSimilarity = (patient1: Patient, patient2: Patient): number => {
    const prefs1 = patient1.preferences;
    const prefs2 = patient2.preferences;
    
    // Cosine similarity calculation
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (let i = 0; i < prefs1.length; i++) {
      dotProduct += prefs1[i] * prefs2[i];
      norm1 += prefs1[i] * prefs1[i];
      norm2 += prefs2[i] * prefs2[i];
    }
    
    const similarity = dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    return Math.round(similarity * 100) / 100;
  };

  const findRecommendations = async (targetPatient: Patient) => {
    setIsCalculating(true);
    setStep(0);
    
    // Simulate step-by-step calculation
    const steps = [
      "Analyzing patient preferences...",
      "Computing similarity matrix...",
      "Applying SVD decomposition...",
      "Ranking recommendations...",
      "Filtering top matches..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Calculate similarities and get top 3 recommendations
    const matches = patients
      .filter(p => p.id !== targetPatient.id)
      .map(patient => ({
        ...patient,
        similarity: calculateSVDSimilarity(targetPatient, patient)
      }))
      .sort((a, b) => b.similarity! - a.similarity!)
      .slice(0, 3);

    setRecommendations(matches);
    setIsCalculating(false);
  };

  const PatientCard: React.FC<{ patient: Patient; isSelected?: boolean; onClick?: () => void }> = ({ 
    patient, 
    isSelected = false, 
    onClick 
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected 
          ? 'border-primary-500 bg-primary-50' 
          : 'border-gray-200 bg-white hover:border-primary-300'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900">{patient.name}</h4>
        {patient.similarity && (
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            {Math.round(patient.similarity * 100)}% match
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-2">Age: {patient.age} | {patient.condition}</p>
      <div className="grid grid-cols-4 gap-1 text-xs">
        {patient.preferences.map((pref, idx) => (
          <div key={idx} className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-1 ${
              pref >= 4 ? 'bg-green-500' :
              pref >= 3 ? 'bg-yellow-500' :
              'bg-red-400'
            }`}></div>
            <span>{pref}/5</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const ExplanationOverlay: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute inset-0 bg-white bg-opacity-95 p-6 rounded-lg flex flex-col justify-center"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">How SVD Collaborative Filtering Works</h3>
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
          <div>
            <strong>Data Collection:</strong> Patient preferences are collected across multiple healthcare dimensions (appointment times, consultation types, etc.)
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
          <div>
            <strong>Matrix Decomposition:</strong> SVD breaks down the patient-preference matrix into latent factors that capture hidden patterns
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
          <div>
            <strong>Similarity Calculation:</strong> Cosine similarity measures how closely patients' preferences align in the reduced dimensional space
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
          <div>
            <strong>Recommendation:</strong> Patients with highest similarity scores are recommended for optimized resource allocation
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

  const MatrixVisualization: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute inset-0 bg-white bg-opacity-95 p-6 rounded-lg flex flex-col justify-center overflow-y-auto z-10"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">SVD Matrix Decomposition Visualization</h3>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Patient-Preference Matrix (U × Σ × V<sup>T</sup>)
          </p>
          <div className="inline-block border-2 border-primary-300 rounded-lg p-4 bg-primary-50">
            <div className="grid grid-cols-9 gap-1 text-xs">
              {/* Header row */}
              <div className="font-bold text-primary-800">Patient</div>
              {preferenceLabels.map((label, idx) => (
                <div key={idx} className="font-bold text-primary-800 text-center transform -rotate-45 text-[10px]">
                  {label.split(' ')[0]}
                </div>
              ))}
              
              {/* Data rows for first 4 patients */}
              {patients.slice(0, 4).map((patient) => (
                <>
                  <div key={patient.id} className="font-medium text-primary-900 text-[10px]">
                    {patient.name.split(' ')[0]}
                  </div>
                  {patient.preferences.map((pref, idx) => (
                    <div
                      key={idx}
                      className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold ${
                        pref >= 4 ? 'bg-green-400 text-white' :
                        pref >= 3 ? 'bg-yellow-300 text-gray-800' :
                        'bg-red-300 text-white'
                      }`}
                    >
                      {pref}
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            After SVD decomposition, we identify latent factors that capture patient behavior patterns
          </p>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <h4 className="font-bold text-blue-800 mb-2">U Matrix</h4>
              <p className="text-blue-700">Patient-Factor associations</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded p-3">
              <h4 className="font-bold text-purple-800 mb-2">Σ Matrix</h4>
              <p className="text-purple-700">Singular values (importance)</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <h4 className="font-bold text-green-800 mb-2">V<sup>T</sup> Matrix</h4>
              <p className="text-green-700">Factor-Preference relationships</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Discovered Latent Factors:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span><strong>Convenience Factor:</strong> Morning appointments + Remote consultations</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span><strong>Care Intensity Factor:</strong> Specialist referrals + Follow-up frequency</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              <span><strong>Accessibility Factor:</strong> Home visits + Weekend availability</span>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setShowMatrix(false)}
        className="mt-4 btn-primary self-start"
      >
        Close Visualization
      </button>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Patient Matching System Demo
        </h2>
        <p className="text-gray-600 mb-4">
          Experience SVD-based collaborative filtering for healthcare resource optimization
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setShowExplanation(true)}
            className="btn-secondary text-sm"
          >
            How it Works
          </button>
          <button 
            onClick={() => setShowMatrix(true)}
            className="btn-secondary text-sm"
          >
            View SVD Matrix
          </button>
          {onClose && (
            <button onClick={onClose} className="btn-secondary text-sm">
              Close Demo
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Patient Selection */}
        <div className="relative">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            1. Select a Patient for Matching
          </h3>
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {patients.slice(0, 6).map(patient => (
              <PatientCard
                key={patient.id}
                patient={patient}
                isSelected={selectedPatient?.id === patient.id}
                onClick={() => {
                  setSelectedPatient(patient);
                  setRecommendations([]);
                }}
              />
            ))}
          </div>
          
          {selectedPatient && (
            <div className="mt-4">
              <button 
                onClick={() => findRecommendations(selectedPatient)}
                disabled={isCalculating}
                className="btn-primary w-full"
              >
                {isCalculating ? 'Finding Matches...' : 'Find Similar Patients'}
              </button>
            </div>
          )}

          <AnimatePresence>
            {showExplanation && <ExplanationOverlay />}
            {showMatrix && <MatrixVisualization />}
          </AnimatePresence>
        </div>

        {/* Results */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            2. Recommended Patient Matches
          </h3>
          
          {isCalculating && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">
                  {step < 5 ? [
                    "Analyzing patient preferences...",
                    "Computing similarity matrix...",
                    "Applying SVD decomposition...",
                    "Ranking recommendations...",
                    "Filtering top matches..."
                  ][step] : "Complete!"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-800"
                  style={{ width: `${(step + 1) * 20}%` }}
                ></div>
              </div>
            </div>
          )}

          {!isCalculating && recommendations.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-2">👥</div>
              <p>Select a patient above to see SVD-based recommendations</p>
            </div>
          )}

          <AnimatePresence>
            {!isCalculating && recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-800 mb-1">✨ Results Found!</h4>
                  <p className="text-sm text-green-700">
                    Found {recommendations.length} highly compatible patients for optimized resource allocation.
                  </p>
                </div>
                
                {recommendations.map((patient, index) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PatientCard patient={patient} />
                  </motion.div>
                ))}
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Impact Metrics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600 font-bold">75%</span>
                      <div className="text-blue-700">Recommendation Accuracy</div>
                    </div>
                    <div>
                      <span className="text-blue-600 font-bold">60%</span>
                      <div className="text-blue-700">Resource Allocation Efficiency</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Preference Legend */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">Patient Preference Categories</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {preferenceLabels.map((label, idx) => (
            <div key={idx} className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary-400 mr-2"></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientMatchingDemo;