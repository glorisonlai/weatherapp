import React, {useReducer, useEffect} from 'react';
import Card from './card/card';
import Services from '../../services/services';

const reducer = (list, action) => {
  const {type, data, index} = action;
  switch (type) {
    case 'ADD_CARD':
      return( index < list.length ? [...list.slice(0,index), data, ...list.slice(index+1)] : list.concat([data]));
    case 'REMOVE_CARD':
      return(list.filter((_,i) => i !== index));
    default:
      return list;
  }
}

const CardRow = () => {
  const [idList, changeIdList] = useReducer(reducer, []);

  useEffect(() => {
    // const savedList = JSON.parse(window.localStorage.getItem('saved-ids'));
    // console.log('savedlist', savedList);

    // const savedWeather = async (savedList) => {
    //   const validIds = savedList.filter(id => typeof(id) == 'number');
    //   const dataList = await Promise.all(validIds.map((id) => Services.getWeather({locId: id})));
    //   return dataList;
    // };

    // changeIdList( !!savedList && savedList.length > 0 ? savedWeather(savedList) : [] );
  }, []);

  useEffect(() => {
    window.localStorage.setItem('saved-ids', JSON.stringify(idList.map((data) => data.id)));
  }, [idList]);

  const handleChange = (type, {data, index}) => {
    changeIdList({
      type: type,
      data: data,
      index: index,
    });
  };
  
  console.log('outside', idList);

  return (
    <div 
      className="card-row body"
    >
      {idList.length > 0 && 
        idList.map((data, index) => <Card onChange={(type, payload) => handleChange(type, payload)} initData={data} index={index}/>
        )
      }
      {idList.length < 10 &&
        <Card onChange={(type, payload) => handleChange(type, payload)} index={idList.length}/>
      }
    </div>
  );
};

export default CardRow;