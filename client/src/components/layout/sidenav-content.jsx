import React, { useEffect } from 'react';
import Switch from 'react-switch';
import useGlobalState from '../../services/configContext'

const SideNavContent = () => {
  const [unit, changeUnit] = useGlobalState();

  useEffect(() => {
    window.localStorage.setItem('degree-unit', unit);
  }, [unit]);

  const unitToBool = (unit) => {
    return unit === 'C' ? true : false;
  }

  const boolToUnit = (bool) => {
    return bool ? 'C' : 'F';
  }

  const styles={
    divider:{
      margin: '8px 0',
      height: 1,
      backgroundColor: '#c0c0c066'
    }, 
    unit:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90%",
        fontSize: 25,
        paddingRight: 2
    },
    text:{
      float: "left",
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      fontSize: 25,
      paddingLeft: '1rem',
    }
  }

  return (
    <div>
      <label style={{width: '100%'}}>
        <h3>Options</h3>
      </label>
      <div style={styles.divider} />
      <div>
        <b style={styles.text}>Unit</b>
        <Switch
          checked={unitToBool(unit)}
          onChange={(checked) => changeUnit(boolToUnit(checked))}
          handleDiameter={28}
          offColor="#00539c"
          onColor="#eea47f"
          offHandleColor="#eea47f"
          onHandleColor="#00539c"
          height={40}
          width={70}
          className="unit-switch"
          checkedIcon={<b style={styles.unit}>C</b>}
          uncheckedIcon={<b style={styles.unit}>F</b>}
        />
      </div>
    </div>
  );
};

export default SideNavContent;