import React, { useState, useEffect } from 'react';
import { useTheme } from '@/shared-components/context/ThemeContext';
import ToggleSwitch from '@/shared-components/ui/ToggleSwitch';


const ThemeManager: React.FC = () => {
  const { theme, toggleTheme} = useTheme();

  return (
    <div className="theme-manager">



      <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
      <ToggleSwitch 
        label="Toggle Theme"
        type="checkbox"
        name="theme"
        checked={theme === 'dark' ? ['dark'] : []} 
        handleToggle={toggleTheme}
        handleBlur={undefined} 
        value={theme === 'dark'}
        error={undefined}  
        className="theme-toggle"
        visible={true}
      />
    </div>
  );
};

export default ThemeManager;
