import React, { useRef } from 'react';
import { EmailEditor } from 'react-email-editor';

function App() {
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { html } = data;
      console.log('Exported HTML:', html);
      alert('HTML exported! Check console for output.');
    });
  };

  const onReady = (unlayer) => {
    console.log('✅ Email Editor is ready!');
    console.log('Note: Custom tools must be loaded via customJS from a public URL');
    console.log('For production, host custom-tool.js on a CDN or public server');
    console.log('For development, you can use ngrok, GitHub Pages, or similar services');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f0f0f0', 
        borderBottom: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Product Showcase Card - Custom Tool Demo</h1>
        <button 
          onClick={exportHtml}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007AFF',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Export HTML
        </button>
      </div>
      
      <EmailEditor
        ref={emailEditorRef}
        onReady={onReady}
        options={{
          displayMode: 'email',
          projectId: 1234,
          appearance: {
            panels: {
              tools: {
                dock: 'left'
              }
            }
          },
          features: {
            preview: true
          }
        }}
        style={{ flex: 1, width: '100%' }}
      />
    </div>
  );
}

export default App;
