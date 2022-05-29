import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '/utilities/requestHandlers';
import UserContext from '../contexts/user';
import { RollbackOutlined } from '@ant-design/icons';
import  GoHomeButton  from './goHome';

// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const usernameRules = [
    { required: true, message: 'Please input your username!', whitespace: true }
]

/**
 * Login form component for app signup.
 */

class LoginForm extends React.Component {
    constructor(props) {
    super(props);
    this.login = this.login.bind(this);
   
}
      
static contextType = UserContext;  
  
    
  login(values) {
   
    const {username, password} = values;
    console.log(`logging in user: ${username}`)
    fetch('https://Rest-API-andDB.RealCHBBQ.repl.co/api/v1/users/login', {
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(username + ":" + password)
        }        
    })
    .then(status)
    .then(json)
    .then(user => {
        console.log('Logged in successfully');
        console.log("just login  ",user);  
        user.password=password;
        this.context.login(user);  

   //     alert(`Welcome ${username} ! Pls. press green button to continue!!`);
        console.log("alert login  ");       
    })
    .catch(error => {
        // TODO: show nicely formatted error message
        console.log('Login failed');
        alert(`Sorry,  ${username} login failed !`);
    });        
}

  render() 
  { if(this.context.user.loggedIn==true) 
   { //alert("You have already login")
    return(<div>
      <h2>Welcome {this.context.user.username} ! </h2>
     <p> Pls. press green button to continue! <GoHomeButton /> </p> 
    </div>)
      
      }
    else 
     return (
        <Form {...formItemLayout} name="login" scrollToFirstError onFinish={this.login}>
            <Form.Item name="username" label="Username" rules={usernameRules} >
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
           <Button type="primary" htmlType="submit">Login</Button>        
 
           </Form.Item>
        </Form>
        
    );
  };
};

export default LoginForm;
