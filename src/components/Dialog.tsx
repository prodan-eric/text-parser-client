import React from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isLoading: boolean;
  loadingMessage?: string;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children, isLoading, loadingMessage }) => {
  const backdropClasses = isOpen
    ? 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-hidden transition-opacity'
    : 'hidden';

  const dialogClasses = isOpen
    ? 'transform transition-transform bg-white rounded-lg shadow-md w-96'
    : 'transform translate-y-full transition-transform bg-white rounded-lg shadow-md w-96';

  return (
    <div className={backdropClasses}>
      <div className={dialogClasses}>
        {isLoading && (
          <div className="modal-content p-4">
            <div className="modal-header border-b px-5 pb-2 mb-4 flex justify-between">
              <h2 className="text-xl flex items-center">{loadingMessage || 'Loading...'}</h2>
            </div>
            <div className="modal-body">
              <div className="flex items-center justify-center">
                {/* You can replace this with your preferred loading spinner component */}
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
              </div>
            </div>
          </div>
        )}

        <div className={`modal-content p-4 ${isLoading ? 'hidden' : ''}`}>
          <div className="modal-header border-b px-5 pb-2 mb-4 flex justify-between">
            <h2 className="text-xl flex items-center">{title}</h2>
            <button
              onClick={onClose}
              className="close-button p-2 rounded-full hover:bg-gray-200 transition"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
