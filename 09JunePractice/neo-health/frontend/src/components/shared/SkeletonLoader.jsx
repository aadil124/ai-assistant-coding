import React from 'react';

export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const renderSkeletons = () => {
    const list = [];
    for (let i = 0; i < count; i++) {
      if (type === 'card') {
        list.push(
          <div className="col-12 col-md-6 col-xl-4" key={i}>
            <div className="neo-glass-card p-4 border bg-white shadow-sm h-100 placeholder-glow">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="placeholder bg-secondary bg-opacity-10 rounded-4" style={{ width: '80px', height: '80px' }}></div>
                <div className="flex-grow-1">
                  <div className="placeholder bg-secondary bg-opacity-20 col-8 mb-2 rounded" style={{ height: '18px' }}></div>
                  <div className="placeholder bg-secondary bg-opacity-10 col-5 rounded" style={{ height: '12px' }}></div>
                </div>
              </div>
              <div className="placeholder bg-secondary bg-opacity-10 col-12 mb-2 rounded" style={{ height: '12px' }}></div>
              <div className="placeholder bg-secondary bg-opacity-10 col-9 mb-3 rounded" style={{ height: '12px' }}></div>
              <div className="d-flex gap-2">
                <div className="placeholder bg-secondary bg-opacity-20 col-6 rounded py-3"></div>
                <div className="placeholder bg-secondary bg-opacity-10 col-6 rounded py-3"></div>
              </div>
            </div>
          </div>
        );
      } else if (type === 'row') {
        list.push(
          <tr key={i} className="placeholder-glow">
            <td className="py-3"><span className="placeholder bg-secondary bg-opacity-20 col-8 rounded" style={{ height: '15px' }}></span></td>
            <td className="py-3"><span className="placeholder bg-secondary bg-opacity-10 col-6 rounded" style={{ height: '15px' }}></span></td>
            <td className="py-3"><span className="placeholder bg-secondary bg-opacity-10 col-5 rounded" style={{ height: '15px' }}></span></td>
            <td className="py-3"><span className="placeholder bg-secondary bg-opacity-20 col-4 rounded" style={{ height: '15px' }}></span></td>
            <td className="py-3 text-end"><span className="placeholder bg-secondary bg-opacity-20 col-3 rounded py-2"></span></td>
          </tr>
        );
      } else {
        list.push(
          <div className="w-100 placeholder-glow mb-3" key={i}>
            <div className="placeholder bg-secondary bg-opacity-20 col-12 rounded mb-2" style={{ height: '40px' }}></div>
          </div>
        );
      }
    }
    return list;
  };

  if (type === 'row') {
    return <>{renderSkeletons()}</>;
  }

  return (
    <div className="row g-4">
      {renderSkeletons()}
    </div>
  );
}
