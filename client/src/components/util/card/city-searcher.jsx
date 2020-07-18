import React, {useState, useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField, CircularProgress } from '@material-ui/core';
import Services from '../../../services/services';

const CitySearcher = ({onSubmit, onBlur}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [id, setId] = useState(0);

  useEffect(() =>  {
    if (!loading) return; 

    const getData = async() => {
      return await Services.getWeather({locId: id});
    };

    onSubmit(getData());
    setLoading(false);
    
  }, [loading, id]);

  const cities=[
    { name: 'Melbourne',
      country: 'AU',
      id: 2158177,
    },
    { 
      name: 'Melbourne',
      country: 'US',
      id: 4163971,
    },
    {
      name: 'Sydney',
      country: 'AU',
      id: 2147714,
    },
    {
      name: 'Toronto',
      country: 'CA',
      id: 6167865,
    },
  ]

  function createLabel({name, country}) {
    return `${name}, ${country}`;
  }

  const setLocation = (newId) => {
    setId(newId);
    setLoading(true);
  }

  return (
    <div className="card search-card">
      <Autocomplete
        options={cities}
        getOptionLabel={(option) => createLabel(option)}
        autoHighlight
        style={{ width: '100%' }}
        loading={loading}
        renderInput={(params) => 
          <TextField 
            {...params}
            value={value}
            autoFocus={true}
            onBlur={() => onBlur()}
            style={ { width: '90%', paddingTop: '1rem'}}
            placeholder="Enter city name..."
            onChange={(event) => setValue(event.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        }
        onChange={(e, value) => setLocation(value.id)}
      />
    </div>
  );
}

export default CitySearcher;