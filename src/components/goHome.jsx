import React from 'react';
import '../App.css';
import { Button } from 'antd';
import {useNavigate } from 'react-router-dom';
import { RollbackOutlined } from '@ant-design/icons';
import UserContext from '../contexts/user';

function GoHomeButton(props) {
 let navigate =useNavigate();
 

  function handleClick() {
    navigate(-1)
  }
  return (
    
    <Button type="primary" style={{color:"black",background: "#73d13d"}} 
						icon={<RollbackOutlined />} onClick =  {handleClick} > </Button>
 )
}
export default GoHomeButton;

