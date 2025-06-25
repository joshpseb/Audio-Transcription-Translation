import React, { useCallback, useState } from 'react';
import { UploadCloudIcon } from './IconComponents';

interface AudioFileInputProps {
  onChange: (file: File | null, dataUrl: string | null) => void;
  disabled?: boolean;
}

export const AudioFileInput: React.FC<AudioFileInputProps> = ({ onChange, disabled = false }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback((file: File | undefined | null) => {
     if (file) {
      if (!file.type.startsWith('audio/')) {
        alert('Please upload a valid audio file (e.g., MP3, WAV, OGG, AAC).');
        onChange(null, null);
        setFileName(null);
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(file, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onChange(null, null);
      setFileName(null);
    }
  }, [onChange]);
  
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = event.target.files?.[0];
    processFile(file);
  }, [processFile, disabled]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    if (disabled) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    processFile(file);
  }, [processFile, disabled]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    if (disabled) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    if (disabled) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, [disabled]);


  return (
    <label
      htmlFor="audio-upload"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`flex flex-col items-center justify-center w-full h-48 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer transition-colors duration-200
                  ${disabled ? 'bg-slate-800 opacity-50 cursor-not-allowed' : 
                    isDragging ? 'bg-slate-700 border-sky-500' : 'bg-slate-700/50 hover:bg-slate-700'}`}
      aria-disabled={disabled}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
        <UploadCloudIcon className={`w-12 h-12 mb-3 ${isDragging && !disabled ? 'text-sky-400' : 'text-slate-500'}`} />
        {fileName && !disabled ? (
          <>
            <p className="mb-2 text-sm text-sky-400 font-semibold">{fileName}</p>
            <p className="text-xs text-slate-500">Drag & drop or click to change</p>
          </>
        ) : (
          <>
            <p className="mb-2 text-sm text-slate-400">
              <span className={`font-semibold ${disabled ? 'text-slate-500' : 'text-sky-400'}`}>Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500">MP3, WAV, OGG, AAC, etc.</p>
          </>
        )}
      </div>
      <input
        id="audio-upload"
        type="file"
        className="hidden"
        accept="audio/*,audio/ogg"
        onChange={handleFileChange}
        disabled={disabled}
      />
    </label>
  );
};