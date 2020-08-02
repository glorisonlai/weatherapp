import React, {useState, useReducer, useEffect} from 'react';
import Card from './card/card';
import Services from '../../services/services';

const reducer = (list, action) => {
  const {type, data, index} = action;
  switch (type) {
    case 'ADD_CARD':
      return( index < list.length ? [...list.slice(0,index), ...data, ...list.slice(index+1)] : list.concat(data));
    case 'REMOVE_CARD':
      return(list.filter((_,i) => i !== index));
    default:
      return data;
  }
}

const CardRow = () => {
  const [idList, changeIdList] = useReducer(reducer, []);
  let startX, scrollLeft;

  useEffect(() => {
    const savedList = JSON.parse(window.localStorage.getItem('saved-ids'));
    if (!savedList || !savedList.length) return;

    const validIds = savedList.filter(id => typeof(id) == 'number');
    
    const saveWeather = async () => {
      const dataList = await Promise.all(validIds.map((id) => Services.getWeather({locId: id})));
      changeIdList({type: 'REPLACE', data: dataList});
    };

    saveWeather();
    changeIdList({type: 'REPLACE', data: validIds});
  }, []);

  useEffect(() => {
    window.localStorage.setItem('saved-ids', JSON.stringify(idList.map((data) => data.id)));
    const target = document.getElementsByClassName('card-row')[0];
    target.scrollLeft = target.scrollWidth;
  }, [idList]);

  const handleChange = ({data, index}) => {
    changeIdList({
      type: !!data ? 'ADD_CARD' : 'REMOVE_CARD',
      data: [data],
      index: index,
    });
  };

  // Click to scroll
  const handleMouseMove = ({clientX}) => {
    const target = document.getElementsByClassName('card-row')[0];
    const newX = clientX - target.offsetLeft;
    const walk = (newX - startX);
    target.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  const handleMouseDown = ({clientX}) => {
    const target = document.getElementsByClassName('card-row')[0];
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    startX = clientX - target.offsetLeft;
    scrollLeft = target.scrollLeft;
  };

  return (
    <div 
      className="card-row body"
      onMouseDown={handleMouseDown}
    >
      {idList.length > 0 && 
        idList.map((data, index) => <Card initData={data} index={index} onChange={(payload) => handleChange(payload)}/>
        )
      }
      {idList.length < 10 &&
        <Card onChange={(payload) => handleChange(payload)}/>
      }
      <div className="placeholder"/>
    </div>
  );
};

export default CardRow;