
const compose = require('docker-compose');
const path = require('path');

async function startNodeJsContainer() {
    compose.upOne('web', { cwd: path.join(__dirname), log: true }).then(
        () => {
          console.log('done')
        },
        (err) => {
          console.log('something went wrong:', err.message)
        }
      )
}
  
  if (process.argv.includes('nodejs')) {
    startNodeJsContainer();
}


async function startPostgreSQLContainer() {
    compose.upOne('db', { cwd: path.join(__dirname), log: true }).then(
        () => {
          console.log('done')
        },
        (err) => {
          console.log('something went wrong:', err.message)
        }
      )
}
  
  if (process.argv.includes('db')) {
    startPostgreSQLContainer();
}

