
import users from '../hard_coded/users'
import ChatItem from '../chat/ChatItem'
import ContactList from '../contact/ContactList';
import { useState, useEffect } from 'react';
import './ChatPage.css';
import AddContact from '../contact/AddContact';


function ChatPage() {
    const user = users.find((user) => {
        return user.uname == localStorage.getItem("userName")
    })

    //const token = localStorage.getItem("token");
    
    const [dname, setDname] = useState('');
    
    const [contactList, setContactList] = useState([]);

    const [messages, setMessages] = useState(() => { return [] })

    const [curNameContact, setCurNameContact] = useState('')

    const [curIdContact, setCurIdContact] = useState('')


    const ShowCurSession = function (id, name) {
        setCurNameContact(name);
        setCurIdContact(id);
        GetMessages(id);
    }
    const GetMessages = function(id){
        fetch('https://localhost:7132/api/contacts/'+id+'/messages')
        .then(res => res.json()).then(data => setMessages(data));
    }
    const GetContacts = function(){
        fetch('https://localhost:7132/api/contacts')
        .then(res => res.json()).then(data => setContactList(data));
    }
    // const GetDname = function(){
    //     fetch('https://localhost:7132/api/Users')
    //     .then(res => res.json()).then(data => setDname(data))
    // }
    const Show_contactList = function(){
	useEffect(async () =>{
		const res = await fetch ('https://localhost:7132/api/contacts')
		const data = await res.json();
        console.log(data);
		setContactList(data);
	}, [])}

    // const Show_contactList = function(){
    //    fetch ('https://localhost:7132/api/contacts',{
    //             method: 'GET',
    //             headers: {
    //             'Authorization': 'Token ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCYXoiLCJqdGkiOiIyYmQ5YzMzNS05OGJjLTQ1YTItOGVkYy1mNTQ3NmUwMGFlYmMiLCJpYXQiOiIyMi8wNS8yMDIyIDIwOjQ5OjA4IiwiVXNlcklkIjoiTmlrb2wiLCJleHAiOjE2NTMyNTM3NDgsImlzcyI6IkZvbyIsImF1ZCI6IkJhciJ9.HZRAuk0BpomSiSb1WwNMLifyYYEWb0x3xMJZfEznwZM',
    //             'Content-Type': 'application/json'
    //         }}).then(res => res.json()).then(data => setContactList(data));
    //     }
        
    //GetDname();
    Show_contactList();
   
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
                                    <h3 className="contact-name">{user.dname}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ContactList id="Contacts" contacts={contactList} ShowCurSession={ShowCurSession}/>
                    </div>
                </div>
                <div className="col-8">
                    <AddContact contacts={contactList} GetContacts={GetContacts}/>
                    <ChatItem messages={messages} curNameContact={curNameContact}  curIdContact={curIdContact}
                    GetMessages={GetMessages} GetContacts={GetContacts}  />
                </div>
            </div>
        </div>
    );
}

export default ChatPage;