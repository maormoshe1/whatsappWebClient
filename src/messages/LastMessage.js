function LastMessage({ lastMsg, lastMsgDate }) {
    var lastMessage = "", lastMessageDate = "";
    if (lastMsg != null) {
        lastMessage = lastMsg;
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