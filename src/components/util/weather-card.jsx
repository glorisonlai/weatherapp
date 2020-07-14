import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
//import { getLocWeather } from '../../transport';

const WeatherCard = observer(({loc, index}) => {
  const [location, setLocation] = useState(loc);
  const [cardIndex, setCardIndex] = useState(index);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(!!location);

	if (!!location){
    useEffect(
      setLoading(true),
		  getLocWeather(
        {
          location,
        }
      ).then((res) => {
        if (!!res.success){
          setWeatherData(res.data);
          setLocation(location);
          setLoading(false);
        } else {
          console.log(`Error loading ${location}`)
        }
        setLoading(false);
      })
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