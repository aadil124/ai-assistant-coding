import React, { useState } from 'react';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqData = [
    {
      id: "q1",
      category: "general",
      question: "What is Neo-Health and how does it work?",
      answer: "Neo-Health is a digital patient portal enabling consultations with doctors, instant access to medical prescriptions, and security log archives. After creating a profile, patients select specialties, consult doctors over live video, and retrieve medical reports directly in their accounts."
    },
    {
      id: "q2",
      category: "consultations",
      question: "How do I start a video consultation?",
      answer: "Log into your account, navigate to the consultations portal, and select 'New Consultation'. Choose a certified practitioner or select the next available doctor. The platform will guide you to a secure video lobby for your clinical review."
    },
    {
      id: "q3",
      category: "records",
      question: "Can I download my prescriptions and medical history?",
      answer: "Yes. Once your doctor signs off on the consultation summary, digital records (including doctor recommendations and pharmacy instructions) are archived in your 'Medical Records' dashboard. You can read, view, or download PDF versions at any time."
    },
    {
      id: "q4",
      category: "security",
      question: "Is my personal healthcare data secure?",
      answer: "Absolutely. Neo-Health complies strictly with HIPAA regulations. All audio-visual video streams are end-to-end encrypted, and medical databases use AES-256 bit encryption. Only verified medical professionals and yourself can read your profiles."
    },
    {
      id: "q5",
      category: "general",
      question: "How much does a standard consultation cost?",
      answer: "Consultation pricing varies based on doctor specialization and duration. Standard general practitioner consults start at $45, which can be covered by major digital insurance schemes. Out-of-pocket costs are clearly shown before you join the call lobby."
    },
    {
      id: "q6",
      category: "records",
      question: "How are my doctor reviews handled?",
      answer: "Following a consultation, you are invited to submit doctor reviews (Feature 1.7) detailing your ratings and experiences. Feedback is displayed on physician public listings to ensure transparency and help other patients select providers."
    }
  ];

  const filteredFaqs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="faq-container py-5">
      {/* React 19 Document Metadata */}
      <title>Frequently Asked Questions | Neo-Health Portal</title>
      <meta name="description" content="Find answers to common questions about virtual medicine, prescriptions access, account settings, and data safety at Neo-Health." />

      <div className="container">
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-5">
          <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-2 fw-semibold text-uppercase tracking-wider">Help Desk</span>
          <h1 className="fw-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-secondary lead" style={{ fontSize: '1.1rem' }}>
            Have a question about how our virtual clinic operates? Browse the categories below or use the search bar.
          </p>
        </div>

        {/* Search & Category Filter Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="neo-glass-card p-3 mb-4">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-0 pe-0 text-secondary">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-neo border-0 bg-transparent"
                  placeholder="Search questions or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="faq-search-input"
                />
              </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-2" id="faq-categories">
              <button
                className={`btn btn-sm px-3 py-2 rounded-pill ${activeCategory === 'all' ? 'btn-primary-neo' : 'btn-light border'}`}
                onClick={() => setActiveCategory('all')}
              >
                All FAQs
              </button>
              <button
                className={`btn btn-sm px-3 py-2 rounded-pill ${activeCategory === 'general' ? 'btn-primary-neo' : 'btn-light border'}`}
                onClick={() => setActiveCategory('general')}
              >
                General Info
              </button>
              <button
                className={`btn btn-sm px-3 py-2 rounded-pill ${activeCategory === 'consultations' ? 'btn-primary-neo' : 'btn-light border'}`}
                onClick={() => setActiveCategory('consultations')}
              >
                Consultations
              </button>
              <button
                className={`btn btn-sm px-3 py-2 rounded-pill ${activeCategory === 'records' ? 'btn-primary-neo' : 'btn-light border'}`}
                onClick={() => setActiveCategory('records')}
              >
                Medical Records
              </button>
              <button
                className={`btn btn-sm px-3 py-2 rounded-pill ${activeCategory === 'security' ? 'btn-primary-neo' : 'btn-light border'}`}
                onClick={() => setActiveCategory('security')}
              >
                Security & Safety
              </button>
            </div>
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            {filteredFaqs.length > 0 ? (
              <div className="accordion accordion-flush neo-glass-card overflow-hidden p-2" id="faqAccordion">
                {filteredFaqs.map((faq, index) => (
                  <div className="accordion-item border-bottom bg-transparent" key={faq.id} style={{ borderColor: 'var(--border-color)' }}>
                    <h2 className="accordion-header" id={`heading-${faq.id}`}>
                      <button
                        className="accordion-button collapsed bg-transparent fw-semibold text-dark py-4 focus-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${faq.id}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${faq.id}`}
                        id={`faq-btn-${faq.id}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse-${faq.id}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading-${faq.id}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body text-secondary small pb-4 pt-1 lh-base">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 neo-glass-card">
                <i className="bi bi-patch-question text-secondary fs-1 mb-3"></i>
                <h5 className="fw-semibold text-dark">No questions found</h5>
                <p className="text-secondary small mb-0">Try search queries with different keywords or switch FAQ categories.</p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action Support */}
        <div className="text-center mt-5 pt-3">
          <p className="text-secondary mb-3">Still have questions that aren't answered here?</p>
          <a href="/contact" className="btn btn-secondary-neo px-4 py-2 small" id="faq-contact-cta">Contact Our Help Desk</a>
        </div>
      </div>
    </div>
  );
}
