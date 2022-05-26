function LastMessage({ lastMsg, lastMsgDate }) {
    var lastMessage = "", lastMessageDate = "";
    if (lastMsg != null) {
        console.log(lastMsg.length)
        if(lastMsg.length > 20){   
            lastMessage = lastMsg.substring(0,20)+"...";
            console.log(lastMessage)
        }        
        else{
            lastMessage = lastMsg;
        }       
        lastMessageDate = lastMsgDate.substring(11,16);
    }

    return (
        <>
            <p className="contact-msg">{lastMessage}</p>
            <p className="send-time"><small className="text-muted">{lastMessageDate}</small></p>
        </>
    );

}

export default LastMessage;