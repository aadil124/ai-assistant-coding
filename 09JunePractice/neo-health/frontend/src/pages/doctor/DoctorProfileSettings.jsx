import React, { useState } from 'react';
import DoctorLayout from '../../components/layout/DoctorLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import SectionCard from '../../components/shared/SectionCard.jsx';

export default function DoctorProfileSettings() {
  const [profile, setProfile] = useState({
    name: 'Dr. Marcus Thorne',
    title: 'Senior Cardiologist & Surgeon',
    specialty: 'Cardiology',
    biography: 'Dr. Marcus Thorne is a board-certified cardiologist with over 15 years of experience in cardiovascular medicine. He specializes in interventional cardiology and advanced heart failure management.',
    languages: 'English, German',
    fee: 150,
    experience: 15,
    education: 'Johns Hopkins School of Medicine (MD • 2005)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8MQDeqe_BK1YI3jx3r0mo_Jqg5y0a8G9t_PcOnI7gT6Y98asePjLA7B7NNjXX9ZZwmBJIeHCz6ejyEGDOgkTAx1KsVoIV5M33Ey69DHp6IOgNcZPg9pNwHucW2FZRZOtOJgn9OMjGFmcTOkq3OpQGMhHscbP6ycqS0hEs04YWStFw_5llPTXb6xdSjNgOrYzvzfpHjH2drkoxZi4WMR6OCxi1sqhyWsuVX_WghE0AYEnkkpCoYNXI2cAPUyCDjkzVVv99f75OnAU'
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  const handleAvatarChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setProfile(prev => ({ ...prev, avatar: event.target.result }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <DoctorLayout>
      {/* React 19 Document Metadata */}
      <title>Doctor Profile Settings | Neo-Health</title>
      <meta name="description" content="Edit credentials, biography details, photo link, and fees for your public patient profile." />

      <div className="container-fluid p-0">
        {/* Page Header */}
        <PageHeader
          title="Profile Management"
          subtitle="Configure biography information, specialties, fees, and photo credentials."
          breadcrumbs={[
            { label: 'Dashboard', path: '/doctor/dashboard' },
            { label: 'Profile Settings', path: '/doctor/profile' }
          ]}
        />

        {success && (
          <div className="alert alert-success border-success border-opacity-20 d-flex align-items-center gap-2 p-3 mb-4 rounded-3" role="alert">
            <i className="bi bi-check-circle-fill fs-5"></i>
            <span className="small">Your public profile details have been updated successfully!</span>
          </div>
        )}

        <div className="row g-4">
          {/* Left Column: Profile Form */}
          <div className="col-12 col-xl-8">
            <SectionCard title="Edit Public Profile">
              <form onSubmit={handleSubmit} id="profile-management-form">
                
                {/* Photo uploader */}
                <div className="d-flex align-items-center gap-4 mb-4">
                  <img
                    alt={profile.name}
                    className="rounded-4 border object-fit-cover shadow-sm"
                    style={{ width: '100px', height: '100px' }}
                    src={profile.avatar}
                  />
                  <div>
                    <button
                      type="button"
                      onClick={handleAvatarChange}
                      className="btn btn-secondary-neo py-2 px-3 small border"
                    >
                      Change Profile Photo
                    </button>
                    <small className="text-secondary d-block mt-2">Accepted formats: JPG, PNG. Max size 2MB.</small>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="prof-name" className="form-label small fw-semibold text-secondary">Full Name</label>
                    <input
                      type="text"
                      className="form-control form-control-neo"
                      id="prof-name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="prof-title" className="form-label small fw-semibold text-secondary">Professional Title</label>
                    <input
                      type="text"
                      className="form-control form-control-neo"
                      id="prof-title"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="prof-specialty" className="form-label small fw-semibold text-secondary">Specialty</label>
                    <select
                      className="form-select form-control-neo py-2.5"
                      id="prof-specialty"
                      value={profile.specialty}
                      onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                    >
                      <option>Cardiology</option>
                      <option>Pediatrics</option>
                      <option>Neurology</option>
                      <option>Dermatology</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="prof-fee" className="form-label small fw-semibold text-secondary">Consultation Fee ($)</label>
                    <input
                      type="number"
                      className="form-control form-control-neo"
                      id="prof-fee"
                      value={profile.fee}
                      onChange={(e) => setProfile({ ...profile, fee: Number(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="prof-languages" className="form-label small fw-semibold text-secondary">Spoken Languages</label>
                    <input
                      type="text"
                      className="form-control form-control-neo"
                      id="prof-languages"
                      value={profile.languages}
                      onChange={(e) => setProfile({ ...profile, languages: e.target.value })}
                      placeholder="e.g. English, Spanish"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="prof-exp" className="form-label small fw-semibold text-secondary">Years of Experience</label>
                    <input
                      type="number"
                      className="form-control form-control-neo"
                      id="prof-exp"
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: Number(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="prof-edu" className="form-label small fw-semibold text-secondary">Education History</label>
                    <input
                      type="text"
                      className="form-control form-control-neo"
                      id="prof-edu"
                      value={profile.education}
                      onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="prof-bio" className="form-label small fw-semibold text-secondary">Professional Biography</label>
                    <textarea
                      className="form-control form-control-neo"
                      id="prof-bio"
                      rows="4"
                      value={profile.biography}
                      onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="d-flex justify-content-between gap-3 mt-4 pt-3 border-top">
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(!previewOpen)}
                    className="btn btn-secondary-neo py-2.5 px-4"
                  >
                    {previewOpen ? 'Hide Preview' : 'Preview Profile'}
                  </button>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      className="btn btn-light border py-2.5 px-4"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="btn btn-primary-neo py-2.5 px-4"
                      id="profile-save-btn"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>

              </form>
            </SectionCard>
          </div>

          {/* Right Column: Live Mock Preview (Bento layout matching DoctorProfile.jsx) */}
          <div className="col-12 col-xl-4">
            {previewOpen ? (
              <div className="d-flex flex-column gap-4">
                <div className="neo-glass-card p-4 text-center">
                  <img
                    alt={profile.name}
                    className="rounded-4 border shadow-sm mb-3 mx-auto"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    src={profile.avatar}
                  />
                  <h4 className="fw-bold text-dark mb-1 fs-5">{profile.name}</h4>
                  <p className="text-primary fw-medium small mb-3">{profile.title}</p>
                  
                  <div className="d-flex flex-column gap-2 text-start small border-top pt-3 text-secondary">
                    <div className="d-flex justify-content-between">
                      <span>Specialty</span>
                      <strong className="text-dark">{profile.specialty}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Experience</span>
                      <strong className="text-dark">{profile.experience}+ Years</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Fee</span>
                      <strong className="text-primary">${profile.fee.toFixed(2)}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Languages</span>
                      <strong className="text-dark">{profile.languages}</strong>
                    </div>
                  </div>
                </div>

                <div className="neo-glass-card p-4">
                  <h5 className="fw-bold text-dark mb-3 fs-6">Biography</h5>
                  <p className="text-secondary small mb-0 font-italic">
                    {profile.biography}
                  </p>
                </div>
              </div>
            ) : (
              <div className="neo-glass-card p-4 border bg-white shadow-sm h-100 d-flex flex-column justify-content-center text-center text-secondary border-dashed">
                <i className="bi bi-eye fs-1 text-secondary opacity-50 mb-3"></i>
                <h5 className="fw-bold text-dark mb-1 fs-6">Live Profile Preview</h5>
                <p className="small mb-0">
                  Click the "Preview Profile" button to inspect how your updated profile details render to patient users.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}
