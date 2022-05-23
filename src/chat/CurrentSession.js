import './ChatItem.css'

function CurrentSession({uname}) {
    return (
        <div id="settings">
            <div className="d-flex align-items-center ">
                <div>
                    <img id="profile2" src="Images/anonymous.png"></img>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="contact-name">{uname}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentSession;
