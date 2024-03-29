import React, {useState, createContext, useContext} from 'react';

// Create Global var Unit -> Changes in option are reflected through app
const localUnit = window.localStorage.getItem('degree-unit');

const savedUnit = !!localUnit && 'FC'.includes(localUnit) ? localUnit : 'C';

window.localStorage.setItem('degree-unit',savedUnit);

const GlobalStateContext = createContext(savedUnit);
const DispatchStateContext = createContext(undefined);

const GlobalStateProvider = ({children}) => {
  const [unit, changeUnit] = useState(savedUnit)
  return (
    <GlobalStateContext.Provider value={unit}>
      <DispatchStateContext.Provider value={changeUnit}>
        {children}
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  )
};

const useGlobalState = () => [
  useContext(GlobalStateContext),
  useContext(DispatchStateContext),
]

export {GlobalStateProvider}

export default useGlobalState