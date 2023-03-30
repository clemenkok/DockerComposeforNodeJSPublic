const amqp = require('amqplib');

// RabbitMQ connection details
const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'my_queue';

async function publishMessage() {
  try {
    // Connect to RabbitMQ
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();

    // Create a queue to send messages
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    // Publish a message to the queue
    const message = 'CardioNIfTI';
    await channel.sendToQueue(QUEUE_NAME, Buffer.from(message));

    console.log(`Message published to ${QUEUE_NAME}: ${message}`);

    // Close the channel and connection
    await channel.close();
    await conn.close();

  } catch (err) {
    console.error(err);
  }
}

publishMessage();
