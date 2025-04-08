import { storageService } from "./storage.service.ts"
import { MessageModel, MessageWithoutIdModel } from "../models/message.model.ts"

export const chatService = {
    query,
    addMessage,
    clearChat,
}

const STORAGE_KEY : string = 'chat'

function query(): Promise<MessageModel[]> {
  return storageService.query<MessageModel>(STORAGE_KEY)
}

async function addMessage(username : string, text : string) : Promise<MessageModel>{
    const newMessage : MessageWithoutIdModel = {username, text}
    return storageService.post(STORAGE_KEY, newMessage)
}

async function clearChat() : Promise<void>{
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
}