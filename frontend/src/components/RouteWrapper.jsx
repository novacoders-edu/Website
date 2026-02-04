import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useScrollRestoration from '../hooks/useScrollRestoration';

const RouteWrapper = ({ children, preserveScroll = true, scrollKey = null }) => {
  const location = useLocation();
  
  // Use scroll restoration if enabled
  if (preserveScroll) {
    useScrollRestoration(scrollKey || location.pathname);
  }

  return <>{children}</>;
};

export default RouteWrapper;