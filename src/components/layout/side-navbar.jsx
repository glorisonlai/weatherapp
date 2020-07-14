import React, { useState } from 'react';
import Switch from 'react-switch';
import Sidebar from 'react-sidebar';

const SideNavBar = () => {
  const [sidebarStatus, setSidebarStatus] = useState(
    window.localStorage.getItem('degree-unit')
  );

  return (
    <Sidebar
      sidebar={
        <div className="divider" />
        <label style={{width: '100%'}}>
          <span>Unit</span>
          <Switch
            onChange={(checked)} />
        </label>
      }
  );
};

export default SideNavBar;