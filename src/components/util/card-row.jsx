import React from 'react';
import WeatherCard from './weather-card';
import {observer} from 'mobx-react-lite';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CardRow = observer(() => {
  const savedLocs = JSON.parse(window.localStorage.getItem('saved-locs'));
  
  const cachedWeather = () => {
    return savedLocs.slice(60).map(function(loc, index){
      return <WeatherCard params={loc, index} />
    });
  }

  const createCard = () => {
    
  };
  
  return (
    <div className="row">
      {!!savedLocs && savedLocs.length > 0 && 
        cachedWeather()
      }
      {!(savedLocs.length > 60) &&
        <a className="addButton" onClick={()=> createCard()}>
          <div className="card outline">
            <span>
              <FontAwesomeIcon icon={['fas', 'plus-circle']} />
            </span>
          </div>
        </a>
      }
    </div>
  )
});

export default CardRow;