/**
 * Get what is the size of the webpage - to be used when scss media query cant be used
 * @returns string
 */
import { useState, useEffect } from 'react';

const getWindowDimensions = (window) => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setWindowDimensions(getWindowDimensions(window));
    function handleResize() {
      setWindowDimensions(getWindowDimensions(window));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowDimensions };
};

export default useWindowDimensions;
