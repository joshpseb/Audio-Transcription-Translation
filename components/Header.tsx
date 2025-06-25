
import React from 'react';
import { SparklesIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 text-center">
      <div className="inline-flex items-center">
        {/*<SparklesIcon className="w-10 h-10 text-sky-400 mr-3">*/}
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
          Audio Trancription & Translation
        </h1>
      </div>
      <p className="mt-2 text-lg text-slate-400">
        Upload audio, get transcription & English translation.
      </p>
    </header>
  );
};
