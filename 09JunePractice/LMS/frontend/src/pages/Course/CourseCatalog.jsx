import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import Sidebar from '../../components/common/Sidebar';

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
  const [enrolledCoursesData, setEnrolledCoursesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);

  // Auth values for checking login status
  let authVal = false;
  let user = null;
  try {
    const auth = useAuth();
    authVal = auth.isAuthenticated;
    user = auth.user;
  } catch (e) {
    authVal = isAuthenticated;
  }

  useEffect(() => {
    if (user && user.role === 'Instructor') {
      navigate('/instructor', { replace: true });
    }
  }, [user, navigate]);

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
            if (result.success && result.data && result.data.length > 0) {
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
    } else if (authVal) {
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
              setEnrolledCoursesData(result.data);
              const ids = result.data.map((item) => {
                const c = item.course;
                return c ? (c.id || c._id) : null;
              }).filter(Boolean);
              setEnrolledIds(ids);
            }
          }
        } catch (err) {
          console.error('Failed to fetch enrolled courses:', err);
        }
      };
      fetchEnrolled();
    }
  }, [enrolledCourseIds, authVal]);

  const handleEnroll = async (courseId) => {
    if (!authVal) {
      navigate('/login');
      return;
    }

    setEnrollingCourseId(courseId);
    try {
      if (progressCtx) {
        await progressCtx.enrollInCourse(courseId);
        setEnrolledIds((prev) => [...prev, courseId]);
        navigate(`/course/${courseId}/enrollment-success`);
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
          navigate(`/course/${courseId}/enrollment-success`);
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
        selectedDifficulties.includes(course.difficulty || 'Intermediate');

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [courses, searchQuery, selectedCategory, selectedDifficulties]);

  return (
    <div className="catalog-shell min-vh-100 d-flex text-start animate-fade-in" style={{ backgroundColor: 'var(--bg-neutral)', width: '100%' }}>
      <style>{`
        .catalog-shell {
          background-color: var(--bg-neutral);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          width: 100%;
        }
        .main-canvas-premium {
          flex: 1;
          margin-left: 260px; /* Offset for fixed sidebar */
          padding: 40px;
          min-height: 100vh;
        }
        .filter-section {
          background-color: var(--surface-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 20px;
        }
        .category-pill {
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
          background-color: var(--border-light);
          color: var(--text-secondary);
          border: 1px solid transparent;
        }
        .category-pill:hover {
          background-color: var(--border-color);
          color: var(--text-primary);
        }
        .category-pill.active {
          background-color: var(--primary-light);
          color: var(--primary);
          border-color: var(--primary);
        }
        .course-card-img {
          height: 180px;
          width: 100%;
          object-fit: cover;
          border-top-left-radius: var(--radius-lg);
          border-top-right-radius: var(--radius-lg);
          background-color: var(--border-light);
        }
      `}</style>

      <Sidebar />

      <main className="main-canvas-premium">
        <div className="container-fluid px-0">
          <div className="mb-4">
            <h1 className="h2 fw-bold mb-1">Course Catalog</h1>
            <p className="text-secondary small">Explore structured learning paths led by domain experts.</p>
          </div>

          <div className="row g-4">
            {/* Search and Filters Sidebar */}
            <aside className="col-12 col-md-3">
              <div className="filter-section d-flex flex-column gap-4">
                {/* Search */}
                <div className="form-group-premium mb-0">
                  <label htmlFor="catalogSearch" className="label-premium">Search Courses</label>
                  <div className="position-relative">
                    <span className="material-symbols-outlined position-absolute text-secondary" style={{ left: '10px', top: '10px', fontSize: '18px' }}>search</span>
                    <input
                      id="catalogSearch"
                      type="text"
                      className="input-premium"
                      style={{ paddingLeft: '36px' }}
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Difficulty Filters */}
                <div>
                  <span className="label-premium mb-2">Difficulty</span>
                  <div className="d-flex flex-column gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <div key={level} className="form-check d-flex align-items-center gap-2">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          id={`diff-${level}`}
                          checked={selectedDifficulties.includes(level)}
                          onChange={() => handleDifficultyToggle(level)}
                          style={{ cursor: 'pointer' }}
                        />
                        <label className="form-check-label text-secondary small select-none cursor-pointer" htmlFor={`diff-${level}`}>
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Catalog Grid */}
            <main className="col-12 col-md-9">
              {/* Category selector row */}
              <div className="d-flex flex-wrap gap-2 mb-4 align-items-center">
                <label htmlFor="categoryFilter" className="visually-hidden">Category</label>
                <select
                  id="categoryFilter"
                  aria-label="Category"
                  className="input-premium"
                  style={{ width: '200px', appearance: 'auto' }}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Category: All</option>
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Course list */}
              {filteredCourses.length === 0 ? (
                <div className="card-premium-static text-center py-5">
                  <span className="material-symbols-outlined text-secondary fs-1 mb-2">menu_book</span>
                  <h3 className="h5 fw-bold text-dark">No courses available</h3>
                  <p className="text-secondary small mb-0">Try adjusting your filters or search keywords.</p>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredCourses.map((course) => {
                    const cid = course.id || course._id;
                    const isEnrolled = enrolledIds.includes(cid);
                    const enrolledItem = enrolledCoursesData.find((item) => {
                      const itemId = item.course?.id || item.course?._id;
                      return itemId === cid;
                    });
                    const isCompleted = enrolledItem && enrolledItem.progressPercent === 100;
                    const isExamPassed = enrolledItem && enrolledItem.finalExamPassed === true;

                    return (
                      <div key={cid} className="col-12 col-sm-6">
                        <div className="card-premium h-100 p-0 d-flex flex-column justify-content-between">
                          <div>
                            {course.image && (
                              <img
                                className="course-card-img"
                                alt={course.title}
                                src={course.image}
                              />
                            )}
                            <div className="p-4">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="badge-premium badge-premium-primary">
                                  {course.category || 'General'}
                                </span>
                                <span className="text-muted-custom" style={{ fontSize: '12px' }}>
                                  {course.difficulty || 'Intermediate'}
                                </span>
                              </div>
                              <h3 className="h5 fw-bold mb-2 text-dark">{course.title}</h3>
                              <p className="text-secondary small mb-0 line-clamp-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '40px' }}>
                                {course.description}
                              </p>
                              {course.instructor && (
                                <p className="text-muted-custom small mt-2 mb-0">
                                  Instructor: <strong>{course.instructor}</strong>
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="px-4 pb-4 pt-0 d-flex align-items-center justify-content-between">
                            <span className="fw-bold fs-5 text-dark">
                              {course.price ? `$${course.price}` : 'Free'}
                            </span>

                            <div className="d-flex gap-2">
                              <Link to={`/course/${cid}/details`} className="btn-premium-secondary py-1.5 px-3" style={{ fontSize: '0.85rem' }}>
                                Details
                              </Link>

                              {isEnrolled ? (
                                <div data-testid={`resume-btn-${cid}`}>
                                  {isExamPassed ? (
                                    <Link
                                      to={`/course/${cid}/certificate`}
                                      className="btn-premium-success py-1.5 px-3 text-decoration-none"
                                      style={{ fontSize: '0.85rem' }}
                                      data-testid={`resume-link-${cid}`}
                                    >
                                      Completed ✓
                                    </Link>
                                  ) : isCompleted ? (
                                    <Link
                                      to={`/course/${cid}/exam/ready`}
                                      className="btn-premium-primary py-1.5 px-3 text-decoration-none"
                                      style={{ fontSize: '0.85rem' }}
                                      data-testid={`resume-link-${cid}`}
                                    >
                                      Take Final Exam
                                    </Link>
                                  ) : (
                                    <Link
                                      to={`/course/${cid}`}
                                      className="btn-premium-primary py-1.5 px-3 text-decoration-none"
                                      style={{ fontSize: '0.85rem' }}
                                      data-testid={`resume-link-${cid}`}
                                    >
                                      Resume
                                    </Link>
                                  )}
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleEnroll(cid)}
                                  disabled={enrollingCourseId === cid}
                                  className="btn-premium-primary py-1.5 px-3"
                                  style={{ fontSize: '0.85rem' }}
                                  data-testid={`enroll-btn-${cid}`}
                                >
                                  {enrollingCourseId === cid ? 'Enrolling...' : 'Enroll'}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-top bg-white d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary mt-auto py-4 px-4">
          <p className="mb-0">&copy; 2026 EduFlow Learning System. All rights reserved.</p>
          <div className="d-flex gap-3">
            <a className="text-secondary text-decoration-none hover-text-primary" href="#">Terms</a>
            <a className="text-secondary text-decoration-none hover-text-primary" href="#">Privacy</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
