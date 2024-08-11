import WebSocket from 'ws';
import http from 'http';

let wss: WebSocket.Server;

export const setupWebSocketServer = (server: http.Server) => {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
      console.log(`Received message => ${message}`);
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });
};

export const broadcast = (action: string, payload: any) => {
  const message = JSON.stringify({ action, ...payload });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};