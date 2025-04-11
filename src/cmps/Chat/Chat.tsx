import { CreateMessage } from "./CreateMessage.tsx"
import { MessageList } from "./MessageList.tsx"
import { MessageModel } from "../../models/message.model.ts"
import { chatService } from "../../services/chat"

import { useState, useEffect } from "react"

type ChatProps = {
    isLoggedInUser: boolean,
}

export function Chat({isLoggedInUser} : ChatProps){

    const [chat, setChat] = useState<MessageModel[]>([])

    useEffect(()=>{
        loadChat()
    },[])

    async function loadChat(){
        const chat = await chatService.getMsgs()
        setChat(chat)
    }

    function onAddMessage(message : MessageModel) : void{
        setChat(prev => [...prev, message])
    }

    async function onClearChat() : Promise<void>{
        setChat([])
        await chatService.clearChat()
        console.log('Chat has been cleared!')
    }

    return(
        <section className="chat">
            <CreateMessage isLoggedInUser={isLoggedInUser} onAddMessage={onAddMessage}/>
            <button onClick={onClearChat}>Clear Your Messages</button>
            <MessageList chat={chat}/>
        </section>
    )
}