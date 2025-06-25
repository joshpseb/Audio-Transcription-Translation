import React from 'react';

interface IconProps {
  className?: string;
}

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188l-1.25-2.188a2.25 2.25 0 00-1.7-1.7L12 9.75l2.188-1.25a2.25 2.25 0 001.7-1.7L17 4.75l1.25 2.188a2.25 2.25 0 001.7 1.7L22.25 9.75l-2.188 1.25a2.25 2.25 0 00-1.7 1.7z" />
  </svg>
);

export const UploadCloudIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338 0 4.5 4.5 0 01-1.41 8.775H6.75z" />
  </svg>
);

export const TranscribeIcon: React.FC<IconProps> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a.75.75 0 00.75-.75V6.31L16.06 9.6a.75.75 0 001.06-1.06l-3.75-3.75a.75.75 0 00-1.06 0L8.53 8.54a.75.75 0 001.06 1.06l3.28-3.28v11.69a.75.75 0 00.75.75zM19.5 21a.75.75 0 00.75-.75v-6a.75.75 0 00-1.5 0v6a.75.75 0 00.75.75zM4.5 21a.75.75 0 00.75-.75v-6a.75.75 0 00-1.5 0v6a.75.75 0 00.75.75zM9 15.75A.75.75 0 019.75 15h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 019 15.75z" />
</svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const ClipboardCopyIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.75m0 0c0 .675-.45 1.255-1.088 1.472A48.878 48.878 0 0012 10.5c-2.298 0-4.372.464-6.334 1.343C4.95 12.005 4.5 11.425 4.5 10.75V6.998c0-.212.03-.418.084-.612m0 0c.266-.945 1.136-1.638 2.166-1.638h3c1.03 0 1.9.693 2.166 1.638m0 0C14.456 4.138 15 4.794 15 5.5v3.25m0 0c0 .75-.468 1.393-1.157 1.611a49.13 49.13 0 01-1.443.308C10.946 10.998 9.51 11.25 8 11.25c-1.51 0-2.946-.252-4.4- .731A1.724 1.724 0 012.25 9.25V5.5c0-.706.544-1.362 1.258-1.612M15 3.888v2.624m-10.5 0V3.888m10.5 0h.008v.008H15V3.888z" />
  </svg>
);

export const LanguageIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
  </svg>
);

export const FileAudioIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 8.632a.75.75 0 01-.05.923l-.001.002-.002.002-3.65 3.23a.75.75 0 01-.994-.132l-2.006-2.675a.75.75 0 111.22-.916l1.373 1.831 2.904-2.571a.75.75 0 01.924.051zM10.5 18a.75.75 0 000-1.5H7.5a.75.75 0 000 1.5h3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15a.75.75 0 000-1.5H4.5a.75.75 0 000 1.5h8.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.002 9.002 0 008.384-6.044 .75.75 0 00-.377-1.018l-1.849-.861a.75.75 0 00-.996.378A6.001 6.001 0 0112 18.75c-2.288 0-4.275-1.284-5.263-3.138a.75.75 0 00-.996-.379l-1.849.862a.75.75 0 00-.377 1.017A9.002 9.002 0 0012 21v0zM3 10.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
  </svg>
);

export const MicrophoneIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a3 3 0 003-3V6.75a3 3 0 00-6 0v9a3 3 0 003 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5h-.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.5h.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v-1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-1.5" />
  </svg>
);

export const StopIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.933-1.391 1.659-.907l8.106 4.69c.905.524.905 1.838 0 2.362l-8.106 4.69A1.928 1.928 0 015.25 18.347V5.653z" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export const RecordIcon: React.FC<IconProps> = ({ className }) => ( // Alias for MicrophoneIcon or a specific record button
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636" />
 </svg>
);