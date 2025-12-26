import { useState, useCallback } from 'react';
import { reviewCode } from '../services/api';

export const useCodeReview = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const analyzeCode = useCallback(async (code, filename, reviewType) => {
    if (!code.trim()) {
      setError('Please enter some code to review');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await reviewCode({ code, filename, reviewType });

      setResult(data);

      setHistory(prev => [{
        id: Date.now(),
        filename,
        reviewType,
        timestamp: new Date().toISOString(),
        summary: data.summary,
        issueCount: data.issues?.length || 0
      }, ...prev].slice(0, 10));

      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    loading,
    result,
    error,
    history,
    analyzeCode,
    reset,
    clearHistory
  };
};
