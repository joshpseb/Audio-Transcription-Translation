import React, { useState, useEffect } from 'react';
import { ClipboardCopyIcon, RefreshIcon } from './IconComponents';

interface ResultsDisplayProps {
  transcription: string | null;
  originalTranscription?: string | null; // To compare if edited
  translation: string | null;
  sourceLanguageName: string;
  onTranscriptionChange: (newText: string) => void;
}

const ResultBox: React.FC<{ 
  title: string; 
  text: string | null; 
  isEditable?: boolean;
  onChange?: (newText: string) => void;
  onCopy: () => void;
  showEditedIndicator?: boolean;
}> = ({ title, text, isEditable = false, onChange, onCopy, showEditedIndicator = false }) => {
  if (text === null && !isEditable) return null; // Only hide if not editable and no text

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow space-y-2 relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-sky-400 flex items-center">
          {title}
          {showEditedIndicator && <span className="ml-2 text-xs bg-yellow-500 text-slate-900 px-2 py-0.5 rounded-full">Edited</span>}
        </h3>
        <button
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy to clipboard"}
          className={`p-1.5 text-slate-400 hover:text-sky-400 transition-colors rounded-md hover:bg-slate-600
                      ${copied ? 'text-green-400 hover:text-green-300' : ''}`}
        >
          <ClipboardCopyIcon className="w-6 h-6 text-sky-500" />
        </button>
      </div>
      {isEditable ? (
        <textarea
          value={text || ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Transcription will appear here..."
          className="w-full text-slate-300 whitespace-pre-wrap break-words min-h-[120px] max-h-60 overflow-y-auto p-3 bg-slate-800 rounded-md scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-800 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-y"
          aria-label={title}
        />
      ) : (
         text !== null && (
          <div className="text-slate-300 whitespace-pre-wrap break-words max-h-60 overflow-y-auto p-3 bg-slate-750 rounded-md scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-800">
            {text || <span className="italic text-slate-500">No content.</span>}
          </div>
        )
      )}
       {text === null && !isEditable && (
         <p className="italic text-slate-500 p-3 bg-slate-750 rounded-md">Waiting for result...</p>
       )}
    </div>
  );
};


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  transcription, 
  originalTranscription,
  translation, 
  sourceLanguageName,
  onTranscriptionChange,
}) => {

  const copyToClipboard = (text: string | null) => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        // Notification is handled in ResultBox
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  };

  const isTranscriptionEdited = originalTranscription !== null && transcription !== null && originalTranscription !== transcription;

  return (
    <div className="space-y-6 pt-6 border-t border-slate-700">
      <ResultBox 
        title={`Transcription (${sourceLanguageName})`}
        text={transcription}
        isEditable={true}
        onChange={onTranscriptionChange}
        onCopy={() => copyToClipboard(transcription)}
        showEditedIndicator={isTranscriptionEdited}
      />
      <ResultBox
        title="English Translation"
        text={translation}
        onCopy={() => copyToClipboard(translation)}
      />
    </div>
  );
};