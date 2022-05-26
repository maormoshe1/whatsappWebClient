function LastMessage({ lastMsg, lastMsgDate }) {
    var lastMessage = "", lastMessageDate = "";
    if (lastMsg != null) {
        console.log(lastMsg.length)
        if(lastMsg.length > 35){
            
            lastMessage = lastMsg.substring(0,35)+"...";
        }        
        else{
            lastMessage = lastMsg;
        }       
        lastMessageDate = lastMsgDate.substring(11,16);
    }

    return (
        <>
            <p className="contact-msg">{lastMsg}</p>
            <p className="send-time"><small className="text-muted">{lastMessageDate}</small></p>
        </>
    );

}

export default LastMessage;