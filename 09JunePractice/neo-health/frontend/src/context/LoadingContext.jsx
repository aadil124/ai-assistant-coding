import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
      
      {/* Global Overlay Spinner Blocker */}
      {isLoading && (
        <div 
          className="position-fixed top-0 start-0 end-0 bottom-0 d-flex flex-column align-items-center justify-content-center z-5"
          style={{ 
            backgroundColor: 'rgba(250, 248, 255, 0.7)', 
            backdropFilter: 'blur(4px)',
            zIndex: 9999
          }}
          id="global-overlay-loader"
        >
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h6 className="fw-bold text-dark mb-1">Processing Request</h6>
            <p className="text-secondary small mb-0">Please do not refresh this page.</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be consumed within a LoadingProvider wrapper.');
  }
  return context;
}
