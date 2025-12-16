// --- DATA: THE 43 QUESTIONS ---
const questionsData = [
    // ⭐ Core Node.js Architecture
    {
        category: "Core",
        q: "What is Node.js?",
        a: "Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. It is built on Chrome's V8 JavaScript engine.",
        code: `console.log("Node.js version: " + process.version);
// Output: Node.js version: v18.x.x`
    },
    {
        category: "Core",
        q: "Why is Node.js used?",
        a: "It is used for building fast, scalable network applications. It is ideal for I/O-heavy tasks like Real-time chats, REST APIs, and Streaming services because of its non-blocking architecture.",
        code: `// Great for:
// 1. Single Page Applications (SPAs)
// 2. Real-time apps (Socket.io)
// 3. JSON APIs`
    },
    {
        category: "Core",
        q: "Is Node.js single-threaded?",
        a: "Yes, it runs on a single main thread using an Event Loop. However, it can perform long-running I/O operations in the background (using the libuv thread pool), so the main thread never gets blocked.",
        code: `// Evidence of single thread:
while(true) {
 console.log("I will block everything forever because I am the only thread!");
}`
    },
    {
        category: "Core",
        q: "How does Node.js handle multiple requests (Concurrency)?",
        a: "It uses the Event Loop. When a request comes in, Node processes it. If it involves blocking I/O (like DB), it offloads it to a background worker. The main thread immediately takes the next request. When the DB is done, the callback is pushed back to the main thread.",
        code: `// Pseudo-code of Concurrency
incomingRequest((req) => {
  // Pass heavy work to background
  db.query('SELECT *', (data) => {
    // This runs LATER when data is ready
    sendResponse(data); 
  });
  // Main thread is free immediately here!
});`
    },
    {
        category: "Core",
        q: "What is the Event Loop?",
        a: "The Event Loop is the mechanism that allows Node.js to perform non-blocking I/O operations. It constantly checks if the Call Stack is empty and if there are pending callbacks in the Task Queue to be executed.",
        code: `// Order of Execution:
console.log('Start'); 

setTimeout(() => {
  console.log('Timeout'); // Runs last (Event Loop)
}, 0);

console.log('End');

// Output: Start -> End -> Timeout`
    },
    {
        category: "Core",
        q: "What is Non-Blocking I/O?",
        a: "Non-blocking means the system doesn't wait for a task (like reading a file) to finish before moving to the next line of code. It uses callbacks to handle the result later.",
        code: `const fs = require('fs');

// Non-blocking
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data); // Runs later
});

console.log('This prints FIRST');`
    },
    {
        category: "Core",
        q: "What is the difference between synchronous and asynchronous code?",
        a: "Synchronous code executes line-by-line, blocking execution until the current line finishes. Asynchronous code allows the program to continue executing other tasks while waiting for long-running operations to complete.",
        code: `// Synchronous (Blocks)
const data = fs.readFileSync('file.txt'); 
console.log(data);

// Asynchronous (Non-blocking)
fs.readFile('file.txt', (err, data) => {
    console.log(data);
});`
    },
    {
        category: "Core",
        q: "What is a callback function?",
        a: "A callback is a function passed as an argument to another function, which is then invoked inside the outer function to complete some kind of routine or action.",
        code: `function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData((message) => {
  console.log(message); // "Data received"
});`
    },
    {
        category: "Core",
        q: "What is 'Callback Hell'?",
        a: "Callback Hell creates pyramid-shaped code that is difficult to read and maintain. It happens when you nest multiple callbacks inside each other.",
        code: `getData(function(a){
    getMore(a, function(b){
        getMore(b, function(c){
            getMore(c, function(d){
                // Pyramid of Doom
            });
        });
    });
});`
    },
    {
        category: "Core",
        q: "How do you avoid callback hell?",
        a: "We avoid it by using Promises, Async/Await, or by modularizing code into separate functions.",
        code: `// Using Async/Await to fix it
async function doWork() {
  const a = await getData();
  const b = await getMore(a);
  const c = await getMore(b);
  console.log(c);
}`
    },

    // ⭐ Asynchronous Programming
    {
        category: "Async",
        q: "What are Promises?",
        a: "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. It has 3 states: Pending, Resolved (Fulfilled), or Rejected.",
        code: `const myPromise = new Promise((resolve, reject) => {
  let success = true;
  if (success) resolve("Success!");
  else reject("Failure.");
});

myPromise
  .then(res => console.log(res))
  .catch(err => console.log(err));`
    },
    {
        category: "Async",
        q: "What is async/await?",
        a: "Async/await is syntactic sugar built on top of Promises. It makes asynchronous code look and behave like synchronous code, making it easier to read.",
        code: `async function fetchData() {
  try {
    const response = await fetch('https://api.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}`
    },
    {
        category: "Async",
        q: "Difference: Callbacks vs Promises vs Async/Await?",
        a: "Callbacks are functions passed as args (can lead to nesting hell). Promises are cleaner objects for async handling. Async/Await is the modern, cleanest way to write async code that looks synchronous.",
        code: `// 1. Callback
func((err, data) => {});

// 2. Promise
func().then(data => {}).catch(err => {});

// 3. Async/Await
const data = await func();`
    },
    {
        category: "Async",
        q: "What is setTimeout()?",
        a: "setTimeout() schedules a function to run after a minimum specified delay (in milliseconds). It is part of the Timer phase in the Event Loop.",
        code: `console.log("1");

setTimeout(() => {
  console.log("2");
}, 1000);

console.log("3");
// Output: 1 -> 3 -> (1 sec wait) -> 2`
    },
    {
        category: "Async",
        q: "What is process.nextTick()?",
        a: "process.nextTick() queues a callback to execute immediately after the current operation completes, but BEFORE the Event Loop continues to the next phase. It has higher priority than setTimeout.",
        code: `console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

process.nextTick(() => console.log("Next Tick"));

console.log("End");
// Output: Start -> End -> Next Tick -> Timeout`
    },
    {
        category: "Async",
        q: "What is setImmediate() vs setTimeout()?",
        a: "setImmediate() executes in the 'Check' phase of the Event Loop (after I/O). setTimeout() executes in the 'Timer' phase. Their order depends on context, but in I/O callbacks, setImmediate runs first.",
        code: `const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('Timeout'), 0);
  setImmediate(() => console.log('Immediate'));
});

// Inside I/O, Immediate ALWAYS runs before Timeout`
    },

    // ⭐ Modules & NPM
    {
        category: "Modules",
        q: "What is a module in Node.js?",
        a: "A module is a reusable block of code whose existence does not strictly impact other code. It's like a library. Every file in Node.js is treated as a module.",
        code: `// math.js
const add = (a, b) => a + b;
module.exports = add;

// app.js
const add = require('./math');
console.log(add(2, 3));`
    },
    {
        category: "Modules",
        q: "What are Core Modules?",
        a: "Core modules are built-in modules included with Node.js installation. Examples include 'http' (server), 'fs' (file system), 'path' (file paths), and 'os' (operating system info).",
        code: `const fs = require('fs');
const path = require('path');
const http = require('http');

console.log("No need to npm install these!");`
    },
    {
        category: "Modules",
        q: "What is require()?",
        a: "require() is the built-in function used to import modules in Node.js (CommonJS standard). It reads a JavaScript file, executes it, and returns the exports object.",
        code: `const myModule = require('./myModule');
const fs = require('fs'); // Core module`
    },
    {
        category: "Modules",
        q: "What is module.exports?",
        a: "module.exports is the object that is actually returned as the result of a require() call. Whatever you assign to this object is exposed to other files.",
        code: `// exporter.js
module.exports = {
  sayHello: () => console.log("Hello")
};

// importer.js
const obj = require('./exporter');
obj.sayHello();`
    },
    {
        category: "Modules",
        q: "What is NPM?",
        a: "NPM (Node Package Manager) is the default package manager for Node.js. It consists of a CLI tool and an online registry of open-source packages.",
        code: `# In terminal:
npm init -y   # Create package.json
npm install express # Install a package`
    },
    {
        category: "Modules",
        q: "What is package.json?",
        a: "It is the manifest file for a Node.js project. It holds metadata (name, version), scripts (start, test), and the list of dependencies.",
        code: `{
  "name": "my-app",
  "dependencies": {
    "express": "^4.17.1"
  }
}`
    },
    {
        category: "Modules",
        q: "Difference: dependencies vs devDependencies?",
        a: "dependencies are required for the app to run in production (e.g., express). devDependencies are only needed during development/testing (e.g., nodemon, jest).",
        code: `npm install express          # Adds to dependencies
npm install nodemon --save-dev # Adds to devDependencies`
    },

    // ⭐ Data Handling
    {
        category: "Data",
        q: "What is the fs module? readFile vs readFileSync?",
        a: "The fs module handles the file system. readFile is asynchronous (non-blocking, uses callback), while readFileSync is synchronous (blocks execution until done).",
        code: `const fs = require('fs');

// Async (Recommended)
fs.readFile('data.txt', 'utf8', (err, data) => console.log(data));

// Sync (Blocks code)
const data = fs.readFileSync('data.txt', 'utf8');`
    },
    {
        category: "Data",
        q: "What are Streams?",
        a: "Streams are objects that let you read data from a source or write data to a destination in continuous chunks. They are efficient for large files because you don't load the whole file into memory.",
        code: `const fs = require('fs');
const readStream = fs.createReadStream('large-video.mp4');
const writeStream = fs.createWriteStream('copy.mp4');

// Pipe connects read to write (efficiently)
readStream.pipe(writeStream);`
    },
    {
        category: "Data",
        q: "What is a Buffer?",
        a: "A Buffer is a temporary memory storage for raw binary data. Since JS traditionally didn't handle binary streams well, Buffers were introduced to handle things like image streams or TCP streams.",
        code: `const buf = Buffer.from('Hello');
console.log(buf); 
// <Buffer 48 65 6c 6c 6f>

console.log(buf.toString()); 
// 'Hello'`
    },

    // ⭐ HTTP & REST
    {
        category: "Web",
        q: "What is HTTP?",
        a: "HTTP (HyperText Transfer Protocol) is the protocol used for transmitting data on the web. Node.js has a built-in 'http' module to create web servers.",
        code: `const http = require('http');
const server = http.createServer((req, res) => {
    res.end('Hello HTTP');
});
server.listen(3000);`
    },
    {
        category: "Web",
        q: "Difference between GET and POST?",
        a: "GET requests data from a specified resource (data is in URL). POST submits data to be processed to a specified resource (data is in the body, more secure).",
        code: `// GET: http://api.com/users?id=1
// POST: Body: { "username": "john", "password": "123" }`
    },
    {
        category: "Web",
        q: "What is a REST API?",
        a: "REST (Representational State Transfer) is an architectural style for APIs. It uses standard HTTP methods (GET, POST, PUT, DELETE) and typically returns JSON.",
        code: `app.get('/users', (req, res) => { ... });  // Read
app.post('/users', (req, res) => { ... }); // Create
app.put('/users', (req, res) => { ... });  // Update
app.delete('/users', (req, res) => { ... }); // Delete`
    },
    {
        category: "Web",
        q: "What is JSON?",
        a: "JSON (JavaScript Object Notation) is a lightweight format for storing and transporting data. It is easy for humans to read and machines to parse.",
        code: `const obj = { name: "Node" };
const jsonString = JSON.stringify(obj); // Convert to JSON
const newObj = JSON.parse(jsonString);  // Convert back to JS Object`
    },
    {
        category: "Web",
        q: "What are HTTP Status Codes (200, 404, 500)?",
        a: "200: OK (Success). 404: Not Found (Resource doesn't exist). 500: Internal Server Error (Server crashed or failed).",
        code: `res.status(200).json({ msg: "Success" });
res.status(404).json({ msg: "User not found" });
res.status(500).json({ msg: "Server exploded" });`
    },

    // ⭐ Security
    {
        category: "Security",
        q: "Authentication vs Authorization?",
        a: "Authentication verifies WHO you are (Login). Authorization verifies WHAT you are allowed to do (Permissions/Roles).",
        code: `// AuthN: Check username/password
// AuthZ: Check if user.role === 'admin'`
    },
    {
        category: "Security",
        q: "What is JWT (JSON Web Token)?",
        a: "JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It is commonly used for stateless authentication.",
        code: `const jwt = require('jsonwebtoken');

// Create Token
const token = jwt.sign({ id: user.id }, 'secretKey');

// Verify Token
const decoded = jwt.verify(token, 'secretKey');`
    },
    {
        category: "Security",
        q: "What is bcrypt? (Why hash passwords?)",
        a: "bcrypt is a library to hash passwords. We hash passwords so that if the database is hacked, the attackers only see random strings, not actual passwords.",
        code: `const bcrypt = require('bcrypt');

// Hash
const hash = await bcrypt.hash('password123', 10);

// Compare
const match = await bcrypt.compare('password123', hash);`
    },
    {
        category: "Security",
        q: "What is CORS?",
        a: "CORS (Cross-Origin Resource Sharing) is a browser security feature that restricts cross-origin HTTP requests. You must enable it on the server to allow a frontend on a different domain to access your API.",
        code: `const cors = require('cors');
app.use(cors()); // Allow all origins`
    },

    // ⭐ Environment
    {
        category: "Env",
        q: "What is process.env?",
        a: "process.env is a global object in Node.js that contains the user environment variables. It is used to store sensitive data like API keys.",
        code: `// Accessing a variable
const port = process.env.PORT || 3000;
console.log(port);`
    },
    {
        category: "Env",
        q: "What is a .env file?",
        a: "A .env file is a simple text file containing key=value pairs of environment variables. We use the 'dotenv' library to load them into process.env.",
        code: `// .env file content:
DB_PASS=superSecret123

// In app.js:
require('dotenv').config();
console.log(process.env.DB_PASS);`
    },
    {
        category: "Env",
        q: "What is nodemon?",
        a: "nodemon is a utility that monitors for any changes in your source and automatically restarts your server. It is a dev tool.",
        code: `// Without nodemon: Change code -> Stop server -> Start server
// With nodemon: Change code -> Auto restart`
    },
    {
        category: "Env",
        q: "How do you deploy a Node.js application?",
        a: "Common strategies: 1. Use a Process Manager (PM2) to keep it alive. 2. Use a Reverse Proxy (Nginx). 3. Host on cloud platforms like AWS, Heroku, or Vercel.",
        code: `// Using PM2 to keep app running forever
pm2 start app.js`
    },

    // ⭐ Practical
    {
        category: "Practical",
        q: "How do you create a simple REST API?",
        a: "Use Express.js for simplicity. Create an app, define routes (GET/POST), and listen on a port.",
        code: `const express = require('express');
const app = express();

app.get('/', (req, res) => res.json({ msg: 'Hello API' }));

app.listen(3000, () => console.log('Server running'));`
    },
    {
        category: "Practical",
        q: "How do you handle errors in an async function?",
        a: "Use a try/catch block inside the async function. If the promise rejects, control goes to the catch block.",
        code: `async function getData() {
  try {
    const data = await riskyOperation();
    return data;
  } catch (error) {
    console.error("Caught error:", error.message);
  }
}`
    },
    {
        category: "Practical",
        q: "How do you update a package using NPM?",
        a: "Use 'npm update' to update packages to the latest version allowed by the semver rules in package.json.",
        code: `npm update <package_name>
// or
npm install <package_name>@latest`
    },
    {
        category: "Practical",
        q: "Predict Output: log, setTimeout, Promise?",
        a: "Sync code runs first. Then Microtasks (Promises). Then Macrotasks (setTimeout).",
        code: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);

// Output: 1 -> 4 -> 3 -> 2`
    }
];

// --- RENDER LOGIC ---
const qList = document.getElementById('questions-list');

function renderQuestions(filter = "") {
    qList.innerHTML = "";

    questionsData.forEach((item, index) => {
        if (item.q.toLowerCase().includes(filter) || item.a.toLowerCase().includes(filter)) {

            // Determine tag color
            let tagClass = "tag-core";
            if (item.category === "Async") tagClass = "tag-async";
            if (item.category === "Web") tagClass = "tag-web";

            const html = `
                <div class="accordion-item">
                    <div class="accordion-header" onclick="toggleQ(this)">
                        <span>
                            <span class="tag ${tagClass}">${item.category}</span>
                            ${index + 1}. ${item.q}
                        </span>
                        <span class="icon">+</span>
                    </div>
                    <div class="accordion-body">
                        <div class="accordion-content">
                            <p>${item.a}</p>
                            <div class="code-container">
                                <button class="copy-btn" onclick="copyCode(this)">Copy Script</button>
                                <pre>${escapeHtml(item.code)}</pre>
                            </div>
                        </div>
                    </div>
                </div>`;
            qList.insertAdjacentHTML('beforeend', html);
        }
    });
}

// Helper to escape HTML characters in code blocks
function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// --- INTERACTION FUNCTIONS ---
function showTab(tabId) {
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');

    // Find the button that calls this function and add active class
    const btns = document.querySelectorAll('.tab-btn');
    if (tabId === 'theory') btns[0].classList.add('active');
    else btns[1].classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

function toggleQ(header) {
    const body = header.nextElementSibling;
    const icon = header.querySelector('.icon');

    if (body.style.maxHeight) {
        body.style.maxHeight = null;
        icon.innerText = "+";
    } else {
        body.style.maxHeight = body.scrollHeight + "px";
        icon.innerText = "-";
    }
}

function copyCode(btn) {
    const codeBlock = btn.nextElementSibling;
    const codeText = codeBlock.innerText;

    navigator.clipboard.writeText(codeText).then(() => {
        const originalText = btn.innerText;
        btn.innerText = "Copied!";
        btn.style.background = "#6cc24a";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "rgba(255,255,255,0.15)";
        }, 2000);
    });
}

function filterQuestions() {
    const input = document.getElementById('search').value.toLowerCase();
    renderQuestions(input);
}

// Initial Render
renderQuestions();