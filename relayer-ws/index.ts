import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log("Relayer", message.toString())
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && client !== ws) {
                client.send(message);
            }
        });
    });
});