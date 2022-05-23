import './Message.css';

function Message({msg}) {
  var msgTime = msg.created.substring(11,16);
  if (msg.sent) {
    return (
      <div className="grid">
        <p id="text-msg" >
          <text className='msg-text'> {msg.content} </text>
          <small className="text-muted">{msgTime}</small>
        </p>
      </div>
    );
  }
  else {
    return (
      <div className="grid">
        <p id="reciveMsg-text" >
          <text className='msg-text'> {msg.content} </text>
          <small className="text-muted"> {msgTime}</small>
        </p>
      </div>
    );

  }
}


export default Message;