/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useGlobalState from '../../../services/configContext';
import './weather-card.css';

const WeatherCard = ({index, data, onDelete, onEdit}) => {
  const {
    name, country, icon, desc, current, min, max, pressure, humidity, vision, windspeed, winddeg, sunrise, sunset, timezone,
  } = data || '';
  const [unit] = useGlobalState();

  const styles = {
    divider: {
      margin: '10px 0',
      height: 1,
      backgroundColor: '#c0c0c066',
    },
  };

  const convertTemp = (temp) => {
    let cel = temp - 273.15;
    return Math.round(unit === 'C' ? cel : cel*9/5 + 32);
  };

  const convertDist = (metre) => {
    const km = Math.round((metre/1000)*10)/10;
    return metre > 100 ? `${km}km` : `${metre}m`;
  }

  return !!name ? (
    <div className='card weather-card unselectable'>
      <div className='card-head'>
        <a className='name' onClick={() => onEdit(name, country)} >
          <span>{name}</span>
        </a>
        <a className='button' onClick={() => onDelete(index)} >
          <FontAwesomeIcon icon={['fas', 'times']} size={'xs'}/>
        </a>
      </div>
      <div className='card-body'>
        <div className='main'>
          <span className='current'>{convertTemp(current)}&#176;</span>
          <div className='status'>
            <img id='img' src={!!icon ? `http://openweathermap.org/img/wn/${icon}@2x.png` : ''} alt=""/>
          </div>
          <span id='desc' className='capitalize'>{desc}</span>
        </div>
        <div style={styles.divider}/>
        <div className='container'>
          <div className='contain-left'>
            <span>Min</span>
            <span className='stat'>{convertTemp(min)}</span>
          </div>
          <div className='contain-right'>
            <span>Max</span>
            <span className='stat'>{convertTemp(max)}</span>
          </div>
        </div>
        <div style={styles.divider}/>
        <div className='container'>
          <div className='contain-left'>
            <span>Windspeed</span>
            <span className='stat'>
              {windspeed}m/s
              <div style={{transform: `rotate(${winddeg}deg)`}}>
                <FontAwesomeIcon icon={['fas', 'arrow-up']} />
              </div>
              </span>
          </div>
          <div className='contain-right'>
            <span>Visibility</span>
            <span className='stat'>{convertDist(vision)}</span>
          </div>
        </div>
        <div style={styles.divider}/>
        <div className='container'>
          <div className='contain-left'>
            <span>Pressure</span>
            <span className='stat'>{pressure}hPa</span>
          </div>
          <div className='contain-right'>
            <span>Humidity</span>
            <span className='stat'>{humidity}%</span>
          </div>
        </div>
      </div> 
    </div>
  ) : (
    <div className='card weather-card'>
      <div className='card-head'>
        <a className='loading-cont' >
          <span className="loading">Loading</span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </a>
        <a className='button' onClick={() => onDelete(index)} >
          <FontAwesomeIcon icon={['fas', 'times']} size={'xs'}/>
        </a>
      </div>
    </div>
  );
};

export default WeatherCard;