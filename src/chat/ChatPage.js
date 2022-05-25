
import ChatItem from '../chat/ChatItem'
import ContactList from '../contact/ContactList';
import { useState, useEffect } from 'react';
import './ChatPage.css';
import AddContact from '../contact/AddContact';
import '../Queries'
import Queries from '../Queries';



function ChatPage() {

    const token = localStorage.getItem("token");

    const [dname, setDname] = useState('');

    const [server, setServer] =useState('');
    
    const [contactList, setContactList] = useState([]);

    const [messages, setMessages] = useState(() => { return [] })

    const [curNameContact, setCurNameContact] = useState('')

    const [curIdContact, setCurIdContact] = useState('');



    const ShowCurSession = function (id, name, server) {
        setCurNameContact(name);
        setCurIdContact(id);
        setServer(server);
        Queries.curIdContact = id;
        Queries.GetMessages(token,id,setMessages);
    }
 
    useEffect( () =>{
        Queries.GetDname(token,setDname);
    })
      
    useEffect( () =>{
        Queries.GetContacts(token,setContactList);
    })
  
  
    return (
        <div className="container">
            <img className='background' src="Images/registerBackground.png" />

            <div className="row myCan">
                <div className="col-4" >
                    <div id="settings">
                        <div className="d-flex align-items-center">
                            <div className="col-md-4">
                                <img id="profile" src="Images/anonymous.png"></img>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <i id="add_contact" type="button" className="bi bi-person-plus-fill"
                                     data-bs-toggle="modal" data-bs-target="#exampleModal"/>
                                    <h3 className="contact-name">{dname}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ContactList id="Contacts" contacts={contactList} ShowCurSession={ShowCurSession}/>
                    </div>
                </div>
                <div className="col-8">
                    <AddContact token={token} contacts={contactList} setContactList={setContactList}/>
                    <ChatItem token={token} messages={messages} server={server} curNameContact={curNameContact}
                      curIdContact={curIdContact} setMessages={setMessages} setContactList={setContactList} />
                </div>
            </div>
            
        </div>
    );
}

export default ChatPage;