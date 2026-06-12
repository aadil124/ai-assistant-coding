const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Topic = require('./models/Topic');
const Resource = require('./models/Resource');
const Quiz = require('./models/Quiz');
const FinalExam = require('./models/FinalExam');
const Progress = require('./models/Progress');
const Certificate = require('./models/Certificate');

const seedCourseData = async (courseTitle, courseDescription, category, modulesData, finalExamQuestions, instructorId) => {
  // Check if course exists
  let course = await Course.findOne({ title: courseTitle });
  if (course) {
    const moduleCount = await Module.countDocuments({ courseId: course._id });
    if (moduleCount > 0) {
      console.log(`[AUTO-SEED] Course "${courseTitle}" already exists and is fully populated.`);
      // Ensure final exam is seeded if missing
      const examExists = await FinalExam.findOne({ courseId: course._id });
      if (!examExists) {
        await new FinalExam({
          courseId: course._id,
          passingThreshold: 75,
          questions: finalExamQuestions
        }).save();
        console.log(`[AUTO-SEED] Seeded missing final exam for "${courseTitle}".`);
      }
      return course;
    }
    console.log(`[AUTO-SEED] Course "${courseTitle}" exists but is empty. Seeding modules and contents...`);
  } else {
    console.log(`[AUTO-SEED] Creating "${courseTitle}" course...`);
    course = new Course({
      title: courseTitle,
      description: courseDescription,
      category,
      instructorId
    });
    await course.save();
  }

  // Clean old course content just in case
  const oldModules = await Module.find({ courseId: course._id });
  const oldModuleIds = oldModules.map(m => m._id);
  const oldTopics = await Topic.find({ moduleId: { $in: oldModuleIds } });
  const oldTopicIds = oldTopics.map(t => t._id);
  await Module.deleteMany({ courseId: course._id });
  await Topic.deleteMany({ moduleId: { $in: oldModuleIds } });
  await Resource.deleteMany({ topicId: { $in: oldTopicIds } });
  await Quiz.deleteMany({ topicId: { $in: oldTopicIds } });
  await FinalExam.deleteMany({ courseId: course._id });

  // Add Modules, Topics, Resources and Quizzes
  for (let mIdx = 0; mIdx < modulesData.length; mIdx++) {
    const modData = modulesData[mIdx];
    const mod = new Module({
      courseId: course._id,
      title: modData.title,
      sequenceIndex: mIdx
    });
    await mod.save();

    for (let tIdx = 0; tIdx < modData.topics.length; tIdx++) {
      const topicData = modData.topics[tIdx];
      const topic = new Topic({
        moduleId: mod._id,
        title: topicData.title,
        sequenceIndex: tIdx
      });
      await topic.save();

      // Resources
      for (const res of topicData.resources) {
        await new Resource({
          topicId: topic._id,
          type: res.type,
          url: res.url || undefined,
          content: res.content || undefined
        }).save();
      }

      // Quiz
      if (topicData.quiz) {
        await new Quiz({
          topicId: topic._id,
          passingThreshold: topicData.quiz.passingThreshold || 70,
          questions: topicData.quiz.questions
        }).save();
      }
    }
  }

  // Create Final Exam
  await new FinalExam({
    courseId: course._id,
    passingThreshold: 75,
    questions: finalExamQuestions
  }).save();

  console.log(`[AUTO-SEED] Course "${courseTitle}" successfully seeded!`);
  return course;
};

const seedData = async () => {
  try {
    console.log('[AUTO-SEED] Checking if courses need to be seeded...');
    
    // Find or create an instructor
    let instructor = await User.findOne({ email: 'bob@example.com' });
    if (!instructor) {
      console.log('[AUTO-SEED] Creating default instructor Bob...');
      instructor = new User({
        name: 'Instructor Bob',
        email: 'bob@example.com',
        password: 'password123',
        role: 'Instructor'
      });
      await instructor.save();
    } else {
      console.log('[AUTO-SEED] Instructor Bob exists. Resetting password...');
      instructor.password = 'password123';
      await instructor.save();
    }

    const instructorId = instructor._id;

    // ==========================================
    // 1. NODE.JS COURSE DATA
    // ==========================================
    const nodeModules = [
      {
        title: 'Node.js Basics and Architecture',
        topics: [
          {
            title: 'Node.js Architecture & Event Loop',
            resources: [
              {
                type: 'Notes',
                content: `# Node.js Architecture & Event Loop\n\nNode.js is a runtime environment built on Chrome's V8 engine. It uses an **event-driven, non-blocking I/O model**.\n\n## The Event Loop\nThe event loop allows Node.js to perform non-blocking operations by offloading tasks to the system kernel whenever possible.`
              },
              {
                type: 'Video',
                url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4'
              }
            ],
            quiz: {
              passingThreshold: 70,
              questions: [
                {
                  questionText: 'Which JavaScript engine does Node.js use under the hood?',
                  options: ['V8', 'SpiderMonkey', 'Chakra', 'JavaScriptCore'],
                  correctOptionIndex: 0
                },
                {
                  questionText: 'Is Node.js single-threaded or multi-threaded for executing user code?',
                  options: ['Single-threaded', 'Multi-threaded'],
                  correctOptionIndex: 0
                }
              ]
            }
          },
          {
            title: 'Package Management with NPM',
            resources: [
              {
                type: 'Notes',
                content: `# Package Management with NPM\n\nNPM is the default package manager for Node.js. It manages all dependencies in your project using a \`package.json\` file.`
              }
            ],
            quiz: {
              passingThreshold: 70,
              questions: [
                {
                  questionText: 'Which command initiates a new Node.js project and generates package.json?',
                  options: ['npm install', 'npm init', 'npm start', 'npm create'],
                  correctOptionIndex: 1
                }
              ]
            }
          }
        ]
      },
      {
        title: 'Building Web Servers',
        topics: [
          {
            title: 'The Built-in HTTP Module',
            resources: [
              {
                type: 'Notes',
                content: `# The Built-in HTTP Module\n\nNode.js features a built-in module called \`http\`, which allows transferring data over HTTP.\n\n\`\`\`javascript\nconst http = require('http');\nconst server = http.createServer((req, res) => {\n  res.end('Hello');\n});\nserver.listen(5000);\n\`\`\``
              }
            ],
            quiz: {
              passingThreshold: 70,
              questions: [
                {
                  questionText: 'Which built-in module in Node.js allows creating standard web servers?',
                  options: ['fs', 'path', 'http', 'net'],
                  correctOptionIndex: 2
                }
              ]
            }
          },
          {
            title: 'Express.js Framework',
            resources: [
              {
                type: 'Notes',
                content: `# Express.js Framework\n\nExpress is a minimal and flexible web application framework for Node.js.\n\n## Middlewares\nMiddleware functions have access to the request object (\`req\`), response object (\`res\`), and the \`next()\` function.`
              }
            ],
            quiz: {
              passingThreshold: 70,
              questions: [
                {
                  questionText: 'What function is used to pass execution to the next middleware in Express?',
                  options: ['next()', 'continue()', 'send()', 'forward()'],
                  correctOptionIndex: 0
                }
              ]
            }
          }
        ]
      }
    ];

    const nodeExamQuestions = [
      {
        questionText: 'Which Google Chrome engine is Node.js built upon?',
        options: ['Gecko', 'WebKit', 'V8', 'Blink'],
        correctOptionIndex: 2
      },
      {
        questionText: 'What file tracks dependencies and metadata in a Node.js project?',
        options: ['package.json', 'index.js', 'server.config', 'lock.json'],
        correctOptionIndex: 0
      },
      {
        questionText: 'How do you retrieve the built-in HTTP module inside your code?',
        options: ['import HTTP from "http"', 'const http = require("http")', 'const http = load("http")', 'fetch("http")'],
        correctOptionIndex: 1
      },
      {
        questionText: 'Which HTTP method is conventionally used to retrieve data from a server in Express?',
        options: ['POST', 'PUT', 'DELETE', 'GET'],
        correctOptionIndex: 3
      }
    ];

    const nodeCourse = await seedCourseData(
      'Introduction to Node.js',
      'Learn Node.js core principles, architecture, NPM package manager, build web servers using HTTP, and develop REST APIs using Express.js framework.',
      'Software Engineering',
      nodeModules,
      nodeExamQuestions,
      instructorId
    );

    // ==========================================
    // 2. REACT COURSE DATA
    // ==========================================
    const reactModules = [
      {
        title: 'React Fundamentals',
        topics: [
          {
            title: 'JSX and Functional Components',
            resources: [
              {
                type: 'Notes',
                content: `# JSX and Functional Components\n\nJSX stands for JavaScript XML. It allows us to write HTML in React. Functional components are JavaScript functions that return JSX elements.\n\n\`\`\`jsx\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n\`\`\``
              },
              {
                type: 'Video',
                url: 'https://www.youtube.com/watch?v=Ke90Tje7VS0'
              }
            ],
            quiz: {
              passingThreshold: 70,
              questions: [
                {
                  questionText: 'What does JSX stand for?',
                  options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
                  correctOptionIndex: 0
                },
                {
                  questionText: 'React functional components must return:',
                  options: ['A string', 'JSX elements', 'A number', 'Nothing'],
                  correctOptionIndex: 1
                }
              ]
            }
          },
          {
            title: 'State and Props',
            resources: [
              {
                type: 'Notes',
                content: `# State and Props\n\n- **Props** are read-only inputs passed from parent components to child components.\n- **State** is a private, fully controlled data object inside a component that can trigger re-renders when modified using the \`useState\` Hook.`
              }
            ],
            quiz: {
              passingThreshold: 70,
              questions: [
                {
                  questionText: 'Are props mutable inside the component that receives them?',
                  options: ['Yes', 'No'],
                  correctOptionIndex: 1
                },
                {
                  questionText: 'Which React Hook is used to maintain local component state?',
                  options: ['useReducer', 'useState', 'useEffect', 'useMemo'],
                  correctOptionIndex: 1
                }
              ]
            }
          }
        ]
      },
      {
        title: 'React Hooks and Routing',
        topics: [
          {
            title: 'The useEffect Hook',
            resources: [
              {
                type: 'Notes',
                content: `# The useEffect Hook\n\nThe \`useEffect\` hook lets you perform side effects in functional components. Side effects include data fetching, manual DOM updates, and setup/cleanup of subscriptions.`
              }
            ],
            quiz: {
              passingThreshold: 70,
              questions: [
                {
                  questionText: 'When does a useEffect hook run if its dependency array is empty ([])?',
                  options: [
                    'On every component re-render',
                    'Only once after the initial render/mount',
                    'Before the component unmounts only',
                    'Never'
                  ],
                  correctOptionIndex: 1
                }
              ]
            }
          },
          {
            title: 'Routing with React Router',
            resources: [
              {
                type: 'Notes',
                content: `# Routing with React Router\n\nReact Router enables client-side routing in single-page React applications. It maps URL routes directly to specific page components without full-page reloads.`
              }
            ],
            quiz: {
              passingThreshold: 70,
              questions: [
                {
                  questionText: 'Which React Router component is used to navigate to a new route instead of a standard HTML <a> tag?',
                  options: ['<Route>', '<Link>', '<Navigator>', '<Redirect>'],
                  correctOptionIndex: 1
                }
              ]
            }
          }
        ]
      }
    ];

    const reactExamQuestions = [
      {
        questionText: 'React is maintained by which company?',
        options: ['Google', 'Meta', 'Microsoft', 'Amazon'],
        correctOptionIndex: 1
      },
      {
        questionText: 'What is the correct syntax to create a React state variable named count?',
        options: [
          'const count = useState(0);',
          'const [count, setCount] = useState(0);',
          'let count = 0;',
          'const count = state(0);'
        ],
        correctOptionIndex: 1
      },
      {
        questionText: 'What hook is used to cache calculations between component re-renders?',
        options: ['useCallback', 'useContext', 'useMemo', 'useRef'],
        correctOptionIndex: 2
      },
      {
        questionText: 'What must you pass as a key prop when rendering a list of items?',
        options: [
          'A unique string or number for each list element',
          'The index of the item always',
          'Nothing, keys are optional',
          'A reference to the list array'
        ],
        correctOptionIndex: 0
      }
    ];

    const reactCourse = await seedCourseData(
      'Introduction to React',
      'Learn React library basics, components, props, state, hooks, router, and building high-performance modern web user interfaces.',
      'Software Engineering',
      reactModules,
      reactExamQuestions,
      instructorId
    );

    // ==========================================
    // 3. AUTO-COMPLETED COURSE FOR LEARNER (JANE)
    // ==========================================
    let learner = await User.findOne({ email: 'jane@example.com' });
    if (!learner) {
      console.log('[AUTO-SEED] Creating default learner Jane...');
      learner = new User({
        name: 'Learner Jane',
        email: 'jane@example.com',
        password: 'password123',
        role: 'Learner'
      });
      await learner.save();
    } else {
      console.log('[AUTO-SEED] Learner Jane exists. Resetting password...');
      learner.password = 'password123';
      await learner.save();
    }

    console.log(`[AUTO-SEED] Found/Created Learner: ${learner.name} (ID: ${learner._id})`);

    // Let's make "Introduction to React" completed for Jane
    let progress = await Progress.findOne({ userId: learner._id, courseId: reactCourse._id });
    if (!progress) {
      progress = new Progress({
        userId: learner._id,
        courseId: reactCourse._id
      });
    }

    // Get all topic IDs for React
    const reactModulesList = await Module.find({ courseId: reactCourse._id });
    const reactModuleIds = reactModulesList.map(m => m._id);
    const reactTopicsList = await Topic.find({ moduleId: { $in: reactModuleIds } });
    const reactTopicIds = reactTopicsList.map(t => t._id);

    progress.completedTopics = reactTopicIds;
    progress.completedQuizzes = reactTopicIds;
    progress.progressPercent = 100;
    progress.finalExamPassed = true;
    await progress.save();

    console.log(`[AUTO-SEED] Set course "${reactCourse.title}" to 100% complete for ${learner.name}`);

    // Pre-generate certificate for Jane on React course
    let cert = await Certificate.findOne({ userId: learner._id, courseId: reactCourse._id });
    if (!cert) {
      cert = new Certificate({
        certificateId: 'CERT-LMS-' + new mongoose.Types.ObjectId().toString().toUpperCase(),
        userId: learner._id,
        courseId: reactCourse._id,
        issuedAt: new Date()
      });
      await cert.save();
      console.log(`[AUTO-SEED] Pre-generated certificate ${cert.certificateId} for ${learner.name}`);
    }

  } catch (err) {
    console.error('[AUTO-SEED] Seeding error:', err);
  }
};

// Start seed asynchronously after DB connection is ready
setTimeout(() => {
  seedData();
}, 2000);
