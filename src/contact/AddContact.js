import { useRef } from "react";
import Queries from "../Queries";

function AddContact({token, contacts, setContactList}) {
    const new_contact_id = useRef(null);
    const new_contact_name = useRef(null);
    const new_contact_server = useRef(null);
    

    const Add_contact = function () {

        var existInChat = false;
        var id = new_contact_id.current.value;
        var name = new_contact_name.current.value;
        var server = new_contact_server.current.value;

        document.getElementById('alertSuccess').style.visibility = "collapse";
        document.getElementById('alert').style.visibility = "collapse";
        
        if(id == "" || name == "" || server == ""){
            document.getElementById('alert').innerHTML = "Please, enter all details";
            document.getElementById('alert').style.visibility = "visible";
            return;
        }

        for (let contact of contacts) {
            if (contact.id == id) {
                existInChat = true;
            }
        }

        if (!existInChat) {
            Queries.PostAddContact(token,id,name,server,setContactList)
        }
        else{
            document.getElementById('alert').innerHTML = "This user is already in your chats ;)";
		    document.getElementById('alert').style.visibility = "visible";
        }       
    }
        

    const closeAlert = function() {
		document.getElementById('alert').style.visibility = "collapse";
        document.getElementById('alertSuccess').style.visibility = "collapse";
        new_contact_id.current.value = "";
        new_contact_name.current.value = "";
        new_contact_server.current.value = "";
	}

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add new Contact</h5>
                            <button onClick={() => { closeAlert() }}type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <p>
                                <input id="new_username" ref={new_contact_id} placeholder="Exact contact's identifier" />
                            </p>
                            <p>
                                <input id="new_username" ref={new_contact_name} placeholder="Contact's display name" />
                            </p>
                            <p>
                                <input id="new_username" ref={new_contact_server} placeholder="Contact's server" />
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => { Add_contact() }} type="button" id="AddBtn" className="btn btn-primary" >Add</button>
                            <div className="alert alert-warning" role="alert" id='alert'/>
                            <div className="alert alert-success" role="alert" id='alertSuccess'/>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AddContact;