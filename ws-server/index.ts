import  {WebSocketServer, WebSocket} from 'ws'

const wss = new WebSocketServer({ port: parseInt(process.env.PORT!) || 8080 })
const rooms = new Map<Number, string[]>()
const wsRooms = new Map<WebSocket, Number>()
const usersWs = new Map<String, WebSocket>()
const wsUsers = new Map<WebSocket, string>()
const relayer_ws = new WebSocket('ws://localhost:3000')

relayer_ws.onmessage = (message) => {
    console.log("Message from relayer", message.data.toString())
    const messageObj = JSON.parse(message.data.toString())
    rooms.get(messageObj.from!)?.forEach((client) => {
        console.log("Sending message to client", client)
        usersWs.get(client)?.send(JSON.stringify(messageObj), {
            binary: false
        })
    })
}
wss.on('connection', (ws, req) => {
    console.log("Socket connected to server", process.env.PORT)
    if(!req.headers['user-id'] ){
        ws.close()
    }
    const userId = req.headers['user-id'] as string
    usersWs.set(userId, ws)
    wsUsers.set(ws, userId)
    ws.on('message', (message: string) => {
        const messageObj = JSON.parse(message)
        if(messageObj.type == "joinRoom"){
            if(rooms.has(messageObj.roomId) && rooms.get(messageObj.roomId) != null){
                rooms.get(messageObj.roomId)?.push(wsUsers.get(ws)!)
                wsRooms.set(ws, messageObj.roomId)  
            }else{
                rooms.set(messageObj.roomId, [wsUsers.get(ws)!])
                wsRooms.set(ws, messageObj.roomId)  
            }
            console.log("Joined room", messageObj.roomId , "with", rooms.get(messageObj.roomId)?.length, "clients")
        }
        if(messageObj.type == "message"){
            if(wsRooms.has(ws)){
                rooms.get(wsRooms.get(ws)!)?.forEach((client) => {
                    if(usersWs.get(client) == ws){
                        return
                    }
                    usersWs.get(client)?.send(message, {
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
