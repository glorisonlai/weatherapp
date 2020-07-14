import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
//import { getLocWeather } from '../../transport';

const WeatherCard = observer(({savedLoc}) => {
  const [location, setLocation] = useState(savedLoc);

	if (!!location){
    useEffect(
		  getLocWeather(
        {
          location,
        }
      ).then(
        setLocation(location)
      )
    );
  }

	const getLocWeather = async() => {
    const res = await fetch("http://localhost:9000/weather");
    console.log(location, res)
	}

  return (
    <div className='card'>
      <p>{location}</p>
    </div>
  );
});

export default WeatherCard;