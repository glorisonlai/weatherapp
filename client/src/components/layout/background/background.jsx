import React, {useState} from 'react';
import './background.css';

const Background = () => {
  const [loaded, setLoaded]  = useState(false);

  return (
    <div className="bg">
      <img className="img fade-in" 
        style={loaded ? {} : {display: 'none'}}
        src={require('../../../assets/img/main-bg.jpg')} 
        alt="" 
        onLoad={()=>setLoaded(true)}
      />
    </div>
  );
}

export default Background;