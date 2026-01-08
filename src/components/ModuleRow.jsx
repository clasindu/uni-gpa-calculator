import React from 'react';
import { Trash2 } from 'lucide-react';
import { GRADE_SCALE } from '../constants/grades'; 

const ModuleRow = ({ module, onChange, onRemove }) => {
  return (
    <div className="grid grid-cols-12 gap-2 mb-3 items-center animate-fadeIn">
      {/* Module Name Input */}
      <div className="col-span-5 sm:col-span-6">
        <input
          type="text"
          placeholder="Module Name"
          value={module.name}
          onChange={(e) => onChange(module.id, 'name', e.target.value)}
          className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Credits Input */}
      <div className="col-span-3 sm:col-span-2">
        <input
          type="number"
          placeholder="Cr."
          min="0"
          value={module.credits}
          onChange={(e) => onChange(module.id, 'credits', e.target.value)}
          className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-center"
        />
      </div>

      {/* Grade Dropdown */}
      <div className="col-span-3 sm:col-span-3">
        <select
          value={module.grade}
          onChange={(e) => onChange(module.id, 'grade', e.target.value)}
          className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
        >
          <option value="" disabled>Grade</option>
          {GRADE_SCALE.map((g) => (
            <option key={g.label} value={g.points}>
              {g.label} ({g.points})
            </option>
          ))}
        </select>
      </div>

      {/* Delete Button */}
      <div className="col-span-1 flex justify-center">
        <button
          onClick={() => onRemove(module.id)}
          className="text-red-400 hover:text-red-600 transition-colors p-1"
          title="Remove Module"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ModuleRow;