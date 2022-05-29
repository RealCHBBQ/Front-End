import React from 'react';
import {  Layout,Space } from 'antd';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home';
import Nav from './components/nav';
import About from './components/about';
import Dashboard from './components/dashboard';
import DetailArticle from './detailarticle';
import Account from './components/account';
import Login from './components/login';
import Img_Page from './components/img_Page';
import Register from './components/register';
import UserContext from './contexts/user';
import {useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Button} = Layout;



class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    user: {loggedIn: false, password:"",    registerOK:false, userID:''}
  }
  
  this.login = this.login.bind(this);
  this.logout = this.logout.bind(this);
  this.regComplete = this.regComplete.bind(this);
}
   

login(user) {

  console.log("i m setting context")
  user.loggedIn = true;
  user.passward=user.password; 
  this.setState({user:user});
  console.log("User is now being set on the context ", this.state.user);
  
}

logout() {
  console.log("Removing user from the app context");
  this.setState({user: {loggedIn:false}});
}   
  
regComplete() {
  console.log("Registration completed");
  this.setState({user: {registerOK:true}});
}   
  
  render(){
  const context = {
  user: this.state.user,
  login: this.login,
  logout: this.logout,
  regComplete:this.regComplete}; 
  
    
  return(
   
    <Layout className="layout">
    <UserContext.Provider value= {context}>  	
     <Router>
				<Header> 
        <Nav/>
        </Header> 
	      <Content style={{ padding: '0 50px', height: '90%' }}>
        <Space>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/about">About</Link>
  
          {!context.user.loggedIn&& <Link to="/login">Login</Link>}           {context.user.loggedIn&& <Link to="/account" style={{color:"red",background: "#91d5ff"}} type ="link" > Account: {context.user.username}  </Link>} 
          {!context.user.registerOK&&!context.user.loggedIn&&<Link to="/register">Register</Link>}			      
        </Space>
                       			
				<Routes>
						<Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
						<Route path="/dashboard/:id" element={<DetailArticle />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login"element={<Login />} />
						<Route path="/about" element={<About />} />	
            <Route path="/account" element={<Account />} />	
            <Route path="/img_Page" element={<Img_Page />} />	
				</Routes>			
				</Content>
				
       <Footer>
					<p style={{ color: 'green' }}>VT6003CEM Demo</p>
				</Footer>
			</Router>	
  </UserContext.Provider>  
  </Layout> 
  );
 }
}
  
  
export default App;

