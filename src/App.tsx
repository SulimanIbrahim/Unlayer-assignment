import React, { useRef , useState, useEffect} from 'react';
import {EmailEditor , EditorRef, EmailEditorProps } from 'react-email-editor';
import './App.css';

type ToastType = 'success' | 'error' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const App: React.FC = () => {
    const emailEditorRef = useRef<EditorRef>(null);
    const [exportedHtml, setExportedHtml] = useState<string>('');
    const [exportedJson, setExportedJson] = useState<object | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewHtml, setPreviewHtml] = useState('');
    const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const handlePreview = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml((data: { design: object; html: string }) => {
      const { html } = data;
      setPreviewHtml(html);
      setShowPreview(true);
    });
  };

  const handleDownloadHTML = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml((data) => {
      const { html } = data;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `email-design-${Date.now()}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('HTML downloaded successfully!', 'success');
    });
  };

  const handleDownloadJSON = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.saveDesign((design: any) => {
      const blob = new Blob([JSON.stringify(design, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `email-design-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('JSON downloaded successfully!', 'success');
    });
  };

  const handleSaveToLocal = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.saveDesign((design: any) => {
      localStorage.setItem('email-template', JSON.stringify(design));
      showToast('Design saved successfully!', 'success');
    });
  };

  const handleLoadSample = () => {
    const unlayer = emailEditorRef.current?.editor;
    const savedDesign = localStorage.getItem('email-template');
    
    if (savedDesign) {
      try {
        const design = JSON.parse(savedDesign);
        unlayer?.loadDesign(design);
        showToast('Design loaded successfully!', 'success');
      } catch (error) {
        console.error('Error loading design:', error);
        showToast('Failed to load design', 'error');
      }
    } else {
      showToast('No saved design found', 'warning');
    }
  }

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    console.log('✓ Email editor ready');
  };

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-left">
          <h1>Email Designer</h1>
        </div>
        
        <div className="header-right">
          <div className="button-group">
            <button onClick={handleLoadSample} className="btn-secondary">
              <span className="btn-icon">↓</span>
              Load Design
            </button>
            <button onClick={handleSaveToLocal} className="btn-secondary">
              <span className="btn-icon">💾</span>
              Save Design
            </button>
          </div>

          <div className="button-group">
            <button onClick={handlePreview} className="btn-secondary">
              <span className="btn-icon">👁</span>
              Preview
            </button>
          </div>

          <div className="button-group">
            <button onClick={handleDownloadJSON} className="btn-tertiary">
              Download JSON
            </button>
            <button onClick={handleDownloadHTML} className="btn-primary">
              Download HTML
            </button>
          </div>
        </div>
      </div>
     
        
      <div className="editor-container">
        <EmailEditor 
          ref={emailEditorRef} 
          onReady={onReady}
          minHeight={'calc(100vh - 80px)'}
          options={{
            displayMode: 'email',
            appearance:{
                panels :{
                    tools:{dock:'left'}
                }
            },
            features: {
              preview: true, 
            },
            mergeTags: {
              first_name: {
                name: 'First Name',
                value: '{{first_name}}',
              },
              last_name: {
                name: 'Last Name',
                value: '{{last_name}}',
              },
              email: {
                name: 'Email Address',
                value: '{{email}}',
              },
              company: {
                name: 'Company Name',
                value: '{{company}}',
              },
              phone: {
                name: 'Phone Number',
                value: '{{phone}}',
              },
            },
          }}
          
        />
      </div>
      {showPreview && (
        <div className="modal-overlay" onClick={() => setShowPreview(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Preview</h2>
              <button onClick={() => setShowPreview(false)} className="modal-close-btn">
                <span>✕</span>
              </button>
            </div>

            <div className="modal-content">
              <iframe 
                srcDoc={previewHtml} 
                title="Email Preview"
                className="preview-iframe"
              />
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowPreview(false)} className="btn-secondary-modal">
                Done
              </button>
              <button onClick={handleDownloadHTML} className="btn-primary-modal">
                Download HTML
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span className="toast-icon">
              {toast.type === 'success' && '✓'}
              {toast.type === 'error' && '✕'}
              {toast.type === 'warning' && '⚠'}
            </span>
            <span className="toast-message">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
