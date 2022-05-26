import './ChatItem.css';
import MessageList from '../messages/MessageList'
import { useRef, useEffect, useState } from 'react';
import CurrentSession from './CurrentSession';
import Queries from '../Queries';


function ChatItem({ token, messages, server, curIdContact, curNameContact, setMessages, setContactList }) {

    const msg = useRef(null);
    const [ connection, setConnection ] = useState(null);
    

    useEffect(() => {
        Queries.SignalR(setConnection);    
    }, []);    

    useEffect(() => {     
        if (connection) { 
            connection.start().then(() => {   
                    connection.on("ChangeRecieved", function(id,curIdContact) 
                    {
                        var username = localStorage.getItem("username");
                        if(curIdContact == username){
                            if(Queries.curIdContact == id)
                                Queries.GetMessages(token,id,setMessages);
                            
                            Queries.GetContacts(token,setContactList);
                        }                                          
                     });
                }).catch(e => console.log('Connection failed: ', e));                                               
            }
    }, [connection]);

    const handleSend = (content) => {
        if ((content != "") ) {
            var username = localStorage.getItem("username");
            Queries.PostNewMessage(token,curIdContact,content,setMessages,setContactList);
            Queries.PostTransfer(username,curIdContact,server,content);
            connection.invoke("Changed",username,curIdContact);
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