import React, { useState } from 'react'; // Removed useEffect
import { Plus, RefreshCw, GraduationCap } from 'lucide-react';
import SemesterCard from './components/SemesterCard';

export default function App() {
  // State: List of semesters
  // Note: We use ID: 1 for initial state to avoid Date.now() issues
  const [semesters, setSemesters] = useState([
    { id: 1, modules: [{ id: 1, name: '', credits: '', grade: '' }] }
  ]);

  // --- DERIVED STATE (No useEffect needed) ---
  // We calculate these on the fly during every render.
  let totalPoints = 0;
  let totalCredits = 0;

  semesters.forEach(sem => {
    sem.modules.forEach(mod => {
      const credits = parseFloat(mod.credits) || 0;
      const gradePoints = parseFloat(mod.grade) || 0;

      if (credits > 0 && mod.grade !== "") {
        totalPoints += (credits * gradePoints);
        totalCredits += credits;
      }
    });
  });

  const cgpa = totalCredits === 0 ? "0.00" : (totalPoints / totalCredits).toFixed(2);
  // -------------------------------------------

  const addSemester = () => {
    const newId = semesters.length > 0 ? semesters[semesters.length - 1].id + 1 : 1;
    setSemesters([...semesters, { 
      id: newId, 
      // It's safe to use Date.now() in event handlers (clicks)
      modules: [{ id: Date.now(), name: '', credits: '', grade: '' }] 
    }]);
  };

  const updateSemesterModules = (semesterId, updatedModules) => {
    setSemesters(semesters.map(sem => 
      sem.id === semesterId ? { ...sem, modules: updatedModules } : sem
    ));
  };

  const removeSemester = (id) => {
    setSemesters(semesters.filter(sem => sem.id !== id));
  };

  const resetAll = () => {
    if(window.confirm("Are you sure you want to clear all data?")) {
      setSemesters([{ id: 1, modules: [{ id: 1, name: '', credits: '', grade: '' }] }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-lg mb-4">
            <GraduationCap className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Uni<span className="text-indigo-600">GPA</span> Calculator
          </h1>
          <p className="text-gray-500 mt-2">Sri Lankan Technological Campus</p>
        </header>

        {/* Results Card */}
        <div className="sticky top-4 z-10 mb-8">
          <div className="bg-white/80 backdrop-blur-md border border-indigo-100 rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wide">Overall CGPA</h2>
              <div className={`text-5xl font-extrabold ${parseFloat(cgpa) >= 3.0 ? 'text-green-500' : parseFloat(cgpa) >= 2.0 ? 'text-yellow-500' : 'text-gray-700'}`}>
                {cgpa}
              </div>
            </div>
            
            <div className="flex gap-6 text-center">
              <div>
                <div className="text-gray-400 text-xs uppercase font-bold">Total Credits</div>
                <div className="text-xl font-bold text-gray-800">{totalCredits}</div>
              </div>
            </div>

            <button onClick={resetAll} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* Semesters */}
        <div className="space-y-6">
          {semesters.map((sem) => (
            <SemesterCard 
              key={sem.id} 
              semester={sem} 
              onUpdate={updateSemesterModules}
              onRemove={removeSemester}
            />
          ))}
        </div>

        {/* Add Semester Button */}
        <div className="mt-8 text-center">
          <button onClick={addSemester} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
            <Plus size={20} /> Add Another Semester
          </button>
        </div>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Sri Lankan University GPA System</p>
        </footer>
      </div>
    </div>
  );
}