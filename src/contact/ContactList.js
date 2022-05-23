import ContactItem from "./ContactItem";
import users from "../hard_coded/users";
import "./ContactItem.css"

function ContactList({contacts, ShowCurSession}){
    const contactList = contacts.map((contact,key)=>{    
        return <ContactItem id={contact.id} name={contact.name} lastMsg={contact.last} lastMsgDate={contact.lastdate}
        ShowCurSession={ShowCurSession}  key={key}/>
        });

        return(
            <div className="chats overflow-auto">
                {contactList}        
            </div>

        )

}

export default ContactList;