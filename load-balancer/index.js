import proxylib from "http-proxy";
import { createServer } from "node:http";
const {createProxyServer} = proxylib
const PORT = process.env.PORT || 8000
const servers = ['ws://localhost:8080', 'ws://localhost:8081']

const server = createServer()
const proxy = createProxyServer()

server.on('upgrade',(req, socket, head)=>{
    const targetServer = servers[Math.floor(Math.random() * servers.length)]
    proxy.ws(req,socket, head, {
        target: targetServer
    }, (err)=>{
        console.log("Conn failed", err)
        socket.destroy();
    })
} )

server.listen(PORT, ()=>{
    console.log(`WS LB running on port ${PORT}`)
})
