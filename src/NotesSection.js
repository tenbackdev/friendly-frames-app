// NotesSection.js
import React, { useState, useRef, useEffect } from 'react';

const NotesSection = ({ 
  enabledDays, 
  fullDayNames, 
  activeStudent, 
  initialNotes, 
  onNoteChange 
}) => {
  // Create refs for each day's input
  const inputRefs = {
    Mon: useRef(null),
    Tue: useRef(null),
    Wed: useRef(null),
    Thu: useRef(null),
    Fri: useRef(null)
  };

  // Initialize local state to match the external state
  const [localNotes, setLocalNotes] = useState(() => {
    // Clone the initial note values
    const notes = {};
    for (const day in enabledDays) {
      if (enabledDays[day]) {
        notes[day] = initialNotes[day] || '';
      }
    }
    return notes;
  });

  // Update component when activeStudent changes
  useEffect(() => {
    // Update local notes when student changes
    const newNotes = {};
    for (const day in enabledDays) {
      if (enabledDays[day]) {
        newNotes[day] = initialNotes[day] || '';
      }
    }
    setLocalNotes(newNotes);
  }, [activeStudent, initialNotes, enabledDays]);

  // Handle direct DOM updates
  const handleInputChange = (day, e) => {
    const value = e.target.value;
    
    // Update local state synchronously to avoid re-renders
    setLocalNotes(prev => ({
      ...prev,
      [day]: value
    }));
    
    // Update parent state without causing re-renders of this component
    setTimeout(() => {
      onNoteChange(day, value);
    }, 0);
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-md shadow">
      <div className="flex items-center mb-3">
        <span className="text-gray-700 mr-2">📝</span>
        <h3 className="font-medium text-lg">Notes</h3>
      </div>
      <div className="space-y-3">
        {Object.keys(enabledDays).map(day => 
          enabledDays[day] && (
            <div key={`notes-${day}`} className="grid grid-cols-2 gap-2 p-2 bg-gray-50 rounded">
              <span className="font-medium text-gray-700 self-center">{fullDayNames[day]}</span>
              <div className="w-full">
                <input
                  ref={inputRefs[day]}
                  type="text"
                  placeholder="Add a note (max 100 chars)"
                  maxLength="100"
                  value={localNotes[day] || ''}
                  onChange={(e) => handleInputChange(day, e)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NotesSection;