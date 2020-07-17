/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CitySearcher from './city-searcher';
import WeatherCard from './weather-card';

const Card = ({ onDelete, onAdd, index, initData }) => {
  const [isActive, setActive] = useState(false);
  const [data] = useState(initData);

  const onSubmit = async (data) => {
    onAdd(await data, index);
    setActive(false);
  }

  return (
    isActive ? 
      <CitySearcher onSubmit={(data) => onSubmit(data)} onBlur={() => setActive(false)} />
    : !!data ?
      <WeatherCard index={index} data={data} onDelete={() => onDelete(index)} onEdit={() => setActive(true)}/>
    :
      <a className="card hover-card addButton" onClick={() => setActive(true)}>
        <span id="add-text">
          <FontAwesomeIcon style={{paddingTop:'60%', width: '100%', display: 'inline-block'}} icon={['fas', 'plus-circle']} size="2x"/>
          <p>Add City</p>
        </span>
      </a>
  );
}

export default Card;