import { MessageModel } from "../../models/message.model.ts"

type MessageListProps = {
    chat: MessageModel[],
}

export function MessageList({chat} : MessageListProps){
    return(
        <section className="message-list">
            <ul>
                {
                    chat.map(message => <li key={message.id}>
                        <p>{`${message.username}: ${message.text}`}</p>
                    </li>)
                }
            </ul>
        </section>
    )
}