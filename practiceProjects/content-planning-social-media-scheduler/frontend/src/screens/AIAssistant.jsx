import React, { useState } from 'react';
import api from '../utils/api';

export default function AIAssistant() {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('BOLD');
  const [platform, setPlatform] = useState('linkedin');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await api.post('/ai/generate-caption', {
        prompt,
        tone,
        platform,
        length: 'medium'
      });
      if (res.success && res.captions) {
        setSuggestions(res.captions);
      }
    } catch (err) {
      console.error('Failed to generate AI suggestions:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-4 overflow-auto custom-scrollbar bg-light" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="row g-4" style={{ maxWidth: '980px' }}>
        {/* Prompt Input Pane */}
        <div className="col-12 col-md-5">
          <div className="card border rounded-3 bg-white p-3 shadow-sm d-flex flex-column gap-3">
            <h5 className="font-weight-bold text-dark m-0" style={{ fontSize: '15px' }}>AI Copywriter</h5>
            
            <div className="form-group">
              <label className="text-xs-caps mb-1">Select Target Network</label>
              <select className="form-select rounded-3" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="linkedin">LinkedIn (Longer Copy, Bullet Lists)</option>
                <option value="twitter">X / Twitter (Max 280 Chars, Emojis)</option>
                <option value="instagram">Instagram (Visual Description, Tags)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="text-xs-caps mb-1">Tone Selection</label>
              <div className="d-flex flex-wrap gap-1">
                {['PROFESSIONAL', 'CASUAL', 'BOLD', 'PLAYFUL', 'HUMOROUS'].map(t => (
                  <button
                    key={t}
                    className={`btn btn-sm rounded-pill px-3 py-1 ${tone === t ? 'btn-primary' : 'btn-light'}`}
                    onClick={() => setTone(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="text-xs-caps mb-1">Topic details / Instructions</label>
              <textarea 
                className="form-control rounded-3" 
                rows="4" 
                placeholder="What should this post be about? (e.g. Announce workspace team roles release...)"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <button 
              className="btn btn-primary py-2 d-flex align-items-center justify-content-center gap-2 font-weight-bold"
              disabled={loading || !prompt}
              onClick={handleGenerate}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status"></span>
              ) : (
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>auto_awesome</span>
              )}
              Compose Options
            </button>
          </div>
        </div>

        {/* Suggestion Outputs Pane */}
        <div className="col-12 col-md-7">
          <div className="card border rounded-3 bg-white p-3 shadow-sm d-flex flex-column gap-3 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="font-weight-bold text-dark m-0" style={{ fontSize: '15px' }}>Generated Suggestions</h5>
              <span className="badge bg-light text-muted" style={{ fontSize: '10px' }}>Quota: 25% Used</span>
            </div>

            <div className="d-flex flex-column gap-3 overflow-auto custom-scrollbar flex-grow-1" style={{ maxHeight: '420px' }}>
              {suggestions.map((text, i) => (
                <div key={i} className="p-3 border rounded-3 bg-light text-dark position-relative">
                  <p className="m-0" style={{ fontSize: '12px', lineHeight: '1.5' }}>{text}</p>
                  <div className="d-flex justify-content-end mt-2">
                    <button 
                      className={`btn btn-sm ${copiedIndex === i ? 'btn-success' : 'btn-outline-primary'} rounded px-3 py-1`}
                      style={{ fontSize: '10px', fontWeight: '700' }}
                      onClick={() => handleCopy(text, i)}
                    >
                      {copiedIndex === i ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                  </div>
                </div>
              ))}
              {suggestions.length === 0 && (
                <div className="text-center py-5 my-auto text-muted">
                  <span className="material-symbols-outlined mb-2 animate-bounce" style={{ fontSize: '48px' }}>auto_awesome</span>
                  <p className="m-0" style={{ fontSize: '13px' }}>Your AI suggestions list is ready to render. Enter details on the left.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
