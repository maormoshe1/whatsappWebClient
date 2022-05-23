import './App.css';
import ChatPage from './chat/ChatPage';
import Login from './login/Login';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import AddContact from './contact/AddContact';


function App() { 
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Login/>} />
        <Route exact path="/login" component={() => <Login/>} />
        <Route exact path="/chat_page" component={() => <ChatPage />} />
        <Route exact path="/add" component={AddContact} />
      </Switch>
    </Router>
    
  );
}

export default App;
