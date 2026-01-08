import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ModuleRow from './ModuleRow';

const SemesterCard = ({ semester, onUpdate, onRemove }) => {
  
  // Calculate GPA specifically for this semester
  const calculateSemesterGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    semester.modules.forEach((mod) => {
      const credits = parseFloat(mod.credits) || 0;
      const gradePoints = parseFloat(mod.grade) || 0;
      
      if (credits > 0 && mod.grade !== "") {
        totalPoints += credits * gradePoints;
        totalCredits += credits;
      }
    });

    return totalCredits === 0 ? "0.00" : (totalPoints / totalCredits).toFixed(2);
  };

  const currentGPA = calculateSemesterGPA();

  // Helper: Update a single module inside this semester
  const updateModule = (moduleId, field, value) => {
    const updatedModules = semester.modules.map((m) =>
      m.id === moduleId ? { ...m, [field]: value } : m
    );
    onUpdate(semester.id, updatedModules);
  };

  // Helper: Add a blank module
  const addModule = () => {
    const newModule = { id: Date.now(), name: '', credits: '', grade: '' };
    onUpdate(semester.id, [...semester.modules, newModule]);
  };

  // Helper: Remove a module
  const removeModule = (moduleId) => {
    const updatedModules = semester.modules.filter((m) => m.id !== moduleId);
    onUpdate(semester.id, updatedModules);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-700 text-lg">Semester {semester.id}</h3>
        <div className="flex items-center gap-4">
          <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
            GPA: {currentGPA}
          </div>
          <button 
            onClick={() => onRemove(semester.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Modules List */}
      <div className="p-6">
        <div className="grid grid-cols-12 gap-2 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <div className="col-span-5 sm:col-span-6">Module</div>
          <div className="col-span-3 sm:col-span-2 text-center">Credits</div>
          <div className="col-span-3 sm:col-span-3">Grade</div>
          <div className="col-span-1"></div>
        </div>

        {semester.modules.map((mod) => (
          <ModuleRow 
            key={mod.id} 
            module={mod} 
            onChange={updateModule} 
            onRemove={removeModule} 
          />
        ))}

        <button
          onClick={addModule}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <Plus size={16} /> Add Module
        </button>
      </div>
    </div>
  );
};

export default SemesterCard;