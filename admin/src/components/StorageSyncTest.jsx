import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../services/storageService';

const StorageSyncTest = () => {
  const [testValue, setTestValue] = useState('');
  const [currentSettings, setCurrentSettings] = useState({});

  useEffect(() => {
    const settings = getSettings();
    setCurrentSettings(settings);
  }, []);

  const handleTestSave = () => {
    const newSettings = {
      ...currentSettings,
      testField: testValue
    };
    
    const success = saveSettings(newSettings);
    if (success) {
      alert('Settings saved successfully!');
    } else {
      alert('Failed to save settings');
    }
  };

  return (
    <div className="p-8 bg-deep-black text-white">
      <h2 className="text-2xl font-bold mb-6">Storage Sync Test</h2>
      
      <div className="space-y-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Current Settings:</h3>
          <pre className="bg-[#111] p-4 rounded text-green-400">
            {JSON.stringify(currentSettings, null, 2)}
          </pre>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Test Field:</h3>
          <input
            type="text"
            value={testValue}
            onChange={(e) => setTestValue(e.target.value)}
            className="bg-[#111] border border-[#333] rounded px-4 py-2 text-white"
            placeholder="Enter test value"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Actions:</h3>
          <button
            onClick={handleTestSave}
            className="bg-industrial-yellow text-deep-black px-6 py-2 font-bold rounded hover:bg-white"
          >
            Save Test Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorageSyncTest;
