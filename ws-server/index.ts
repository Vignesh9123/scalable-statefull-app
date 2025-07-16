import {WebSocketServer, WebSocket} from 'ws'

const wss = new WebSocketServer({ port: 8080 })
const rooms = new Map<Number, WebSocket[]>()
const wsRooms = new Map<WebSocket, Number>()

wss.on('connection', (ws) => {

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
        }

    })
})


wss.on('listening', () => {
    console.log('listening on port 8080')
})