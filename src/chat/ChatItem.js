import './ChatItem.css';
import MessageList from '../messages/MessageList'
import { useRef } from 'react';
import CurrentSession from './CurrentSession';
import Queries from '../Queries';

function ChatItem({ token, messages, curIdContact, curNameContact, setMessages, setContactList }) {

    const msg = useRef(null);
    
    const handleSend = (content) => {
        if ((content != "") ) {
            Queries.PostNewMessage(token,curIdContact,content,setMessages,setContactList)
        }
            document.getElementById("toSendField").value = "";
            document.getElementById("messagesDiv").scrollTop = document.getElementById("messagesDiv").scrollHeight;
        }

    if (curNameContact=="") {
        return (
            <div>
                <img id='background2' src="Images/background.jpg" ></img>
            </div>
        );
    }

    return (
        <div className='chats'>
            <CurrentSession uname={curNameContact} />
            <div className='theChat'>
                <img id='background' src="Images/background.jpg" />
                <div id='messagesDiv' className='message overflow-auto'>
                    <br />
                    <MessageList className='messageBubble' messages={messages} />
                </div>
                <div className='msg-controller'>
                    <i id="send" className="bi-send" onClick={() => { handleSend(msg.current.value) }}/>
                    <input id="toSendField" ref={msg} placeholder='type here...'></input>
                </div>
            </div>

        </div>

    );
}

export default ChatItem;