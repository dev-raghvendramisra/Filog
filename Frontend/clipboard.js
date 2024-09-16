
import React, { useState, useEffect } from 'react';
 // Import CSS file for styling

const BlinkingCursor = ({className="",input}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500); // Toggle visibility every 500ms

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return <span className={`${className} cursor  ${isVisible ? input.current==document.activeElement? 'visible' : '':""}`}>|</span>;
};

export default BlinkingCursor;