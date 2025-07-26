import  {WebSocketServer, WebSocket} from 'ws'

const wss = new WebSocketServer({ port: parseInt(process.env.PORT!) || 8080 })
const rooms = new Map<Number, WebSocket[]>()
const wsRooms = new Map<WebSocket, Number>()
const usersWs = new Map<String, WebSocket>()
const relayer_ws = new WebSocket('ws://localhost:3000')

relayer_ws.onmessage = (message) => {
    console.log("Message from relayer", message.data.toString())
    const messageObj = JSON.parse(message.data.toString())
    rooms.get(messageObj.from!)?.forEach((client) => {
        console.log("Sending message to client", client)
        client.send(JSON.stringify(messageObj), {
            binary: false
        })
    })
}
wss.on('connection', (ws, req) => {
    console.log("Socket connected to server", process.env.PORT)
    console.log("Socket connected to client", req.headers['user-id'])
    if(!req.headers['user-id'] ){
        ws.close()
    }
    ws.on('message', (message: string) => {
        const messageObj = JSON.parse(message)
        if(messageObj.type == "joinRoom"){
            if(rooms.has(messageObj.roomId) && rooms.get(messageObj.roomId) != null){
                rooms.get(messageObj.roomId)?.push(ws)
                wsRooms.set(ws, messageObj.roomId)  
            }else{
                rooms.set(messageObj.roomId, [ws])
                wsRooms.set(ws, messageObj.roomId)  
            }
            console.log("Joined room", messageObj.roomId , "with", rooms.get(messageObj.roomId)?.length, "clients")
        }
        if(messageObj.type == "message"){
            if(wsRooms.has(ws)){
                rooms.get(wsRooms.get(ws)!)?.forEach((client) => {
                    if(client == ws){
                        return
                    }
                    client.send(message, {
                        binary: false
                    })
                })
            }
            const relayMsg = JSON.stringify({
                ...messageObj,
                from: wsRooms.get(ws)
            })
            relayer_ws.send(relayMsg, {
                binary: false
            })
        }

    })
})


wss.on('listening', () => {
    console.log(`listening on port ${process.env.PORT} `)
})
