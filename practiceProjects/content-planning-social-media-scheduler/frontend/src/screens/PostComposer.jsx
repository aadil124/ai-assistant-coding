import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function PostComposer({ setActiveTab, addPost }) {
  const [caption, setCaption] = useState('');
  const [platforms, setPlatforms] = useState(['instagram']);
  const [media, setMedia] = useState([
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80'
  ]);
  const [scheduleDate, setScheduleDate] = useState('2026-06-10');
  const [scheduleTime, setScheduleTime] = useState('14:30');
  
  // AI Assistant drawer
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTone, setAiTone] = useState('BOLD');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  // Character limit calculations
  const isOverlimit = platforms.includes('twitter') && caption.length > 280;
  
  const handlePlatformToggle = (platform) => {
    if (platforms.includes(platform)) {
      if (platforms.length > 1) {
        setPlatforms(platforms.filter(p => p !== platform));
      }
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const handleAIQuery = async () => {
    if (!aiPrompt) return;
    setAiLoading(true);
    try {
      const res = await api.post('/ai/generate-caption', {
        prompt: aiPrompt,
        tone: aiTone,
        platform: platforms[0] || 'linkedin',
        length: 'medium'
      });
      if (res.success && res.captions) {
        setAiSuggestions(res.captions);
      }
    } catch (err) {
      console.error('Failed to generate AI captions:', err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSuggestTags = async () => {
    if (!caption) return;
    try {
      const res = await api.post('/ai/generate-hashtags', { caption });
      if (res.success && res.hashtags) {
        setCaption(prev => `${prev} ${res.hashtags.join(' ')}`);
      }
    } catch (err) {
      console.error('Failed to suggest tags:', err.message);
    }
  };

  const handleMockUpload = () => {
    // Add mock upload image
    setMedia([
      ...media,
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80'
    ]);
  };

  const handleSubmit = () => {
    if (isOverlimit) return;
    const dateStr = new Date(`${scheduleDate}T${scheduleTime}:00`).toISOString();
    addPost({
      caption,
      platforms,
      media,
      scheduledTime: dateStr
    });
    setToastShow(true);
    setTimeout(() => {
      setToastShow(false);
      setActiveTab('calendar');
    }, 2500);
  };

  return (
    <div className="d-flex flex-grow-1 overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Left Pane: Post Builder */}
      <section className="w-50 border-end overflow-auto p-4 bg-white d-flex flex-column gap-4 custom-scrollbar">
        {/* Platforms Selectors */}
        <div>
          <label className="text-xs-caps d-block mb-2">Target Networks</label>
          <div className="d-flex gap-2">
            {[
              { id: 'instagram', label: 'Instagram', icon: 'photo_camera' },
              { id: 'linkedin', label: 'LinkedIn', icon: 'work' },
              { id: 'twitter', label: 'X / Twitter', icon: 'close' }
            ].map(p => {
              const active = platforms.includes(p.id);
              return (
                <button
                  key={p.id}
                  className={`btn flex-fill d-flex align-items-center justify-content-center gap-2 py-2.5 rounded-3 border-2 transition-all ${active ? 'border-primary bg-primary-subtle text-primary font-weight-bold' : 'border-light-subtle bg-transparent text-muted'}`}
                  onClick={() => handlePlatformToggle(p.id)}
                  data-testid={`platform-checkbox-${p.id}`}
                >
                  <span className="material-symbols-outlined">{p.icon}</span>
                  <span style={{ fontSize: '12px' }}>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Caption Area */}
        <div className="position-relative">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="text-xs-caps m-0">Post Copy</label>
            <button 
              className="btn btn-sm btn-outline-primary ai-gradient-border rounded-pill px-3 py-1 d-flex align-items-center gap-1"
              onClick={() => setAiOpen(!aiOpen)}
              data-testid="ai-drawer-trigger-btn"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>auto_awesome</span>
              <span style={{ fontSize: '11px', fontWeight: '700' }}>AI Helper</span>
            </button>
          </div>

          <div className="position-relative border rounded-3 bg-light p-2">
            <textarea
              className="form-control border-0 bg-transparent shadow-none"
              style={{ height: '140px', resize: 'none', fontSize: '14px' }}
              placeholder="Draft your post caption here..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              data-testid="post-caption-textarea"
            />
            <div className="d-flex justify-content-end align-items-center gap-2 mt-2 px-2 text-muted">
              <span className="material-symbols-outlined" style={{ fontSize: '18px', cursor: 'pointer' }}>sentiment_satisfied</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', cursor: 'pointer' }}>alternate_email</span>
              <span 
                className={`font-monospace text-muted ${isOverlimit ? 'text-danger fw-bold' : ''}`}
                style={{ fontSize: '10px' }}
                data-testid="char-counter"
              >
                {caption.length} {platforms.includes('twitter') ? '/ 280' : ''}
              </span>
            </div>
          </div>

          {/* Quick AI Options Toolbar */}
          <div className="d-flex gap-1.5 mt-2">
            <button className="btn btn-light btn-sm text-xs-caps px-3 rounded-pill bg-body-secondary" style={{ fontSize: '10px' }} onClick={() => { setAiPrompt('Improve readability'); setAiOpen(true); }}>Improve Writing</button>
            <button className="btn btn-light btn-sm text-xs-caps px-3 rounded-pill bg-body-secondary" style={{ fontSize: '10px' }} onClick={handleSuggestTags}>Suggest Tags</button>
          </div>
        </div>

        {/* Media Asset uploads */}
        <div>
          <label className="text-xs-caps d-block mb-2">Media Attachments</label>
          <div className="row g-2">
            <div className="col-3">
              <div 
                className="border-2 border-dashed border-secondary rounded-3 d-flex flex-column align-items-center justify-content-center cursor-pointer hover-bg-light aspect-square"
                style={{ height: '80px', width: '80px' }}
                onClick={handleMockUpload}
                data-testid="file-upload-dropzone"
              >
                <span className="material-symbols-outlined text-muted">add_photo_alternate</span>
                <span className="text-muted text-xs-caps mt-1" style={{ fontSize: '8px' }}>Upload</span>
              </div>
            </div>
            {media.map((url, i) => (
              <div key={i} className="col-3 relative position-relative" style={{ height: '80px', width: '80px' }}>
                <img src={url} alt="attached asset" className="w-100 h-100 object-fit-cover rounded-3 border" />
                <button 
                  className="btn btn-sm btn-dark p-0 rounded-circle position-absolute" 
                  style={{ top: '-4px', right: '-4px', width: '18px', height: '18px', fontSize: '10px' }}
                  onClick={() => setMedia(media.filter((_, idx) => idx !== i))}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule settings */}
        <div className="pt-3 border-top">
          <label className="text-xs-caps d-block mb-2">Publishing Schedule</label>
          <div className="d-flex align-items-center gap-3">
            <input 
              type="date" 
              className="form-control rounded-3" 
              value={scheduleDate} 
              onChange={(e) => setScheduleDate(e.target.value)}
              data-testid="start-date-input"
            />
            <input 
              type="time" 
              className="form-control rounded-3" 
              value={scheduleTime} 
              onChange={(e) => setScheduleTime(e.target.value)}
              data-testid="time-input-field"
            />
          </div>
          <p className="text-primary text-xs-caps m-0 mt-2 d-flex align-items-center gap-1 font-weight-bold">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>bolt</span>
            Optimal posting slot: June 10, 2:30 PM (Est. Reach +18%)
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="d-flex justify-content-end gap-2 pt-3 border-top mt-auto">
          <button className="btn btn-outline-secondary px-4 py-2" style={{ borderRadius: '8px' }}>Save Draft</button>
          <button 
            className="btn btn-primary px-4 py-2" 
            style={{ borderRadius: '8px' }}
            disabled={isOverlimit || !caption}
            onClick={handleSubmit}
            data-testid="post-submit-btn"
          >
            Submit for Review
          </button>
        </div>
      </section>

      {/* Right Pane: Simulator Feed Preview */}
      <section className="flex-fill bg-light d-flex flex-column align-items-center justify-content-center p-4">
        {/* Preview selection tabs */}
        <div className="bg-white p-1 rounded-pill border d-flex gap-1 mb-4 shadow-sm">
          {['instagram', 'linkedin', 'twitter'].map(plat => (
            <button
              key={plat}
              className={`btn btn-sm px-4 py-1.5 rounded-pill border-0 font-weight-bold text-xs-caps ${platforms.includes(plat) ? 'bg-primary text-white' : 'text-muted'}`}
            >
              {plat}
            </button>
          ))}
        </div>

        {/* Mobile simulator mock card */}
        <div className="device-simulator overflow-hidden flex-column d-flex position-relative shadow border" style={{ width: '320px', height: '540px' }}>
          {/* Status Bar */}
          <div className="d-flex justify-content-between align-items-center px-4 py-2 text-dark bg-white" style={{ fontSize: '11px' }}>
            <span className="font-weight-bold">9:41</span>
            <div className="d-flex gap-1">
              <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>signal_cellular_4_bar</span>
              <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>wifi</span>
            </div>
          </div>
          {/* Profile Header */}
          <div className="d-flex align-items-center gap-2 p-2 border-bottom">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" alt="avatar" className="rounded-circle border" style={{ width: '28px', height: '28px' }} />
            <span className="font-weight-bold text-dark" style={{ fontSize: '11px' }}>arivera_creatives</span>
            <span className="material-symbols-outlined text-muted text-sm ms-auto">more_horiz</span>
          </div>
          {/* Image canvas */}
          <div className="bg-light flex-grow-1 position-relative d-flex align-items-center justify-content-center overflow-hidden" style={{ minHeight: '240px' }}>
            {media.length > 0 ? (
              <img src={media[0]} alt="preview post" className="w-100 h-100 object-fit-cover" />
            ) : (
              <span className="text-muted text-xs-caps">No Media Attached</span>
            )}
          </div>
          {/* Action details */}
          <div className="p-2 d-flex justify-content-between align-items-center border-top">
            <div className="d-flex gap-3 text-dark">
              <span className="material-symbols-outlined">favorite</span>
              <span className="material-symbols-outlined">chat_bubble</span>
            </div>
            <span className="material-symbols-outlined">bookmark</span>
          </div>
          {/* Text block */}
          <div className="px-2 pb-3 overflow-auto" style={{ maxHeight: '100px' }}>
            <p className="m-0 text-dark" style={{ fontSize: '11px', lineHeight: '1.4' }}>
              <span className="font-weight-bold me-1">arivera_creatives</span>
              {caption || <span className="text-muted italic">Caption text draft renders here...</span>}
            </p>
          </div>
        </div>
      </section>

      {/* AI Assistant Overlay Drawer */}
      {aiOpen && (
        <div 
          className="position-fixed end-0 top-0 bottom-0 bg-white border-start shadow-lg z-3 p-4 d-flex flex-column gap-3"
          style={{ width: '380px', marginTop: '64px', height: 'calc(100vh - 64px)' }}
          data-testid="ai-assistant-drawer"
        >
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="m-0 font-weight-bold text-dark">AI Writing Assistant</h5>
            <button className="btn btn-close border-0 bg-transparent text-dark font-weight-bold" onClick={() => setAiOpen(false)}>×</button>
          </div>

          <div className="form-group">
            <label className="text-xs-caps mb-1">Instruction Prompt</label>
            <input 
              type="text" 
              className="form-control rounded-3" 
              placeholder="e.g. Write an announcement about sustainable packaging" 
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              data-testid="ai-prompt-input"
            />
          </div>

          <div>
            <label className="text-xs-caps mb-1">Tone Selection</label>
            <div className="d-flex flex-wrap gap-1">
              {['PROFESSIONAL', 'CASUAL', 'BOLD', 'PLAYFUL'].map(tone => (
                <button
                  key={tone}
                  className={`btn btn-sm rounded-pill px-3 py-1 ${aiTone === tone ? 'btn-primary' : 'btn-light'}`}
                  onClick={() => setAiTone(tone)}
                  data-testid={`tone-btn-${tone}`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 font-weight-bold"
            disabled={aiLoading || !aiPrompt}
            onClick={handleAIQuery}
            data-testid="ai-generate-btn"
          >
            {aiLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" data-testid="ai-loading-indicator"></span>
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>auto_awesome</span>
            )}
            Generate Options
          </button>

          {/* Suggestions options list */}
          <div className="flex-grow-1 overflow-auto d-flex flex-column gap-2 mt-2 custom-scrollbar">
            {aiSuggestions.map((opt, i) => (
              <div key={i} className="card p-3 rounded-3 border bg-light text-dark shadow-sm" data-testid="ai-option-card">
                <p className="m-0 option-text" style={{ fontSize: '11px', lineHeight: '1.4' }}>{opt}</p>
                <div className="d-flex justify-content-end gap-2 mt-2">
                  <button 
                    className="btn btn-sm btn-link p-0 text-decoration-none font-weight-bold" 
                    style={{ fontSize: '10px' }}
                    onClick={() => navigator.clipboard.writeText(opt)}
                  >
                    Copy
                  </button>
                  <button 
                    className="btn btn-sm btn-primary rounded px-2" 
                    style={{ fontSize: '10px' }}
                    onClick={() => { setCaption(opt); setAiOpen(false); }}
                    data-testid="use-caption-btn"
                  >
                    Use Caption
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quota bar */}
          <div className="mt-auto pt-3 border-top">
            <div className="d-flex justify-content-between text-muted mb-1" style={{ fontSize: '10px' }}>
              <span>Monthly AI Quota</span>
              <span>12,500 / 50000 tokens</span>
            </div>
            <div className="progress" style={{ height: '6px' }}>
              <div className="progress-bar bg-primary" role="progressbar" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {toastShow && (
        <div 
          className="position-fixed bottom-0 end-0 m-4 p-3 bg-success text-white rounded-3 shadow-lg z-3"
          style={{ transition: 'all 0.5s ease-in-out' }}
        >
          <div className="d-flex align-items-center gap-2">
            <span className="material-symbols-outlined">check_circle</span>
            <div>
              <p className="m-0 font-weight-bold" style={{ fontSize: '13px' }}>Draft Submitted</p>
              <p className="m-0" style={{ fontSize: '11px' }}>Post added to calendar, pending reviewer checks.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
