import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DEFAULT_COURSES = [
  {
    id: 'c1',
    title: 'Mastering UI/UX Design Fundamentals',
    category: 'Design',
    description: 'Mastering UI/UX Design principles and modern interface workflows.',
    difficulty: 'Intermediate',
    rating: 4.9,
    price: 89.99,
    instructor: 'Sarah Jenkins',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0J7vPA0JlcQ0Y5BdiBoXbeURb17OheHNJhUi9XZJbiCZTnrYa_h7E0wutOO2__IEJXnDe3VKtUqyjqqkqHQN2BoaFjSCpC-E9ZxtUlh4aB0OLYEFM64t93pLh0Hq57O7ZiM_X8v8bFlfFX8UIBMbAKODdH_4hw21oXS5ocPwApsEJIYYp-qf4yDbwRVDmdRMaEFo6Bq7LI2LT-J2ek28d5BcWGzIvpHWqDhtHYlst250zSojtCQ0Ti2siQIMKsIFqeZw-BqzYfYA'
  },
  {
    id: 'c2',
    title: 'Full-Stack Web Development Boot Camp',
    category: 'Dev',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js, and deploy full applications.',
    difficulty: 'Beginner',
    rating: 4.8,
    price: 149.99,
    instructor: 'Alex Rivera',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1CAsIxJQ8ci5_fYQsLUQ2Umemm5v5liZ2deJEt1X92Xr6kO9CxoEIzdKS92GKkPuCPzKJBO1bsqIC6XUTr67xeYO2Sxh7kXdf3DtwF_1ocLENJtT7AX49T70UrZzgM1_plFnqmf6EjzJdXc2WsDKP0Lu8U_WGe11kO--1aSb__h7os7gVKLoqpL0SZ6OXO9r20FJaTK1gAG9A029YjEtN58OGbtQtnzbLWBu9TmpPftJHDNNDyjrEqlEV27fJMYIdph1Qtef1IwM'
  },
  {
    id: 'c3',
    title: 'Strategic Business Growth & Scaling',
    category: 'Business',
    description: 'Understand market analysis, scaling metrics, leadership frameworks, and financial growth.',
    difficulty: 'Advanced',
    rating: 4.7,
    price: 129.00,
    instructor: 'Marcus Thorne',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN9jJ7Kn6YBPhGbDEJDGluBSu9zmGpazmDjA96HhMn2_WW5MpHMvBMLKF5a4fUDDoB-S0lRMMtbOiwC9Y0sp7Tg8ynrc-tR7NJks7PT0mkvuZTsE60CrDkg7uKDaVxMtzPD8OYPaBrmhi7boaav-KWkG8mn9m8Iu9Mq3vjGcC-Wc9g0knWxE5C4HhcufXhDr7mGVLwJCHNBjkLAx8SZrVzLa6aa3WV9f4S8kYBkbz3pksmLxNpCucy5iRh6bVzKSlpvec2hESLgLE'
  },
  {
    id: 'c4',
    title: 'Python for Advanced Data Analytics',
    category: 'Dev',
    description: 'Deep dive into pandas, numpy, scikit-learn, network analysis, and regression modeling.',
    difficulty: 'Advanced',
    rating: 5.0,
    price: 74.99,
    instructor: 'Dr. Emily Zhang',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRe0hhbrlg0IEPqCD-MEB5_Mu0Nc_KWWj2mLt4dJbcKlpEri8-NvUlftDofQ22boHHYTxSYTa6SZWUntPeqyJJ8-FrdUE3jqYBPp7JjLUoJL4T4guVi1pzcele1-wFVyzYBMiYftGbjit5nHEiE_P48SiLpcXqbPVZHhyl_quruJx-ozwHEIUX_7davdk6M5TeEvEGlmsA-4FTqeAX_qORitkMCrgOUWjztNML0aRlMZtKoKljlCfC8M3oWQWOPi1Laf9dydPPL4o'
  }
];

export default function CourseCatalog({
  initialCourses = null,
  enrolledCourseIds = null,
  isAuthenticated = false,
}) {
  const navigate = useNavigate();
  const baseCourses = useMemo(() => initialCourses || DEFAULT_COURSES, [initialCourses]);

  const [courses, setCourses] = useState(baseCourses);
  const [enrolledIds, setEnrolledIds] = useState(enrolledCourseIds || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);

  let progressCtx = null;
  try {
    progressCtx = useProgress();
  } catch (e) {
    // Context missing in tests
  }

  useEffect(() => {
    if (initialCourses) {
      setCourses(initialCourses);
    } else {
      const fetchCatalog = async () => {
        try {
          const response = await fetch('/courses', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            },
          });
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              setCourses(result.data);
            }
          }
        } catch (err) {
          console.error('Failed to fetch courses:', err);
        }
      };
      fetchCatalog();
    }
  }, [initialCourses]);

  useEffect(() => {
    if (enrolledCourseIds !== null) {
      setEnrolledIds(enrolledCourseIds);
    } else if (isAuthenticated) {
      const fetchEnrolled = async () => {
        try {
          const response = await fetch('/courses/enrolled', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            },
          });
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              const ids = result.data.map((item) => item.course.id || item.course._id);
              setEnrolledIds(ids);
            }
          }
        } catch (err) {
          console.error('Failed to fetch enrolled courses:', err);
        }
      };
      fetchEnrolled();
    }
  }, [enrolledCourseIds, isAuthenticated]);

  const handleEnroll = async (courseId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setEnrollingCourseId(courseId);
    try {
      if (progressCtx) {
        await progressCtx.enrollInCourse(courseId);
        setEnrolledIds((prev) => [...prev, courseId]);
      } else {
        const response = await fetch(`/courses/${courseId}/enroll`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
          },
        });

        if (!response.ok) {
          throw new Error('Enrollment request failed');
        }

        const result = await response.json();
        if (result.success) {
          setEnrolledIds((prev) => [...prev, courseId]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const categoriesList = useMemo(() => {
    return Array.from(new Set(courses.map((c) => c.category).filter(Boolean)));
  }, [courses]);

  const handleDifficultyToggle = (level) => {
    setSelectedDifficulties((prev) =>
      prev.includes(level) ? prev.filter((d) => d !== level) : [...prev, level]
    );
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        !searchQuery ||
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        course.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesDifficulty =
        selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(course.difficulty);

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [courses, searchQuery, selectedCategory, selectedDifficulties]);

  return (
    <div className="catalog-shell min-vh-100 d-flex flex-column justify-content-between">
      <style>{`
        .catalog-shell {
          background-color: #f8f9ff;
          color: #0b1c30;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .top-nav {
          height: 64px;
          border-bottom: 1px solid var(--outline-variant);
          background-color: #ffffff;
          z-index: 50;
        }
        .aside-filter {
          width: 260px;
          border-right: 1px solid var(--outline-variant);
          background-color: #f8f9ff;
        }
        .course-grid-card {
          background-color: #ffffff;
          border: 1px solid var(--outline-variant);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .course-grid-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .glass-filter-bar {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid var(--outline-variant);
          border-radius: 12px;
          padding: 16px;
        }
      `}</style>

      {/* Top Nav Bar */}
      <header className="top-nav sticky-top d-flex align-items-center justify-content-between px-4">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none fw-extrabold text-primary font-display fs-4" style={{ letterSpacing: '-0.02em' }}>Lumina LMS</Link>
          <nav className="d-none md:flex gap-3 ms-4">
            <Link to="/courses" className="text-primary text-decoration-none border-bottom border-primary pb-1 font-label-md">Catalog</Link>
            <Link to="/dashboard" className="text-secondary text-decoration-none hover-text-primary font-label-md">My Learning</Link>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-link text-secondary p-1">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="rounded-circle border overflow-hidden" style={{ width: '32px', height: '32px' }}>
            <img
              alt="User avatar"
              className="w-100 h-100 object-fit-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkFwQVqaaHSB7aV-Cs-W1eKtBYV5JuuOMJfpN61nAFYwPY8P9RQM3IGAX7uHk3tENmf-dwLHNUClpAh05fr6Lp939zmIxG94y3MEHSWkcMTZ9CBqn3VM8mBrmgnf9LLkTQOaUUuu3pLMAZX6gYNdZIi095PEPiJp8ZL1t9YX3WBHNBvwn94e-iGtHZU9R2i3p1SKWZpKRrjVYW85jkPSWrwBEsofAn_sfo3vO2LIpTjAZxyFZsIOZUwZwMPOnt3WwS7BbpioI3Inq2"
            />
          </div>
        </div>
      </header>

      {/* Catalog Split Layout */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar Filter for Desktop */}
        <aside className="aside-filter d-none d-lg-flex flex-column p-4 gap-4">
          <div>
            <h5 className="small fw-bold uppercase tracking-wider text-secondary mb-3" style={{ fontSize: '11px' }}>Difficulty</h5>
            <div className="d-flex flex-column gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <div className="form-check" key={level}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`diff-${level}`}
                    checked={selectedDifficulties.includes(level)}
                    onChange={() => handleDifficultyToggle(level)}
                  />
                  <label className="form-check-label small cursor-pointer" htmlFor={`diff-${level}`}>
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow-1 p-4">
          <div className="mb-4">
            <h1 className="h3 fw-bold text-dark mb-1">Browse Catalog</h1>
            <p className="text-secondary small">Explore world-class courses designed for modern professionals.</p>
          </div>

          {/* Search and Filters Bar */}
          <div className="glass-filter-bar d-flex flex-column flex-md-row gap-3 align-items-center mb-4">
            <div className="position-relative flex-grow-1 w-100">
              <span className="material-symbols-outlined position-absolute text-secondary" style={{ left: '12px', top: '12px' }}>search</span>
              <input
                id="searchInput"
                className="form-control rounded-lg"
                style={{ paddingLeft: '38px', height: '44px', border: '1px solid var(--outline-variant)' }}
                placeholder="Search courses..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2 w-100 w-md-auto">
              <label htmlFor="categoryFilter" className="visually-hidden">Category</label>
              <select
                id="categoryFilter"
                aria-label="Category"
                className="form-select"
                style={{ height: '44px', minWidth: '150px', border: '1px solid var(--outline-variant)' }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Category: All</option>
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-5">
              <h3 className="h5 text-secondary">No courses available</h3>
              <p className="text-secondary small">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredCourses.map((course) => {
                const isEnrolled = enrolledIds.includes(course.id);
                const isEnrolling = enrollingCourseId === course.id;

                return (
                  <div className="col-12 col-md-6 col-xl-4 col-xxl-3" key={course.id}>
                    <div className="course-grid-card h-100 d-flex flex-column justify-content-between p-3">
                      <div>
                        <div className="rounded-3 overflow-hidden mb-3" style={{ aspectRatio: '16/9' }}>
                          <img
                            className="w-100 h-100 object-fit-cover"
                            alt={course.title}
                            src={course.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWmvibq0OOmdFIav3rALxyrGkCcu0RPTSNA_KRX_hZP0dEbzSZVDHXvhcghhJarI9kcoF_0te5AgPfZWgAsFWkaQq_lDI7FTAZtAfPv6NPFhDeN-evQqea440s4gFwE5HUxABJ6y5XS4Yi82105qjJoGagQNg9pHE2_KI7wRtADa4E4OQaRbc559A8FY6fR1wOza4aOTxuQCdVobf-N64WTfUQe9XmLo-4Zu4t1pPvDoqZR-5OqVxyGhJJNEG14rEcXpI8T0ykXD0K'}
                          />
                        </div>
                        <div className="d-flex gap-2 align-items-center mb-2">
                          <span className="badge bg-light text-secondary rounded-pill border px-2 py-1" style={{ fontSize: '10px' }}>
                            {course.category}
                          </span>
                          <span className="text-secondary small" style={{ fontSize: '11px' }}>• {course.instructor}</span>
                        </div>
                        <h4 className="h6 fw-bold text-dark mb-2 line-clamp-2" style={{ minHeight: '38px' }}>{course.title}</h4>
                        <p className="text-secondary small mb-3 line-clamp-3" style={{ minHeight: '54px' }}>{course.description}</p>
                      </div>

                      <div className="border-t pt-3 mt-2 d-flex align-items-center justify-content-between">
                        <span className="fw-bold text-primary">${course.price}</span>
                        {isEnrolled ? (
                          <div data-testid={`resume-btn-${course.id}`}>
                            <Link
                              to={`/course/${course.id}`}
                              className="btn btn-nexus-secondary py-1.5 px-3 rounded-lg text-decoration-none small"
                              data-testid={`resume-link-${course.id}`}
                            >
                              Resume
                            </Link>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-nexus-primary py-1.5 px-3 rounded-lg small"
                            data-testid={`enroll-btn-${course.id}`}
                            disabled={isEnrolling}
                            onClick={() => handleEnroll(course.id)}
                          >
                            {isEnrolling ? 'Enrolling...' : 'Enroll'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-4 px-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
        <p className="mb-0">© 2024 Lumina Enterprise LMS. All rights reserved.</p>
        <div className="d-flex gap-3">
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Privacy Policy</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Terms of Service</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Contact</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">System Status</a>
        </div>
      </footer>
    </div>
  );
}
