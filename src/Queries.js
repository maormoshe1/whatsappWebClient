

    function GetDname(token,setDname){
        $.ajax({
            url: 'https://localhost:7132/api/Users/displayname',
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
        $.ajax({
            url: 'https://localhost:7132/api/contacts/'+id+'/messages',
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
            url: 'https://localhost:7132/api/contacts',
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
			url:'https://localhost:7132/api/Users/login?username='+username+'&password='+password,
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
			url:'https://localhost:7132/api/Users/signup?username='+usernameR+'&password='+passwordR+'&displayname='+displayName,
			type: 'POST',
			contentType: 'application/json',
			success: function (data) {
				localStorage.setItem('token',data);
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
            url:'https://localhost:7132/api/contacts',
            type: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+ token);
            },
            contentType: 'application/json',
            data: JSON.stringify({id: id, name: name, server: server}),
            success: function () {
                var username = localStorage.getItem(username);
                document.getElementById('alertSuccess').innerHTML = "Contact added:)";
                document.getElementById('alertSuccess').style.visibility = "visible";
                GetContacts(token,setContactList);
                PostInvitation(token,username,id,server);
            },
            error: function() {
                document.getElementById('alert').innerHTML = "There is no user with this username:(";
                document.getElementById('alert').style.visibility = "visible";
            },
        })
    }

    function PostNewMessage(token,curIdContact,content,setMessages,setContactList){
        $.ajax({
            url:'https://localhost:7132/api/contacts/' + curIdContact + '/messages',
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

    function PostInvitation(token,from,to,server){
        $.ajax({
            url:'https://'+server+'/api/invitations',
            type: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+ token);
            },
            data: JSON.stringify({from: from, to: to, server: server}),
            contentType: 'application/json',
            success: function () {
                console.log("success");
            },
            error: function() {},
        })
    }

    const Queries = {GetDname: GetDname, GetMessages: GetMessages, GetContacts: GetContacts, PostAddContact: PostAddContact,
    PostLogin: PostLogin, PostSignUp: PostSignUp, PostNewMessage: PostNewMessage}



export default Queries;