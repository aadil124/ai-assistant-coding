import React, { useState } from 'react';
import DoctorLayout from '../../components/layout/DoctorLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import SectionCard from '../../components/shared/SectionCard.jsx';
import StatusBadge from '../../components/shared/StatusBadge.jsx';

export default function DoctorAvailability() {
  const [activeTab, setActiveTab] = useState('Wednesday, Oct 24');
  const [availabilityToggle, setAvailabilityToggle] = useState(true);

  // Initial list of available slots
  const [slots, setSlots] = useState([
    { id: 's1', date: 'Wednesday, Oct 24', time: '09:00 AM - 09:30 AM', status: 'Available' },
    { id: 's2', date: 'Wednesday, Oct 24', time: '09:45 AM - 10:15 AM', status: 'Locked' },
    { id: 's3', date: 'Wednesday, Oct 24', time: '10:30 AM - 11:00 AM', status: 'Booked' },
    { id: 's4', date: 'Thursday, Oct 25', time: '09:00 AM - 09:30 AM', status: 'Available' },
    { id: 's5', date: 'Thursday, Oct 25', time: '11:15 AM - 11:45 AM', status: 'Available' },
    { id: 's6', date: 'Thursday, Oct 25', time: '02:00 PM - 02:30 PM', status: 'Booked' }
  ]);

  const [newTime, setNewTime] = useState('09:00 AM');
  const [newDuration, setNewDuration] = useState('30 mins');

  const handleDeleteSlot = (id) => {
    const slot = slots.find(s => s.id === id);
    if (!slot) return;

    if (slot.status === 'Booked') {
      alert("AC 2.2 Violation Warning: The system prevents doctors from deleting time slots that have already been booked and paid for by patients.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this availability slot?")) {
      setSlots(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!availabilityToggle) {
      alert("Please enable the overall availability toggle to add new slots.");
      return;
    }

    const calculatedTimeRange = `${newTime} - ${calculateEndTime(newTime, newDuration)}`;
    
    // Check if slot already exists for the day
    const duplicate = slots.some(s => s.date === activeTab && s.time === calculatedTimeRange);
    if (duplicate) {
      alert("This time slot already exists in your schedule for this day.");
      return;
    }

    const newSlot = {
      id: `s-${Date.now()}`,
      date: activeTab,
      time: calculatedTimeRange,
      status: 'Available'
    };

    setSlots(prev => [...prev, newSlot]);
  };

  const calculateEndTime = (startTime, duration) => {
    const [time, modifier] = startTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    const durVal = duration.includes('30') ? 30 : 45;

    minutes += durVal;
    if (minutes >= 60) {
      hours += 1;
      minutes -= 60;
    }

    let endModifier = modifier;
    if (hours >= 12) {
      if (hours > 12) hours -= 12;
      if (modifier === 'AM') endModifier = 'PM';
      else if (modifier === 'PM' && hours !== 12) endModifier = 'AM';
    }

    const padMins = minutes.toString().padStart(2, '0');
    const padHours = hours.toString().padStart(2, '0');
    return `${padHours}:${padMins} ${endModifier}`;
  };

  const currentSlots = slots.filter(s => s.date === activeTab);

  return (
    <DoctorLayout>
      {/* React 19 Document Metadata */}
      <title>Schedule Availability | Neo-Health Doctors</title>
      <meta name="description" content="Manage weekly available slots, select consulting blocks, and enable/disable telehealth bookings." />

      <div className="container-fluid p-0">
        {/* Page Header */}
        <PageHeader
          title="Availability Management"
          subtitle="Configure weekly consultation slots and toggle patient booking options."
          breadcrumbs={[
            { label: 'Dashboard', path: '/doctor/dashboard' },
            { label: 'Schedule Settings', path: '/doctor/availability' }
          ]}
        />

        <div className="row g-4">
          {/* Left Column: Weekly Calendar & Active Slots */}
          <div className="col-12 col-xl-8">
            <div className="d-flex flex-column gap-4">
              
              {/* Day selection tabs */}
              <div className="neo-glass-card p-4 border bg-white shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold text-dark mb-0 fs-6">Select Active Workday</h5>
                  <div className="form-check form-switch ps-0 d-flex align-items-center gap-2">
                    <label className="form-check-label fw-semibold small text-secondary" htmlFor="avail-toggle">
                      {availabilityToggle ? 'Consultations Active' : 'Off-Duty'}
                    </label>
                    <input
                      className="form-check-input ms-0 border cursor-pointer"
                      type="checkbox"
                      role="switch"
                      id="avail-toggle"
                      checked={availabilityToggle}
                      onChange={(e) => setAvailabilityToggle(e.target.checked)}
                      style={{ width: '40px', height: '20px' }}
                    />
                  </div>
                </div>

                <ul className="nav nav-pills gap-2 mb-2">
                  {['Wednesday, Oct 24', 'Thursday, Oct 25', 'Friday, Oct 26'].map((day) => (
                    <li className="nav-item" key={day}>
                      <button
                        type="button"
                        onClick={() => setActiveTab(day)}
                        className={`btn py-2 px-3 rounded-pill small ${
                          activeTab === day ? 'btn-primary-neo' : 'btn-light border text-secondary'
                        }`}
                      >
                        {day}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Slots List grid */}
              <SectionCard title={`${activeTab} - Time Blocks Grid`}>
                {!availabilityToggle ? (
                  <div className="text-center py-5 text-secondary">
                    <i className="bi bi-calendar-x fs-1 opacity-50 mb-3 d-block"></i>
                    <p className="fw-semibold">Availability is toggled Off-Duty</p>
                    <small>Enable the consultations switch above to configure or view scheduled time slots.</small>
                  </div>
                ) : currentSlots.length === 0 ? (
                  <div className="text-center py-5 text-secondary">
                    <i className="bi bi-clock-history fs-1 opacity-50 mb-3 d-block"></i>
                    <p className="fw-semibold">No availability slots scheduled for this day</p>
                    <small>Use the tool on the right to add session blocks to your patient grid.</small>
                  </div>
                ) : (
                  <div className="row g-3">
                    {currentSlots.map((slot) => (
                      <div className="col-12 col-md-6" key={slot.id}>
                        <div className="p-3 border rounded-3 bg-light bg-opacity-25 d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center gap-3">
                            <i className="bi bi-clock text-primary fs-5"></i>
                            <div>
                              <strong className="text-dark small d-block mb-1">{slot.time}</strong>
                              <StatusBadge status={slot.status} />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteSlot(slot.id)}
                            className="btn btn-sm btn-outline-danger p-2 rounded-circle border-0"
                            title={slot.status === 'Booked' ? 'Cannot delete booked slots' : 'Delete slot'}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>

            </div>
          </div>

          {/* Right Column: Add New Slot form */}
          <div className="col-12 col-xl-4">
            <SectionCard title="Add Availability Slot">
              <form onSubmit={handleAddSlot} id="add-availability-form">
                <div className="mb-3">
                  <label htmlFor="slot-start" className="form-label small fw-semibold text-secondary">Start Time</label>
                  <select
                    className="form-select form-control-neo py-2"
                    id="slot-start"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                  >
                    <option>09:00 AM</option>
                    <option>09:45 AM</option>
                    <option>10:30 AM</option>
                    <option>11:15 AM</option>
                    <option>02:00 PM</option>
                    <option>02:45 PM</option>
                    <option>03:30 PM</option>
                    <option>04:15 PM</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="slot-dur" className="form-label small fw-semibold text-secondary">Duration Block</label>
                  <select
                    className="form-select form-control-neo py-2"
                    id="slot-dur"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                  >
                    <option>30 mins</option>
                    <option>45 mins</option>
                  </select>
                </div>

                <div className="p-3 bg-primary bg-opacity-10 text-primary border border-primary border-opacity-15 rounded-3 mb-4 small">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  New slots default to <strong>Available</strong> status for patient searches.
                </div>

                <button
                  type="submit"
                  disabled={!availabilityToggle}
                  className="btn btn-primary-neo w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                  id="avail-submit-btn"
                >
                  <i className="bi bi-plus-circle"></i>
                  <span>Add Slot to Day</span>
                </button>
              </form>
            </SectionCard>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}
