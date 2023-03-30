const amqp = require('amqplib');
const { spawn } = require('child_process');
const compose = require('docker-compose');
const path = require('path');

// RabbitMQ connection details
const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'my_queue';

async function run() {
  // Connect to RabbitMQ
  const conn = await amqp.connect(RABBITMQ_URL);
  const channel = await conn.createChannel();

  // Create a queue to receive messages
  await channel.assertQueue(QUEUE_NAME, { durable: false });

  console.log('Waiting for messages...');

  // Consume messages from the queue
  channel.consume(QUEUE_NAME, async (msg) => {
    const content = msg.content.toString();

    // Checks for message content and what process to start
    if (content = 'CardioNIfTI') {

        // Calls the docker-compose for nodejs library to start the corresponding container
        compose.upOne('CardioNIfTI', { cwd: path.join(__dirname), log: true }).then(
            () => {
            console.log('done')
            },
            (err) => {
            console.log('something went wrong:', err.message)
            }
        )

        // Spawn a child process to execute the Python script
        const auto_conversion = spawn('python', ['auto_conversion.py ']);

        // Need to figure out how to collect and pipe the data around

        // Shuts down the container when done
        compose.downOne('CardioNIfTI', { cwd: path.join(__dirname), log: true }).then(
            () => {
            console.log('done')
            },
            (err) => {
            console.log('something went wrong:', err.message)
            }
        )
    }
  }, { noAck: true });
}

run().catch((err) => console.error(err));
