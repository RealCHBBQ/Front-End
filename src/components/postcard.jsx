import React from 'react';
import { Card } from 'antd';
import PostIcon from './posticon';
const { Meta } = Card;
import { Link} from 'react-router-dom'; 

class PostCard extends React.Component {

  render() {
        return( 
      <Card
        style={{ width: 320 }}
       cover={<img alt="test" src={this.props.imageurl}/>}
 
        hoverable={true}
        actions={[
          <PostIcon type="like" countLink={this.props.links.likes} 
          handleToggle={this.toggleLike} id={this.props.id}
/>,
          <PostIcon type="message" />,
          <PostIcon type="pushpin" />
        ]}>
        
        <Meta title={this.props.title} description={this.props.summary} />
        <p></p>
  <Link   to={ `/dashboard/${this.props.id}` }>Details</Link>
      </Card>
      
    );
  }
}

export default PostCard; 
