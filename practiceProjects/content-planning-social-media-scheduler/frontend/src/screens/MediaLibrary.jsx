import React, { useState } from 'react';

const initialAssets = [
  { id: '1', filename: 'workspace_desk.jpg', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80', size: '1.2 MB', type: 'image/jpeg', tags: ['setup', 'marketing'] },
  { id: '2', filename: 'analytics_chart.jpg', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80', size: '850 KB', type: 'image/jpeg', tags: ['analytics', 'recap'] },
  { id: '3', filename: 'api_tools_promo.jpg', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80', size: '2.4 MB', type: 'image/jpeg', tags: ['development', 'promo'] }
];

export default function MediaLibrary() {
  const [assets, setAssets] = useState(initialAssets);
  const [search, setSearch] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [newTag, setNewTag] = useState('');

  const handleMockUpload = (e) => {
    e.preventDefault();
    const newAsset = {
      id: String(assets.length + 1),
      filename: 'uploaded_capture.jpg',
      url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80',
      size: '1.8 MB',
      type: 'image/jpeg',
      tags: ['upload']
    };
    setAssets([newAsset, ...assets]);
  };

  const handleAddTag = () => {
    if (!newTag || !selectedAsset) return;
    const updated = assets.map(a => {
      if (a.id === selectedAsset.id) {
        return { ...a, tags: [...a.tags, newTag] };
      }
      return a;
    });
    setAssets(updated);
    setSelectedAsset({ ...selectedAsset, tags: [...selectedAsset.tags, newTag] });
    setNewTag('');
  };

  const filteredAssets = assets.filter(a => 
    a.filename.toLowerCase().includes(search.toLowerCase()) ||
    a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="d-flex flex-grow-1 overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Main Grid Pane */}
      <section className="flex-grow-1 p-4 overflow-auto custom-scrollbar bg-light">
        {/* Top Search Controls */}
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
          <div className="position-relative flex-grow-1" style={{ maxWidth: '400px' }}>
            <span className="material-symbols-outlined position-absolute left-3 top-50 translate-middle-y text-muted" style={{ paddingLeft: '12px' }}>search</span>
            <input 
              type="text" 
              className="form-control rounded-3 ps-5" 
              placeholder="Search assets by filename or tags..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary d-flex align-items-center gap-1" onClick={handleMockUpload}>
            <span className="material-symbols-outlined">upload_file</span>
            Mock File Upload
          </button>
        </div>

        {/* Upload drop zone */}
        <div 
          className="border-2 border-dashed border-secondary rounded-3 p-4 text-center bg-white hover-bg-light cursor-pointer mb-4 shadow-sm"
          onClick={handleMockUpload}
        >
          <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: '36px' }}>cloud_upload</span>
          <h6 className="font-weight-bold text-dark">Drag and Drop media files here</h6>
          <p className="text-muted m-0" style={{ fontSize: '11px' }}>Supports PNG, JPEG, WEBP, MP4 (Images up to 10MB, Videos up to 150MB)</p>
        </div>

        {/* Grid assets */}
        <div className="row g-3">
          {filteredAssets.map(asset => (
            <div key={asset.id} className="col-6 col-sm-4 col-xl-3">
              <div 
                className={`card border rounded-3 overflow-hidden shadow-sm h-100 cursor-pointer transition-all ${selectedAsset?.id === asset.id ? 'border-primary shadow' : ''}`}
                onClick={() => setSelectedAsset(asset)}
              >
                <img src={asset.url} alt={asset.filename} className="w-100 object-fit-cover" style={{ height: '140px' }} />
                <div className="p-2">
                  <p className="m-0 text-dark font-weight-bold truncate" style={{ fontSize: '12px' }}>{asset.filename}</p>
                  <span className="text-muted" style={{ fontSize: '10px' }}>{asset.size}</span>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {asset.tags.map(t => (
                      <span key={t} className="badge bg-secondary-subtle text-secondary" style={{ fontSize: '8px' }}>#{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredAssets.length === 0 && (
            <div className="text-center py-5 text-muted col-12">
              <span className="material-symbols-outlined mb-2" style={{ fontSize: '32px' }}>photo_library</span>
              <p className="m-0" style={{ fontSize: '12px' }}>No media assets match your query.</p>
            </div>
          )}
        </div>
      </section>

      {/* Right Drawer Panel: Details */}
      {selectedAsset && (
        <section className="bg-white border-start p-4 d-flex flex-column gap-3 overflow-auto custom-scrollbar" style={{ width: '340px' }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="m-0 font-weight-bold text-dark">Asset Details</h5>
            <button className="btn btn-close border-0 bg-transparent" onClick={() => setSelectedAsset(null)}>×</button>
          </div>

          <img src={selectedAsset.url} alt="detail" className="w-100 rounded-3 border mb-3 object-fit-cover" style={{ maxHeight: '180px' }} />

          <div className="mb-2">
            <label className="text-xs-caps">Filename</label>
            <p className="m-0 text-dark font-weight-bold" style={{ fontSize: '13px' }}>{selectedAsset.filename}</p>
          </div>

          <div className="row g-2 mb-2">
            <div className="col-6">
              <label className="text-xs-caps">File Size</label>
              <p className="m-0 text-dark" style={{ fontSize: '12px' }}>{selectedAsset.size}</p>
            </div>
            <div className="col-6">
              <label className="text-xs-caps">Type</label>
              <p className="m-0 text-dark" style={{ fontSize: '12px' }}>{selectedAsset.type}</p>
            </div>
          </div>

          <div>
            <label className="text-xs-caps mb-2">Asset Tags</label>
            <div className="d-flex flex-wrap gap-1.5 mb-3">
              {selectedAsset.tags.map(tag => (
                <span key={tag} className="badge bg-primary-subtle text-primary p-2 d-flex align-items-center gap-1" style={{ borderRadius: '15px' }}>
                  #{tag}
                  <span className="cursor-pointer" style={{ cursor: 'pointer' }} onClick={() => {
                    const updatedTags = selectedAsset.tags.filter(t => t !== tag);
                    setAssets(assets.map(a => a.id === selectedAsset.id ? { ...a, tags: updatedTags } : a));
                    setSelectedAsset({ ...selectedAsset, tags: updatedTags });
                  }}>×</span>
                </span>
              ))}
            </div>

            <div className="d-flex gap-2">
              <input 
                type="text" 
                className="form-control form-control-sm rounded-3" 
                placeholder="Add tag..." 
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <button className="btn btn-sm btn-outline-primary" onClick={handleAddTag}>Add</button>
            </div>
          </div>

          <button className="btn btn-outline-danger w-100 mt-auto py-2 d-flex align-items-center justify-content-center gap-1" onClick={() => {
            setAssets(assets.filter(a => a.id !== selectedAsset.id));
            setSelectedAsset(null);
          }}>
            <span className="material-symbols-outlined text-sm" style={{ fontSize: '16px' }}>delete</span>
            Delete Asset
          </button>
        </section>
      )}
    </div>
  );
}
