import React from 'react';
import '../App.css';
import ImageUpload from './ImageUpload'

function Img_Page() {
  return (
    <> 
    <h2 style={{ color: 'green' }}> Upload image to Web API Server </h2>     
           
      <ImageUpload />
    </>
  )
}

export default Img_Page;
