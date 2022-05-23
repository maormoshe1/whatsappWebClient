import LastMessage from '../messages/LastMessage';
import './ContactItem.css';



function ContactItem({id, name, lastMsg, lastMsgDate, ShowCurSession}) {

    return (
        <div onClick={() => { ShowCurSession(id, name) }} className="row contact-chat">
            <div className="d-flex align-items-center">
                <div className="col-md-4">
                    <img src="Images/anonymous.png" id='chatPic'></img>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="contact-name">{name}</h5>
                        <LastMessage lastMsg={lastMsg} lastMsgDate={lastMsgDate}/>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ContactItem;