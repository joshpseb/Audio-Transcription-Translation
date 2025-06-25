
import React from 'react';
import { AlertTriangleIcon } from './IconComponents';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative flex items-start" role="alert">
      <AlertTriangleIcon className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-0.5" />
      <div>
        <strong className="font-semibold text-red-200">Error:</strong>
        <span className="block sm:inline ml-1">{message}</span>
      </div>
    </div>
  );
};
