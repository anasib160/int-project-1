import { useEffect, useRef } from 'react';

const ProgressBar = ({ percentage }) => {
  const progressRef = useRef(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${percentage}%`;
    }
  }, [percentage]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
      <div
        ref={progressRef}
        className="h-1 bg-indigo-600 transition-all duration-300"
        style={{ width: 0 }}
      ></div>
    </div>
  );
};

export default ProgressBar;