import React from 'react';
import { Link} from 'react-router-dom'; 
import { Card, Col,  Row}  from  'antd'; 
import articles from '../data/articles.json'


function Article() { 
return (
  <Row    justify="space-around">
 {
  articles&&articles.map(({id, title, fullText})=> (
  <Col span={8}>
  <Card key={id} title={title} style={{  width:  300, color: 'purple'  }}  >
  <p>{fullText}</p>
  <p></p>
  <Link   to={ `/dashboard/${id}` }>Details</Link>
  </Card>
  </Col>))
 }
</Row>
);
}
export default Article;
