import React from 'react';
import articles from '../data/articles.json';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

function DetailArticle(props) {
	var { id } = useParams();
	if(!id)id=1; // set default id=1
	const navigate = useNavigate();
  const keys = Object.keys(articles)
  const values = Object.values(articles)  
  var match=0; // set matching flag
/**  
 
for(var i=0; i<values.length;i++){
   console.log("keys[i] ", keys[i])
   console.log("values[i] ", values[i])
}
console.log("values[0]  keys ", Object.keys(values[0])) 
  
*/
  
 
  
  
for (var i = 0; i < values.length; i++) {
 
/*
    console.log('[i]= ', i);
		console.log('articles[i].id= ',values[i].id);
		console.log('articles.length= ', values.length);
		console.log('articles.title= ', values[i].title)
    console.log('articles.fullText= ', values[i].fullText) 
		console.log('[id]= ',  id);
*/
		if (articles[i].id ==  id) {
      match=1
			return (
				<>
         <h1 style={{ color: 'red' }}> Welcome to Blog Dashboard</h1>   
					<h2>{values[i].title}</h2>

					<p style={{ color: 'green' }}>{values[i].fullText}</p>
          <p style={{ color: 'cyan' }}>{values[i].description}</p>
					<Button
						type="primary"
						icon={<RollbackOutlined />}
						onClick={() => navigate(-1)}
					/>
				</>
			);
		}  
	}
  if(values.length==0||match==0)
   {
			return (
				<>
					<p>Nothing Found</p>{' '}
					<Button
						type="primary"
						icon={<RollbackOutlined />}
						onClick={() => navigate(-1)}
					/>
				</>
			);
			}
}
export default DetailArticle;


