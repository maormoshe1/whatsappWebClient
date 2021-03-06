    import $ from 'jquery';
    import * as signalR from '@microsoft/signalr';
    
    var myServer = 'localhost:7132';
    const curIdContact ='';
    function GetDname(token,setDname){
        $.ajax({
            url: 'https://'+myServer+'/api/Users/displayname',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+token)
            },
            data: {},
            success: function (data) {setDname(data);},
            error: function () {},
        });     
    }
    
    function GetMessages(token,id,setMessages){
        console.log('https://'+myServer+'/api/contacts/'+id+'/messages')
        $.ajax({
            url: 'https://'+myServer+'/api/contacts/'+id+'/messages',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+token)
            },
            data: {},
            success: function (data) {setMessages(data);},
            error: function () {},
        });
    }

    function GetContacts(token,setContactList){
        $.ajax({
            url: 'https://'+myServer+'/api/contacts',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+token)
            },
            data: {},
            success: function (data) {setContactList(data)},
            error: function () {},
        });
    }

    function PostLogin(username,password,history){
        $.ajax({
			url:'https://'+myServer+'/api/Users/login?username='+username+'&password='+password,
			type: 'POST',
			contentType: 'application/json',
			success: function (data) {
				localStorage.setItem('token',data);
                localStorage.setItem('username', username);
				history.push("/chat_page");
			},
			error: function() {
				document.getElementById('alert').style.visibility = "collapse";
				document.getElementById('alert').innerHTML = "Incorrect username and / or password";
				document.getElementById('alert').style.visibility = "visible";
			},
		});
    }

    function PostSignUp(usernameR,passwordR,displayName,history){
        $.ajax({
			url:'https://'+myServer+'/api/Users/signup?username='+usernameR+'&password='+passwordR+'&displayname='+displayName,
			type: 'POST',
			contentType: 'application/json',
			success: function (data) {
				localStorage.setItem('token',data);
                localStorage.setItem('username', usernameR);
				history.push("/chat_page");
			},
			error: function() {
				document.getElementById('alert').style.visibility = "collapse";
				document.getElementById('alert').innerHTML = "This username is taken, try another one:)";
				document.getElementById('alert').style.visibility = "visible";

				document.getElementById("usernameR").value = "";
			},
		});
    }
    function PostAddContact(token,id,name,server,setContactList){      
        $.ajax({
            url:'https://'+myServer+'/api/contacts',
            type: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+ token);
            },
            contentType: 'application/json',
            data: JSON.stringify({id: id, name: name, server: server}),
            success: function () {
                document.getElementById('alertSuccess').innerHTML = "Contact added:)";
                document.getElementById('alertSuccess').style.visibility = "visible";
                GetContacts(token,setContactList);
            },
            error: function() {},
        })
    }

    function PostNewMessage(token,curIdContact,content,setMessages,setContactList){
        $.ajax({
            url:'https://'+myServer+'/api/contacts/' + curIdContact + '/messages',
            type: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+ token);
            },
            contentType: 'application/json',
            data: JSON.stringify({content: content}),
            success: function () {
                GetMessages(token,curIdContact,setMessages);
                GetContacts(token,setContactList);
            },
            error: function() {},
        })
    }

    function PostInvitation(token,from,to,dname,server,setContactList){
        //console.log(from);
        //console.log(to);
        //console.log(server);
        $.ajax({
            url:'https://'+server+'/api/invitations',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({from: from, to: to, server: server}), 
            success: function () {
                PostAddContact(token,to,dname,server,setContactList)
            },
            error: function() {
                document.getElementById('alert').innerHTML = "This username does not exist on the server:(";
                document.getElementById('alert').style.visibility = "visible";
            },
        })
    }

    function PostTransfer(from,to,server,content){
        //console.log(from);
        //console.log(to);
        //console.log(server);
        $.ajax({
            url:'https://'+server+'/api/transfer',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({from: from, to: to, content: content}), 
            success: function () {},
            error: function() {},
        })
    }

    function SignalR(setConnection){
        const newConnection = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Debug)
        .withUrl('https://'+myServer+'/myHub', {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        }).build();
        setConnection(newConnection);
    }
    const Queries = {GetDname: GetDname, GetMessages: GetMessages, GetContacts: GetContacts, PostInvitation: PostInvitation,
    PostLogin: PostLogin, PostSignUp: PostSignUp, PostNewMessage: PostNewMessage, PostTransfer: PostTransfer,
    SignalR: SignalR, curIdContact: curIdContact};
export default Queries;