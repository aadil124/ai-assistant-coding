const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config/environment');
const User = require('./models/User');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Topic = require('./models/Topic');
const Resource = require('./models/Resource');
const Quiz = require('./models/Quiz');
const FinalExam = require('./models/FinalExam');

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Find or create an instructor
    let instructor = await User.findOne({ role: 'Instructor' });
    if (!instructor) {
      console.log('No instructor found. Creating default instructor...');
      instructor = new User({
        name: 'Instructor Bob',
        email: 'bob@example.com',
        password: 'password123', // will be hashed automatically by pre-save hook
        role: 'Instructor'
      });
      await instructor.save();
    }
    console.log(`Using Instructor: ${instructor.name} (${instructor.email}, ID: ${instructor._id})`);

    // Check if the "Introduction to Node.js" course exists or create it
    let course = await Course.findOne({ title: 'Introduction to Node.js' });
    if (course) {
      console.log(`Course "Introduction to Node.js" already exists with ID: ${course._id}. Cleaning existing modules and content...`);
      const modules = await Module.find({ courseId: course._id });
      const moduleIds = modules.map(m => m._id);
      
      const topics = await Topic.find({ moduleId: { $in: moduleIds } });
      const topicIds = topics.map(t => t._id);

      await Module.deleteMany({ courseId: course._id });
      await Topic.deleteMany({ moduleId: { $in: moduleIds } });
      await Resource.deleteMany({ topicId: { $in: topicIds } });
      await Quiz.deleteMany({ topicId: { $in: topicIds } });
      await FinalExam.deleteMany({ courseId: course._id });
      
      console.log('Cleaned old course content successfully.');
    } else {
      console.log('Creating "Introduction to Node.js" course...');
      course = new Course({
        title: 'Introduction to Node.js',
        description: 'Learn Node.js core principles, architecture, NPM package manager, build web servers using HTTP, and develop REST APIs using Express.js framework.',
        category: 'Software Engineering',
        instructorId: instructor._id
      });
      await course.save();
    }
    console.log(`Course: ${course.title}, ID: ${course._id}`);

    // --- Module 1: Node.js Basics and Architecture ---
    const mod1 = new Module({
      courseId: course._id,
      title: 'Node.js Basics and Architecture',
      sequenceIndex: 0
    });
    await mod1.save();
    console.log(`Created Module 1: ${mod1.title}`);

    // Topic 1.1: Node.js Architecture
    const topic1_1 = new Topic({
      moduleId: mod1._id,
      title: 'Node.js Architecture & Event Loop',
      sequenceIndex: 0
    });
    await topic1_1.save();

    const note1_1 = new Resource({
      topicId: topic1_1._id,
      type: 'Notes',
      content: `# Node.js Architecture & Event Loop

Node.js is a runtime environment built on Google Chrome's V8 JavaScript engine. It uses an **event-driven, non-blocking I/O model** that makes it lightweight and efficient.

## Key Features
1. **Asynchronous and Event-Driven**: All APIs of the Node.js library are asynchronous (non-blocking). A Node.js-based server never waits for an API to return data.
2. **Single-Threaded but Highly Scalable**: Node.js uses a single-threaded event loop model. Although it is single-threaded, it handles concurrent requests through asynchronous callbacks.
3. **No Buffering**: Node.js applications never buffer any data; they output data in chunks.

## The Event Loop
The event loop is what allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. It constantly monitors:
- Call Stack
- Callback Queue
- Microtask Queue

When the Call Stack is empty, the event loop pushes the first callback from the queue into the stack for execution.`
    });
    await note1_1.save();

    const video1_1 = new Resource({
      topicId: topic1_1._id,
      type: 'Video',
      url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4'
    });
    await video1_1.save();

    const quiz1_1 = new Quiz({
      topicId: topic1_1._id,
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
        },
        {
          questionText: 'What mechanism allows Node.js to perform non-blocking I/O operations?',
          options: ['Multi-processing', 'The Event Loop', 'Worker Threads', 'Synchronous blocks'],
          correctOptionIndex: 1
        }
      ]
    });
    await quiz1_1.save();
    console.log(`Created Topic 1.1 and its resources/quiz`);

    // Topic 1.2: Package Management with NPM
    const topic1_2 = new Topic({
      moduleId: mod1._id,
      title: 'Package Management with NPM',
      sequenceIndex: 1
    });
    await topic1_2.save();

    const note1_2 = new Resource({
      topicId: topic1_2._id,
      type: 'Notes',
      content: `# Package Management with NPM

NPM (Node Package Manager) is the default package manager for Node.js. It consists of a command-line client and an online database of public and paid-for private packages.

## package.json File
Every Node.js project uses a \`package.json\` file to manage dependencies, scripts, and versioning. You can generate it by running:
\`\`\`bash
npm init -y
\`\`\`

Key fields:
- \`name\`: Name of your package/project
- \`version\`: Current version of your package
- \`dependencies\`: Packages required for production
- \`devDependencies\`: Packages required only for local development/testing
- \`scripts\`: Custom commands (e.g., "start", "test", "dev")`
    });
    await note1_2.save();

    const quiz1_2 = new Quiz({
      topicId: topic1_2._id,
      passingThreshold: 70,
      questions: [
        {
          questionText: 'Which command initiates a new Node.js project and generates package.json?',
          options: ['npm install', 'npm init', 'npm start', 'npm create'],
          correctOptionIndex: 1
        },
        {
          questionText: 'Where are third-party libraries installed by npm stored in your project directory?',
          options: ['src', 'dist', 'node_modules', 'bin'],
          correctOptionIndex: 2
        }
      ]
    });
    await quiz1_2.save();
    console.log(`Created Topic 1.2 and its resources/quiz`);


    // --- Module 2: Building Web Servers ---
    const mod2 = new Module({
      courseId: course._id,
      title: 'Building Web Servers',
      sequenceIndex: 1
    });
    await mod2.save();
    console.log(`Created Module 2: ${mod2.title}`);

    // Topic 2.1: HTTP Module
    const topic2_1 = new Topic({
      moduleId: mod2._id,
      title: 'The Built-in HTTP Module',
      sequenceIndex: 0
    });
    await topic2_1.save();

    const note2_1 = new Resource({
      topicId: topic2_1._id,
      type: 'Notes',
      content: `# The Built-in HTTP Module

Node.js has a built-in module called \`http\`, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).

## Creating an HTTP Server
To include the HTTP module, use the \`require()\` directive:
\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\\n');
});

server.listen(5000, () => {
  console.log('Server is running at http://localhost:5000/');
});
\`\`\`

## Request and Response objects
- \`req\` represents the incoming request (headers, url, method, etc.)
- \`res\` represents the outgoing response (status code, headers, content-type, write, end)`
    });
    await note2_1.save();

    const quiz2_1 = new Quiz({
      topicId: topic2_1._id,
      passingThreshold: 70,
      questions: [
        {
          questionText: 'Which built-in module in Node.js allows creating standard web servers?',
          options: ['fs', 'path', 'http', 'net'],
          correctOptionIndex: 2
        },
        {
          questionText: 'Which method on the response object is called to signal to the server that all headers and body have been sent?',
          options: ['res.send()', 'res.write()', 'res.end()', 'res.close()'],
          correctOptionIndex: 2
        }
      ]
    });
    await quiz2_1.save();
    console.log(`Created Topic 2.1 and its resources/quiz`);

    // Topic 2.2: Express.js Framework
    const topic2_2 = new Topic({
      moduleId: mod2._id,
      title: 'Express.js Framework',
      sequenceIndex: 1
    });
    await topic2_2.save();

    const note2_2 = new Resource({
      topicId: topic2_2._id,
      type: 'Notes',
      content: `# Express.js Framework

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## Getting Started
Install express:
\`\`\`bash
npm install express
\`\`\`

Create a simple application:
\`\`\`javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.listen(5000, () => {
  console.log('Express app listening on port 5000');
});
\`\`\`

## Middlewares
Middleware functions are functions that have access to the request object (\`req\`), the response object (\`res\`), and the next middleware function in the application’s request-response cycle. They can execute code, modify request/response objects, and end the request-response cycle.`
    });
    await note2_2.save();

    const quiz2_2 = new Quiz({
      topicId: topic2_2._id,
      passingThreshold: 70,
      questions: [
        {
          questionText: 'What is Express.js?',
          options: [
            'A database modeling tool',
            'A minimal and flexible web application framework for Node.js',
            'A compiler for JavaScript',
            'A CSS processor'
          ],
          correctOptionIndex: 1
        },
        {
          questionText: 'What function is used to pass execution to the next middleware in Express?',
          options: ['next()', 'continue()', 'send()', 'forward()'],
          correctOptionIndex: 0
        }
      ]
    });
    await quiz2_2.save();
    console.log(`Created Topic 2.2 and its resources/quiz`);

    // --- Create Final Exam ---
    const exam = new FinalExam({
      courseId: course._id,
      passingThreshold: 75,
      questions: [
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
      ]
    });
    await exam.save();
    console.log(`Created Final Exam for course!`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
