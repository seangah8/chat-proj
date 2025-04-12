import { io, Socket } from 'socket.io-client'

export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'
export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'

const BASE_URL: string = 'http://localhost:3000'
export const socketService = createSocketService()

socketService.setup()

function createSocketService() {
    var socket : null | Socket = null
    const socketService = {
        async setup() : Promise<void> {
            socket = io(BASE_URL)
        },
        on(eventName : string, cb: (...args: any[]) => void) {
            if (socket) socket.on(eventName, cb)
        },
        off(eventName : string,  cb: (...args: any[]) => void) {
            if (!socket) return
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName : string, data: any) {
            if (socket) socket.emit(eventName, data)
        },
        terminate() {
            socket = null
        },

    }
    return socketService
}
