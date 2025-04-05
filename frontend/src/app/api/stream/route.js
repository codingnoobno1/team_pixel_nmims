// /app/api/socket/route.ts (Next.js App Router API)
import { Server } from 'socket.io';

let latestImage = null;
let io = null;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('🔌 Starting new WebSocket server...');
    io = new Server(res.socket.server, {
      path: '/api/socket',
    });

    io.on('connection', socket => {
      console.log('📡 New client connected');

      // Client wants the latest image
      socket.on('get-latest', () => {
        if (latestImage) {
          socket.emit('latest-image', latestImage);
        } else {
          socket.emit('no-image');
        }
      });

      // When a client sends a new image
      socket.on('send-image', image => {
        latestImage = image?.trim();
        io.emit('latest-image', latestImage); // Broadcast to all
      });

      socket.on('disconnect', () => {
        console.log('❌ Client disconnected');
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('✅ WebSocket already running');
  }
  res.end();
}
