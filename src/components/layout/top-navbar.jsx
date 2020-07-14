import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
				<FontAwesomeIcon icon={['fas', 'bars']} size="lg"/>
				Weather App
			</a>
	</header>
  )
}

export default Navbar;