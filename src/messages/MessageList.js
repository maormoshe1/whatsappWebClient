import Message from "./Message";
import './Message.css'
function MessageList({ messages}) {

    var messageList = [];
    if(messages.length != 0) { 
        messageList = messages.map((message, key) => {
            return <Message msg={message}  key={key} />
        });
    }

    return (
        <div>
            {messageList}
        </div>
    )
}

export default MessageList;