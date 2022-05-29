import React from 'react';
import { Col, Row } from 'antd';
import PostCard from './postcard';
import { status, json } from '/utilities/requestHandlers';
import { useState, useEffect } from 'react';

function BlogGrid(props) {

  const [posts, setposts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParam] = useState(["title"]);
  const [All,setAll] = useState([]);

useEffect(() => {

    console.log('component mounted!')
    fetch('https://Rest-API-andDB.RealCHBBQ.repl.co/api/v1/dogs')
      .then(status)
      .then(json)
      .then(data => {
       setposts(data)
       setAll(data)
      })
      .catch(err => console.log("Error fetching articles", err));
  }, [])

  

  function handleChange(event) {
    setSearch(event.target.value)

  }

  const cardList = posts.filter(post=>post.title.includes(search)).map(post => {
    return (
      <div style={{ padding: "10px" }} key={post.id} >
        <Col span={6}>

          <PostCard {...post} />


        </Col>
      </div>
    )
  });

 const menuItems = [...new Set(posts.map((Val) => Val.title))];

return(
  <>
      <button
          onClick={() => setposts(All)}
        >
          All
        </button>
    
      {menuItems.map((Val, title) => {
          return (
            <button
              key={title}
              onClick={()=>setposts(posts.filter(post=>post.title.includes(Val)))}
            >
              {Val}
            </button>
          );
        })}
    
        <input 
          type="search" 
          placeholder="Search" 
          aria-label="Search"  
          id="search-form"  
          name="search-form"  
          value={search}
          onChange={handleChange} />

      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    </>
  );
}


export default BlogGrid;
