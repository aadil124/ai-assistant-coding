import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const showSuccess = useCallback((msg) => addToast(msg, 'success'), [addToast]);
  const showError = useCallback((msg) => addToast(msg, 'error'), [addToast]);
  const showWarning = useCallback((msg) => addToast(msg, 'warning'), [addToast]);
  const showInfo = useCallback((msg) => addToast(msg, 'info'), [addToast]);

  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Notification Container Overlay */}
      <div 
        className="position-fixed top-0 end-0 p-3 z-5 d-flex flex-column gap-2"
        style={{ width: '100%', maxWidth: '380px', pointerEvents: 'none' }}
        id="global-toast-container"
      >
        {toasts.map((toast) => {
          // Dynamic theme configuration using project HSL standards
          const getToastStyle = (t) => {
            switch (t) {
              case 'success':
                return {
                  border: 'rgba(25, 135, 84, 0.25)',
                  bg: 'rgba(25, 135, 84, 0.95)',
                  icon: 'bi-check-circle-fill'
                };
              case 'error':
                return {
                  border: 'rgba(220, 53, 69, 0.25)',
                  bg: 'rgba(220, 53, 69, 0.95)',
                  icon: 'bi-exclamation-octagon-fill'
                };
              case 'warning':
                return {
                  border: 'rgba(255, 193, 7, 0.25)',
                  bg: 'rgba(255, 193, 7, 0.95)',
                  icon: 'bi-exclamation-triangle-fill',
                  text: '#191b23'
                };
              default:
                return {
                  border: 'rgba(0, 74, 198, 0.25)',
                  bg: 'rgba(0, 74, 198, 0.95)',
                  icon: 'bi-info-circle-fill'
                };
            }
          };

          const styleConfig = getToastStyle(toast.type);

          return (
            <div
              key={toast.id}
              className="toast show d-flex align-items-center justify-content-between p-3 border shadow-lg text-white rounded-3 animate-slide-in pointer-events-auto"
              style={{
                background: styleConfig.bg,
                borderColor: styleConfig.border,
                color: styleConfig.text || '#ffffff',
                pointerEvents: 'auto',
                minWidth: '280px'
              }}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="d-flex align-items-center gap-2">
                <i className={`bi ${styleConfig.icon} fs-5`}></i>
                <span className="small fw-semibold">{toast.message}</span>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white ms-3"
                onClick={() => removeToast(toast.id)}
                aria-label="Close"
              ></button>
            </div>
          );
        })}
      </div>

      <style>{`
        .animate-slide-in {
          animation: toastSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes toastSlideIn {
          from {
            transform: translateX(100%) translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be consumed within a ToastProvider wrapper.');
  }
  return context;
}
