import { Menu } from 'antd';
import { Link } from "react-router-dom";
import UserContext from '../contexts/user';
import React, {  useContext, useState, useEffect } from 'react';



/**
 * Renders a <Nav /> component for the navigation menu.
 * @params props
 */
function Nav(props) {
		const logout = useContext(UserContext);
		
		
	
	
	
	
  return (  
    
  <UserContext.Consumer>
   
      {({logout, user}) => (

    <>
     
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" >Home<Link to="/"></Link></Menu.Item>
        <Menu.Item key="2" >Dashboard<Link to="/dashboard"></Link></Menu.Item>
        <Menu.Item key="3" >About<Link to="/about"></Link></Menu.Item>
        <Menu.Item key="4" onClick={logout} type="primary"  >{user.loggedIn&&<Link to="/">Logout</Link>}
        </Menu.Item><Menu.Item key="5" onClick={logout} type="primary"  >{user.loggedIn&&<Link to="/img_Page">UploadImage</Link>}
        </Menu.Item>
        </Menu>  
   </>
      )}
</UserContext.Consumer>

  );

}

export default Nav;