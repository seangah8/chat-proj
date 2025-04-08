import { useState } from "react"
import { userService } from "../../services/user.service.ts"
import { chatService } from "../../services/chat.service.ts"
import { MessageModel } from "../../models/message.model.ts"

type CreateMessageProps = {
    isLoggedInUser: boolean,
    onAddMessage: (message : MessageModel) => void,
}

export function CreateMessage({isLoggedInUser, onAddMessage} : CreateMessageProps){

    const [message, setMessage] = useState<string>('')

    async function onSendMessage(): Promise<void>{
        if(message === '') throw new Error('cant send empty message')
        const user = await userService.getLoggedinUser()
        if(!user) throw new Error('There Was a Problem...')
        const newMessage = await chatService.addMessage(user?.username, message)
        onAddMessage(newMessage)
        setMessage('')
        console.log(user?.username + ' sent a message!')
    }

    return(
        <section className="create-message">
            <label htmlFor="message">New Message:</label>
            <input 
                type="text" 
                id="message" 
                value={message}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                    setMessage(event.target.value)}/>
            <button disabled={!isLoggedInUser} onClick={onSendMessage}>Send</button>
            {!isLoggedInUser && <p>login to create messages</p>}
        </section>
    )
}