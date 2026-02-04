import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Store scroll positions for each route
const scrollPositions = new Map();

export const useScrollRestoration = (key = null) => {
  const location = useLocation();
  const scrollKey = key || location.pathname;
  const isRestoringRef = useRef(false);

  useEffect(() => {
    // Restore scroll position when component mounts
    const savedPosition = scrollPositions.get(scrollKey);
    if (savedPosition && !isRestoringRef.current) {
      isRestoringRef.current = true;
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo({
          top: savedPosition.y,
          left: savedPosition.x,
          behavior: "auto", // Use 'auto' for instant restoration
        });
        isRestoringRef.current = false;
      }, 0);
    }

    // Save scroll position when component unmounts or route changes
    const handleScroll = () => {
      if (!isRestoringRef.current) {
        scrollPositions.set(scrollKey, {
          x: window.scrollX,
          y: window.scrollY,
        });
      }
    };

    const handleBeforeUnload = () => {
      scrollPositions.set(scrollKey, {
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function
    return () => {
      // Save current position before unmounting
      if (!isRestoringRef.current) {
        scrollPositions.set(scrollKey, {
          x: window.scrollX,
          y: window.scrollY,
        });
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [scrollKey]);

  // Method to manually clear saved position
  const clearSavedPosition = () => {
    scrollPositions.delete(scrollKey);
  };

  // Method to manually save current position
  const saveCurrentPosition = () => {
    scrollPositions.set(scrollKey, {
      x: window.scrollX,
      y: window.scrollY,
    });
  };

  return { clearSavedPosition, saveCurrentPosition };
};

export default useScrollRestoration;
