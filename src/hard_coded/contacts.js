import messages from "./messages";

const shirContacts=[{user: 'Maor',dname : 'maori', messages : messages[0]},
{user: 'Daniel',dname : 'danieli', messages : messages[1]},
{user: 'Nikol',dname : 'nik',  messages : messages[2]},
{user: 'Rivka',dname : 'riv',  messages : messages[3]},
{user: 'Miriam',dname : 'miri',  messages : messages[4]}];

const maorContacts=[{user: 'Shir',dname : 'shiri', messages : messages[0]},
{user: 'Nikol',dname : 'nik', messages : messages[5]}];

const danielContacts=[{user: 'Shir',dname : 'shiri', messages : messages[1]}];

const nikolContacts=[{user: 'Shir',dname : 'shiri', messages : messages[2]},
{user: 'Maor',dname : 'maori', messages : messages[5]}];

const rivkaContacts=[{user: 'Shir',dname : 'shiri', messages : messages[3]}];

const miriamContacts=[{user: 'Shir',dname : 'shiri', messages : messages[4]}];

const shalevContacts=[];

const contacts=[shirContacts,maorContacts,danielContacts,nikolContacts,rivkaContacts,miriamContacts,shalevContacts];
export default contacts;