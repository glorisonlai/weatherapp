import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';

//TODO: - Fix spacing issues

const Navbar = () => {
	const [sidebarStatus, setSidebarStatus] = useState(0);
	
	const toggleSidebar = () => {
		setSidebarStatus(!sidebarStatus);
	};

  return (
    <header className='navbar fixed-top'>
      <a
				className="side-toggler"
				data-toggle="sideNav"
				data-target="#sideNav"
				style={{cursor: 'pointer'}}
				onClick={() => toggleSidebar()}
      >
				<FontAwesomeIcon icon={faBars} size="lg"/>
				Weather App
			</a>
	</header>
  )
}

export default Navbar;