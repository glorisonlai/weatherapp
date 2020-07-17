import React, {useState, useEffect} from 'react';
import Card from './card/card';
import Services from '../../services/services';

const CardRow = () => {
  const [idList, changeIdList] = useState(() => {
    // const savedList = JSON.parse(window.localStorage.getItem('saved-ids'));
    // console.log('savedlist', savedList);

    // const savedWeather = async (savedList) => {
    //   const validIds = savedList.filter(id => typeof(id) == 'number');
    //   const dataList = await Promise.all(validIds.map((id) => Services.getWeather({locId: id})));
    //   return dataList;
    // };

    // return !!savedList && savedList.length > 0 ? await savedWeather(savedList) : [];
    return [];
  });

  useEffect(() => {
    window.localStorage.setItem('saved-ids', JSON.stringify(idList.map((data) => data.id)));
  });

  const onDelete = (index) => {
    changeIdList(idList.filter((_,i) => i !== index));
  };

  const onAdd = (data, index) => {
    changeIdList( index < idList.length ? [...idList.slice(0,index), data, ...idList.slice(index+1)] : idList.concat([data]));
  };
  
  console.log('outside', idList);

  return (
    <div 
      className="card-row body"
    >
      {idList.length > 0 && 
        idList.map((data, index) => <Card onDelete={(index) => onDelete(index)} onAdd={(data, index) => onAdd(data, index)} initData={data} index={index}/>
        )
      }
      {idList.length < 10 &&
        <Card onAdd={(data, index) => onAdd(data, index)} index={idList.length}/>
      }
    </div>
  );
};

export default CardRow;