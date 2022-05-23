import './ChatItem.css';
import MessageList from '../messages/MessageList'
import { useRef, useState } from 'react';
import CurrentSession from './CurrentSession';

function ChatItem({ messages, curIdContact, curNameContact, GetMessages, GetContacts }) {

    let today = new Date();
    const msg = useRef(null);

    const [messageList, setMessageList] = useState(messages);
    
    const getTime = function () {
        let h = today.getHours();
        let m = today.getMinutes();
        if (h < 12) {
            h = '0' + h;
        }
        if (m < 10) {
            m = '0' + m;
        }
        return h + ":" + m
    }

    const handleSend = (content) => {
        if ((content != "") ) {
            fetch ('https://localhost:7132/api/contacts/' + curIdContact + '/messages',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({content: content})
            }).then(res => {
                if(res.ok){  
                    GetMessages(curIdContact);
                    GetContacts();
                }
            })
            document.getElementById("toSendField").value = "";
            document.getElementById("messagesDiv").scrollTop = document.getElementById("messagesDiv").scrollHeight;
        }
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