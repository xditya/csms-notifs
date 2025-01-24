const WebSocket = require("ws");

// Create a WebSocket server
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server started on port ${PORT}`);
});

// Store all connected clients
const clients = new Set();

wss.on("connection", (ws) => {
  console.log("New client connected");
  clients.add(ws);

  // Listen for messages from clients
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Broadcast: ${message}`);
      }
    }
  });

  // Remove the client when they disconnect
  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });
});

console.log("WebSocket server is running...");
