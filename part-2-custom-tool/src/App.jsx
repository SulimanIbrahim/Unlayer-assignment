import { useRef, useState } from 'react'
import { EmailEditor } from 'react-email-editor'
import './App.css'

function App() {
  const emailEditorRef = useRef(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewHtml, setPreviewHtml] = useState('')
  const [showJsonPreview, setShowJsonPreview] = useState(false)
  const [previewJson, setPreviewJson] = useState(null)
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'success') => {
    const id = Date.now()
    const newToast = { id, message, type }
    setToasts(prev => [...prev, newToast])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }

  const handlePreview = () => {
    const unlayer = emailEditorRef.current?.editor
    unlayer?.exportHtml((data) => {
      const { html } = data
      setPreviewHtml(html)
      setShowPreview(true)
    })
  }

  const handleDownloadHTML = () => {
    const unlayer = emailEditorRef.current?.editor
    unlayer?.exportHtml((data) => {
      const { html } = data
      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `email-design-${Date.now()}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      showToast('HTML downloaded successfully!', 'success')
    })
  }

  const handleDownloadJSON = () => {
    const unlayer = emailEditorRef.current?.editor
    unlayer?.saveDesign((design) => {
      setPreviewJson(design)
      setShowJsonPreview(true)
    })
  }

  const handleActualDownloadJSON = () => {
    if (!previewJson) return
    
    const blob = new Blob([JSON.stringify(previewJson, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `email-design-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    showToast('JSON downloaded successfully!', 'success')
    setShowJsonPreview(false)
  }

  const onReady = () => {
    console.log('Unlayer editor is ready!')
    console.log('Custom tool should now be available in the Content panel')
  }

  return (
    <div className="App">
      <div className="button-container">
        <button onClick={handlePreview}>
          <span className="btn-icon">👁</span>
          Preview
        </button>
        <button onClick={handleDownloadJSON}>Download JSON</button>
        <button onClick={handleDownloadHTML}>Download HTML</button>
      </div>
      <div className="editor-container">
        <EmailEditor
          ref={emailEditorRef}
          onReady={onReady}
          projectId={1}
          appearance={{
            theme: 'modern_light'
          }}
          options={{
            displayMode: 'email',
            customJS: [
              'https://gist.githack.com/SulimanIbrahim/646744c47951c073d0aa154610ea5208/raw/2cadb4c939a048ad3ba65e4a4aa7391f09c0bf4e/custom.js'
            ]
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

      {showJsonPreview && (
        <div className="modal-overlay" onClick={() => setShowJsonPreview(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>JSON Design</h2>
              <button onClick={() => setShowJsonPreview(false)} className="modal-close-btn">
                <span>✕</span>
              </button>
            </div>

            <div className="modal-content">
              <pre className="json-preview">
                {JSON.stringify(previewJson, null, 2)}
              </pre>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowJsonPreview(false)} className="btn-secondary-modal">
                Done
              </button>
              <button onClick={handleActualDownloadJSON} className="btn-primary-modal">
                <span className="btn-icon">⬇</span>
                Download JSON
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
  )
}

export default App
