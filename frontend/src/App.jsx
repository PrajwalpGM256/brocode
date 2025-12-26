import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import EditorPanel from '@/components/features/editor/EditorPanel';
import ResultsPanel from '@/components/features/results/ResultsPanel';
import { useCodeReview } from '@/hooks/useCodeReview';
import { SAMPLE_CODE } from '@/data/constants';
import { colors } from '@/config/theme';

function App() {
  const [code, setCode] = useState('');
  const [filename, setFilename] = useState('example.js');
  
  // Layout State
  const [editorWidthPercent, setEditorWidthPercent] = useState(50);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
  
  const { 
    loading, 
    result, 
    error, 
    analyzeCode, 
    reset 
  } = useCodeReview();

  const handleLoadSample = () => {
    setCode(SAMPLE_CODE);
    setFilename('sample.js');
    reset();
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    analyzeCode(code, filename, 'general'); // Defaulting to general review for now
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFilename(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setCode(event.target.result);
    };
    reader.readAsText(file);
  };

  // Resize Handlers
  const isResizingEditor = useRef(false);
  const appContainerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizingEditor.current && appContainerRef.current) {
        // Calculate percentage relative to the total width
        const appWidth = appContainerRef.current.offsetWidth;
        const relativeX = e.clientX;
        const newPercent = (relativeX / appWidth) * 100;
        
        // Constrain between 20% and 80%
        setEditorWidthPercent(Math.max(20, Math.min(newPercent, 80)));
      }
    };

    const handleMouseUp = () => {
      isResizingEditor.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startResizingEditor = () => {
    isResizingEditor.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        background: '#050505',
        color: colors.text.primary,
        overflow: 'hidden',
        fontFamily: '"Inter", sans-serif',
        position: 'relative', // Context for absolute navbar
      }}
    >
      
      {/* Top Navbar with Collapsible Controls */}
      <Navbar
         filename={filename}
         setFilename={setFilename}
         loading={loading}
         onLoadSample={handleLoadSample}
         onFileUpload={handleFileUpload}
         onSubmit={handleSubmit}
         isCollapsed={isNavbarCollapsed}
         onToggleCollapse={() => setIsNavbarCollapsed(!isNavbarCollapsed)}
      />
      
      {/* Main Content Area - Full Width */}
      <div 
        ref={appContainerRef}
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden', // Contain content
          marginTop: isNavbarCollapsed ? '0px' : '0px', 
          height: '100%',
          paddingTop: isNavbarCollapsed ? '0' : '48px', // Push content down only when expanded
          transition: 'padding-top 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        
        {/* Editor Pane */}
        <div style={{
          width: `${editorWidthPercent}%`,
          position: 'relative',
          background: '#0a0a0b',
          display: 'flex',
          flexDirection: 'column',
          borderRight: `1px solid ${colors.border.default}`,
        }}>
          <EditorPanel 
            code={code} 
            setCode={setCode} 
            loading={loading} 
          />
          
          {/* Editor Resize Handle */}
           <div 
            onMouseDown={startResizingEditor}
            style={{
              width: '4px',
              height: '100%',
              cursor: 'col-resize',
              position: 'absolute',
              right: '-2px', // Centered on the border
              top: 0,
              zIndex: 30,
              background: 'transparent',
            }}
            className="hover:bg-primary/50"
          />
        </div>
        
        {/* Results Pane */}
        <div style={{
          flex: 1, // Takes remaining width
          position: 'relative',
          background: '#050505',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}>
          <ResultsPanel 
            result={result} 
            loading={loading} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;