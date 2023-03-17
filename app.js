const http = require('http');
const compose = require('docker-compose');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/button1') {
    button1Clicked();
  } else if (req.url === '/button2') {
    button2Clicked();
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`
      <html>
        <head>
          <title>My Node.js App</title>
        </head>
        <body>
          <h1>Welcome to my Node.js app!</h1>
          <button id="startNodeJsContainer">Node JS</button>
          <button id="startPostgreSQLDB">PostgreSQL</button>
        </body>
      </html>
    `);
    res.end();
  }
});

async function startNodeJsApp() {
    compose.upOne('db', { cwd: path.join(__dirname), log: true }).then(
        () => {
          console.log('done')
        },
        (err) => {
          console.log('something went wrong:', err.message)
        }
      )
}
  
  // Attach this function to the click event of the button
  // document.getElementById('startNodeJSContainer').addEventListener('click', startNodeJsApp);
  // startNodeJSContainer.addEventListener('click', startNodeJsApp);

  if (process.argv.includes('nodejs')) {
    startNodeJsApp();
}


async function startPostgreSQLDBFn() {
  try {
    // Start the Docker Compose stack
    const stack = await compose.upOne({
      cwd: '/path/to/project/folder',
      log: true,
      services: 'db'
    });
    console.log('Docker Compose stack started:', stack.out);
  } catch (err) {
    console.error('Error starting Docker Compose stack:', err);
  }
}

// Attach this function to the click event of the button
// document.getElementById('startPostgreSQLDB').addEventListener('click', startPostgreSQLDBFn);
// startPostgreSQLDB.addEventListener('click', startPostgreSQLDB);
    if (process.argv.includes('postgreSQL')) {
        startPostgreSQLDBFn();
    }

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});