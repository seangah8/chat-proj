import { httpService } from '../http.service'
import { MessageModel } from '../../models/message.model'

export const chatService = {
    getMsgs,
    getById,
    add,
    update,
    remove,
    clearChat,
}

async function getMsgs() : Promise<MessageModel[]> {
    return await httpService.get(`msg`)
}


async function getById(msgId : string) : Promise<MessageModel> {
	return await httpService.get(`msg/${msgId}`)
}

async function remove(msgId : string) : Promise<void> {
	httpService.delete(`msg/${msgId}`)
}

async function add(text : string) : Promise<MessageModel> {
  const msg : {text : string} = { text }
  return await httpService.post('msg', msg)
}

async function update(text : string, _id : string) : Promise<MessageModel> {
  const msg : {text : string} = { text }
  return await httpService.put(`msg/${_id}`, msg)
}

async function clearChat(){
  const messages : MessageModel[] =  await getMsgs()
  for (const msg of messages) {
    await remove(msg._id)
  }
}