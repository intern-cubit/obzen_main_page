import React from 'react';
import { useAuthSync } from '../hooks/useAuthSync';

const AuthSyncHandler = ({ children }) => {
  const { isAuthLoading, isLoading } = useAuthSync();

  // Show a minimal loading indicator during data fetch (optional)
  if (isLoading) {
    return (
      <>
        {children}
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            <span className="text-sm">Loading data...</span>
          </div>
        </div>
      </>
    );
  }

  return children;
};

export default AuthSyncHandler;
