import React, {useState, useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField, CircularProgress } from '@material-ui/core';
import Services from '../../../services/services';

const CitySearcher = ({onSubmit, onBlur, initVal}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [id, setId] = useState(0);
  const [cities, setCities] = useState([]);

  useEffect(() =>  {
    if (!loading) return; 

    const getData = async() => {
      return await Services.getWeather({locId: id});
    };

    onSubmit(getData());
    setLoading(false);
    
  }, [loading, id]);

  useEffect(() => {
    if (value.length < 2) return;

    const getCities = async() => {
      setCities(await Services.getCities({query: value}));
    }

    getCities();
    setCities([]);
  }, [value])

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
        onChange={(e, value) => !!value ? setLocation(value.id) : null}
      />
    </div>
  );
}

export default CitySearcher;