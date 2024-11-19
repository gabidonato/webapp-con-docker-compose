import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return message ? (
    <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
      {message}
    </div>
  ) : null;
}