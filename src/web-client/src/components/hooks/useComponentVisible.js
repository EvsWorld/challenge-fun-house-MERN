import { useState, useEffect, useRef } from 'react';

export function useComponentVisible(initialIsVisible) {
  const ref = useRef();
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleHideDropdown, false);
    window.addEventListener('click', handleClickOutside, false);
    return () => {
      window.removeEventListener('keydown', handleHideDropdown, false);
      window.removeEventListener('click', handleClickOutside, false);
    };
  });

  return [isComponentVisible, setIsComponentVisible, ref];
}
