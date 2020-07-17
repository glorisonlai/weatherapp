import React, {useState} from 'react';
import './background.css';

const Background = () => {
  const [loaded, setLoaded]  = useState(false);
  const screenWidth = window.screen.width,
        screenHeight = window.screen.height;

  const imgStyle= {
      display: 'block',
      height: 'auto',
      width: 'auto',
  };

  return (
    <div className="bg">
      <div style={loaded ? {} : {display: 'none'}}>
        <img className="bg fade-in" 
          src={require('../../../assets/img/main-bg.jpg')} 
          alt="" 
          onLoad={()=>setLoaded(true)}
          style={{...imgStyle, maxWidth:screenWidth, maxHeight:screenHeight}}
        />
      </div>
    </div>
  );
}

export default Background;