import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import SettingsPanel from '@/components/features/settings/SettingsPanel';
import EditorPanel from '@/components/features/editor/EditorPanel';
import ResultsPanel from '@/components/features/results/ResultsPanel';
import { useCodeReview } from '@/hooks/useCodeReview';
import { SAMPLE_CODE } from '@/data/constants';

function App() {
  const [code, setCode] = useState('');
  const [filename, setFilename] = useState('example.js');
  const [reviewType, setReviewType] = useState('general');
  
  const { 
    loading, 
    result, 
    error, 
    analyzeCode, 
    reset 
  } = useCodeReview();

  const handleLoadSample = () => {
    setCode(SAMPLE_CODE);
    reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    analyzeCode(code, filename, reviewType);
  };

  return (
    <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Sidebar - Fixed Width */}
      <div className="w-[300px] flex-shrink-0 z-20 shadow-2xl bg-card border-r border-border">
        <Sidebar>
          <SettingsPanel
            filename={filename}
            setFilename={setFilename}
            reviewType={reviewType}
            setReviewType={setReviewType}
            loading={loading}
            onLoadSample={handleLoadSample}
            onSubmit={handleSubmit}
          />
        </Sidebar>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor - Resizable or Fixed Split */}
        <div className="w-1/2 min-w-[400px] border-r border-border relative bg-[#1e1e1e]">
          <EditorPanel 
            code={code} 
            setCode={setCode} 
            loading={loading} 
          />
        </div>
        
        {/* Results Panel */}
        <div className="w-1/2 min-w-[400px] bg-card/30 backdrop-blur-sm relative">
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