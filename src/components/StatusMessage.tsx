import React from 'react';
import { FileSpreadsheet, AlertCircle, Terminal } from 'lucide-react';
import { ErrorState } from '../types';
import { ERROR_MESSAGES } from '../config/constants';

interface StatusMessageProps {
  error: ErrorState;
  success: boolean;
}

export function StatusMessage({ error, success }: StatusMessageProps) {
  if (error.show) {
    const isConnectionError = error.message === ERROR_MESSAGES.CONNECTION;

    return (
      <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <div className="ml-3">
            <p className="text-sm text-red-700">{error.message}</p>
            {isConnectionError && (
              <div className="mt-2">
                <p className="text-sm font-medium text-red-800">Setup Instructions:</p>
                <div className="mt-2 bg-red-100 rounded-md p-3">
                  <div className="flex items-center space-x-2">
                    <Terminal className="h-4 w-4 text-red-600" />
                    <code className="text-xs text-red-900">pip install -r requirements.txt</code>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Terminal className="h-4 w-4 text-red-600" />
                    <code className="text-xs text-red-900">npm run start-backend</code>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4">
        <div className="flex items-center">
          <FileSpreadsheet className="h-5 w-5 text-green-400" />
          <div className="ml-3">
            <p className="text-sm text-green-700">
              Data has been successfully scraped and saved to Excel!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}