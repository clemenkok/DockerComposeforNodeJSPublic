const compose = require('docker-compose');
const path = require('path');

async function startCardioNIfTIContainer() {
    compose.upOne('CardioNIfTI', { cwd: path.join(__dirname), log: true }).then(
        () => {
          console.log('done')
        },
        (err) => {
          console.log('something went wrong:', err.message)
        }
      )
}
  
  if (process.argv.includes('CardioNIfTI')) {
    startCardioNIfTIContainer();
}


async function start4DSegmentContainer() {
    compose.upOne('4DSegment2.0', { cwd: path.join(__dirname), log: true }).then(
        () => {
          console.log('done')
        },
        (err) => {
          console.log('something went wrong:', err.message)
        }
      )
}
  
  if (process.argv.includes('4dsegment2.0')) {
    start4DSegmentContainer();
}

