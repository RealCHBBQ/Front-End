import React from 'react';  
  
class Goodbye extends React.Component {  
  
  constructor(props){  
    super(props);  
    this.state = {  
      name : this.props.name,  
      color: "blue"  
    }
    this.setColor = this.setColor.bind(this);  
    this.revertColor = this.revertColor.bind(this);  
  }
 
    setColor(){  
    this.setState({color:"red"});  
  }  
  revertColor(){  
    this.setState({color:"blue"});  
  } 

  render() {  
    return (
 <h1 onMouseEnter={this.setColor} onMouseLeave={this.revertColor}
             style={{color:this.state.color}}>Goodbye {this.props.name}</h1>

    )
  }  
}  
  
export default Goodbye;
