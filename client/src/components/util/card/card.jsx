/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CitySearcher from './city-searcher';
import WeatherCard from './weather-card';

const Card = ({ onChange, index, initData }) => {
  const [isActive, setActive] = useState(false);
  const searchVal = !!initData ? { 
    name: initData.name,
    country: initData.country,
    id: initData.id,
  } : '';

  const onSubmit = async (data) => {
    const payload = {data: await data, index: index};
    onChange(payload);
    setActive(false);
  }

  return (
    isActive ? 
      <CitySearcher initVal={searchVal} onSubmit={(data) => onSubmit(data)} onBlur={() => setActive(false)} />
    : !!initData ?
      <WeatherCard index={index} data={initData} onDelete={(index) => onChange({index: index})} onEdit={() => setActive(true)}/>
    :
      <a className="card unselectable hover-card addButton" onClick={() => setActive(true)}>
        <span id="add-text">
          <FontAwesomeIcon style={{paddingTop:'60%', width: '100%', display: 'inline-block'}} icon={['fas', 'plus-circle']} size="2x"/>
          <p>Add City</p>
        </span>
      </a>
  );
}

export default Card;