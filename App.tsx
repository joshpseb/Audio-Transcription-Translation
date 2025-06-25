import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { LanguageSelector } from './components/LanguageSelector';
import { AudioFileInput } from './components/AudioFileInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { 
  TranscribeIcon, LanguageIcon, FileAudioIcon, MicrophoneIcon, 
  StopIcon, PlayIcon, TrashIcon, RefreshIcon, RecordIcon 
} from './components/IconComponents';
import { transcribeAudio, translateText } from './services/geminiService';
import { SUPPORTED_LANGUAGES } from './constants';
import type { LanguageOption } from './types';

import { Analytics } from "@vercel/analytics/react"

type InputMode = 'upload' | 'record';

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption | null>(SUPPORTED_LANGUAGES[0] || null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDataUrl, setAudioDataUrl] = useState<string | null>(null);
  
  const [originalTranscription, setOriginalTranscription] = useState<string | null>(null);
  const [currentTranscription, setCurrentTranscription] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const [inputMode, setInputMode] = useState<InputMode>('upload');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const resetResults = () => {
    setOriginalTranscription(null);
    setCurrentTranscription(null);
    setTranslation(null);
    setError(null);
  };

  const handleLanguageChange = useCallback((languageValue: string) => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.value === languageValue) || null;
    setSelectedLanguage(lang);
    resetResults();
  }, []);

  const handleFileChange = useCallback((file: File | null, dataUrl: string | null) => {
    setAudioFile(file);
    setAudioDataUrl(dataUrl);
    if (file) { // If a new file is uploaded, clear any recorded audio
      setRecordedAudioBlob(null);
      setRecordedAudioUrl(null);
    }
    resetResults();
  }, []);

  const handleTranscriptionChange = useCallback((newTranscription: string) => {
    setCurrentTranscription(newTranscription);
  }, []);

  const processAudio = useCallback(async (base64Audio: string, mimeType: string) => {
    if (!selectedLanguage) {
      setError("Please select a language.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setOriginalTranscription(null);
    setCurrentTranscription(null);
    setTranslation(null);

    try {
      setCurrentTask("Transcribing audio...");
      const rawTranscription = await transcribeAudio(base64Audio, mimeType, selectedLanguage.geminiName);
      setOriginalTranscription(rawTranscription);
      setCurrentTranscription(rawTranscription);

      if (rawTranscription.trim()) {
        setCurrentTask("Translating text...");
        const englishTranslation = await translateText(rawTranscription, selectedLanguage.geminiName);
        setTranslation(englishTranslation);
      } else {
        setTranslation("Transcription was empty, nothing to translate.");
      }
    } catch (err) {
      console.error("Error processing audio:", err);
      setError(err instanceof Error ? `Failed to process audio: ${err.message}` : "An unknown error occurred during audio processing.");
    } finally {
      setIsLoading(false);
      setCurrentTask('');
    }
  }, [selectedLanguage]);

  const handleProcessUploadedAudio = useCallback(async () => {
    if (!audioDataUrl || !audioFile) {
      setError("Please upload an audio file.");
      return;
    }
    const base64 = audioDataUrl.split(',')[1];
    if (!base64) {
      setError("Invalid audio file data.");
      return;
    }
    processAudio(base64, audioFile.type);
  }, [audioDataUrl, audioFile, processAudio]);


  const handleStartRecording = useCallback(async () => {
    if (isRecording) return;
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); // Browsers often default to webm
        setRecordedAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setRecordedAudioUrl(url);
        audioChunksRef.current = [];
        // Stop all tracks on the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordedAudioBlob(null); // Clear previous recording
      setRecordedAudioUrl(null);
      setAudioFile(null); // Clear any uploaded file
      setAudioDataUrl(null);
      resetResults();
    } catch (err) {
      console.error("Error starting recording:", err);
      setError("Failed to start recording. Please ensure microphone access is allowed.");
      setIsRecording(false);
    }
  }, [isRecording]);

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const handleUseRecording = useCallback(() => {
    if (recordedAudioBlob) {
      const file = new File([recordedAudioBlob], `recorded_audio.${recordedAudioBlob.type.split('/')[1] || 'webm'}`, { type: recordedAudioBlob.type });
      setAudioFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudioDataUrl(reader.result as string);
        // At this point, recordedAudioBlob has been converted. 
        // We might want to keep recordedAudioUrl for playback until a new recording or upload.
      };
      reader.readAsDataURL(recordedAudioBlob);
      setError(null); // Clear previous errors
      resetResults();
      // Optionally, switch back to upload mode or indicate recorded audio is ready
      // setInputMode('upload'); // Or some visual cue
    }
  }, [recordedAudioBlob]);

  const handleDiscardRecording = useCallback(() => {
    if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
    setRecordedAudioBlob(null);
    setRecordedAudioUrl(null);
    setIsRecording(false);
    if (mediaRecorderRef.current?.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    mediaRecorderRef.current = null;
    // Clear audio file states if they were from this recording
    if (audioFile?.name.startsWith('recorded_audio')) {
      setAudioFile(null);
      setAudioDataUrl(null);
    }
    resetResults();
  }, [recordedAudioUrl, audioFile]);
  
  const handleRetranslateWithEdits = useCallback(async () => {
    if (!currentTranscription || !selectedLanguage) {
      setError("No transcription available to retranslate or language not selected.");
      return;
    }
    setIsLoading(true);
    setCurrentTask("Translating edited text...");
    setError(null);
    try {
      const englishTranslation = await translateText(currentTranscription, selectedLanguage.geminiName);
      setTranslation(englishTranslation);
    } catch (err) {
      console.error("Error retranslating:", err);
      setError(err instanceof Error ? `Failed to retranslate: ${err.message}` : "An unknown error occurred during retranslation.");
    } finally {
      setIsLoading(false);
      setCurrentTask('');
    }
  }, [currentTranscription, selectedLanguage]);
  
  // Cleanup recorded audio URL
  useEffect(() => {
    return () => {
      if (recordedAudioUrl) {
        URL.revokeObjectURL(recordedAudioUrl);
      }
      // Ensure media stream is stopped if component unmounts while recording
      if (mediaRecorderRef.current?.stream && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [recordedAudioUrl]);

  const canProcess = !!(selectedLanguage && (audioFile || recordedAudioBlob));
  const showRetranslateButton = originalTranscription !== null && currentTranscription !== originalTranscription && currentTranscription !== null;


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 flex flex-col items-center p-4 selection:bg-sky-500 selection:text-white">
      <Header />
      <main className="container mx-auto max-w-2xl w-full flex-grow p-4 md:p-6">
        <div className="bg-slate-800 shadow-2xl rounded-xl p-6 md:p-8 space-y-8 border border-slate-700">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-sky-400 flex items-center">
              <LanguageIcon className="w-7 h-7 mr-3 text-sky-500" />
              1. Select Language
            </h2>
            <LanguageSelector
              languages={SUPPORTED_LANGUAGES}
              selectedLanguage={selectedLanguage?.value || ''}
              onChange={handleLanguageChange}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-sky-400 flex items-center">
              {inputMode === 'upload' ? <FileAudioIcon className="w-7 h-7 mr-3 text-sky-500" /> : <RecordIcon className="w-7 h-7 mr-3 text-sky-500" />}
              2. Provide Audio
            </h2>
            <div className="flex space-x-2 mb-4 border-b border-slate-700 pb-1">
              {(['upload', 'record'] as InputMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => {
                    setInputMode(mode);
                    // Reset file/recording specific states when switching modes
                    setAudioFile(null);
                    setAudioDataUrl(null);
                    handleDiscardRecording(); // Also discard any active/completed recording
                    resetResults();
                  }}
                  className={`px-4 py-2 rounded-t-md font-medium transition-colors
                    ${inputMode === mode ? 'bg-sky-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
                >
                  {mode === 'upload' ? 'Upload File' : 'Record Audio'}
                </button>
              ))}
            </div>

            {inputMode === 'upload' && (
              <>
                <AudioFileInput onChange={handleFileChange} />
                {audioFile && (
                  <p className="text-sm text-slate-400">Selected: <span className="font-medium text-slate-300">{audioFile.name}</span> ({(audioFile.size / 1024).toFixed(2)} KB)</p>
                )}
              </>
            )}

            {inputMode === 'record' && (
              <div className="space-y-4 p-4 bg-slate-700/30 rounded-lg">
                {!isRecording && !recordedAudioUrl && (
                  <button
                    onClick={handleStartRecording}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <MicrophoneIcon className="w-5 h-5 mr-2" /> Start Recording
                  </button>
                )}
                {isRecording && (
                  <button
                    onClick={handleStopRecording}
                    className="w-full flex items-center justify-center bg-red-600 hover:bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <StopIcon className="w-5 h-5 mr-2" /> Stop Recording
                  </button>
                )}
                {isRecording && <p className="text-center text-red-400 animate-pulse">Recording...</p>}
                
                {recordedAudioUrl && !isRecording && (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-300 font-medium">Recording complete:</p>
                    <audio ref={audioPlayerRef} src={recordedAudioUrl} controls className="w-full rounded-md shadow"/>
                    <div className="flex space-x-3 pt-2">
                      <button
                        onClick={handleUseRecording}
                        className="flex-1 flex items-center justify-center bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all"
                      >
                        <PlayIcon className="w-5 h-5 mr-2 transform -rotate-0" /> Use this Recording
                      </button>
                      <button
                        onClick={handleStartRecording} // Re-record
                        className="flex-1 flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-slate-800 font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all"
                      >
                         <MicrophoneIcon className="w-5 h-5 mr-2" /> Re-record
                      </button>
                       <button
                        onClick={handleDiscardRecording}
                        title="Discard Recording"
                        className="p-2 bg-slate-600 hover:bg-red-500 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                     {audioDataUrl && audioFile?.name.startsWith('recorded_audio') && (
                        <p className="text-sm text-green-400">Selected: <span className="font-medium text-green-300">{audioFile.name}</span></p>
                     )}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <button
            onClick={handleProcessUploadedAudio}
            disabled={!canProcess || isLoading || (inputMode === 'record' && (!audioDataUrl && !recordedAudioBlob)) }
            className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
          >
            {isLoading && !currentTask.toLowerCase().includes("translating edited") ? (
              <>
                <LoadingSpinner className="w-5 h-5 mr-2"/> 
                Processing...
              </>
            ) : (
              <>
                <TranscribeIcon className="w-5 h-5 mr-2" />
                Transcribe & Translate Audio
              </>
            )}
          </button>

          {isLoading && currentTask && (
            <p className="text-center text-sky-400 animate-pulse">{currentTask}</p>
          )}

          {error && <ErrorMessage message={error} />}
          
          {(originalTranscription || translation) && !isLoading && (
            <ResultsDisplay
              transcription={currentTranscription}
              originalTranscription={originalTranscription}
              translation={translation}
              sourceLanguageName={selectedLanguage?.label || 'Source Language'}
              onTranscriptionChange={handleTranscriptionChange}
            />
          )}

          {showRetranslateButton && !isLoading && (
            <button
              onClick={handleRetranslateWithEdits}
              disabled={isLoading}
              className="mt-4 w-full flex items-center justify-center bg-teal-600 hover:bg-teal-500 disabled:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isLoading && currentTask.toLowerCase().includes("translating edited") ? (
                 <LoadingSpinner className="w-5 h-5 mr-2"/> 
              ) : (
                 <RefreshIcon className="w-5 h-5 mr-2" />
              )}
              Update Translation with Edits
            </button>
          )}

        </div>
      </main>
      <footer className="w-full text-center py-6 text-sm text-slate-500">
        Powered by Gemini API & React.
      </footer>
      <Analytics />
    </div>
  );
};

export default App;