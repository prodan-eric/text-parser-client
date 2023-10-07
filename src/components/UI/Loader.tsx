import React, { ReactNode } from 'react';

interface LoaderProps {
  loading: boolean;
  children: ReactNode;
  loadingMessage: string | undefined
}

const Loader: React.FC<LoaderProps> = ({ loading, children, loadingMessage }) => {
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          {loadingMessage && <div>{loadingMessage}</div>}
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Loader;
