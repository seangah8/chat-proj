import { MessageModel } from "../../models/message.model.ts"

type MessageListProps = {
    chat: MessageModel[],
}

export function MessageList({chat} : MessageListProps){
    return(
        <section className="message-list">
            <ul>
                {
                    chat.map((message, index) => <li key={message._id} 
                    style={{backgroundColor: (index % 2 === 0) ? '#CCCCCC' : '#9E9E9E'}}>
                        <p>{`${message.sentBy}: ${message.text}`}</p>
                    </li>)
                }
            </ul>
        </section>
    )
}