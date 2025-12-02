import React, { useRef } from 'react';
import {EmailEditor , EditorRef, EmailEditorProps } from 'react-email-editor';
import './App.css';

const App: React.FC = () => {
  const emailEditorRef = useRef<EditorRef>(null);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml((data: { design: object; html: string }) => {
      const { html } = data;
      console.log('exportHtml', html);
    });
  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    console.log('Email editor is ready');
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Email Editor</h1>
        <button onClick={exportHtml} className="export-button">
          Export HTML
        </button>
      </div>
      <div className="editor-container">
        <EmailEditor 
          ref={emailEditorRef} 
          onReady={onReady}
        //   projectId={281996}
          minHeight="600px"
        />
      </div>
    </div>
  );
};

export default App;
