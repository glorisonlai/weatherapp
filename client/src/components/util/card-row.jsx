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
  const [scrollX, updateScrollX] = useState({
    startX: null, 
    startScrollX: null
  });
  const savedList = JSON.parse(window.localStorage.getItem('saved-ids'));

  useEffect(() => {
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
    const {startX, startScrollX} = scrollX;
    const newX = startScrollX - clientX + startX;
    window.scrollTo(newX, 0);
    const windowScrollX = window.scrollX;
    if (newX !== window.scrollX) {
      updateScrollX({
        startX: clientX + windowScrollX - startScrollX,
        startScrollX: startScrollX,
      });
    }
  };

  const handleMouseUp = () => {
    if (scrollX.startX) {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      updateScrollX({startX: null, startScrollX: null});
    }
  }

  const handleMouseDown = ({target, clientX}) => {
    if (target.className !== 'card-row body') return;
    window.addEventListener('onmousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    updateScrollX({
      startX: clientX, 
      startScrollX: window.scrollX,
    });
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