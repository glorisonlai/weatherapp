import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SideNavContent from './sidenav-content';
import Sidebar from 'react-sidebar';
// import {BrowserView, MobileView, isMobile} from 'react-device-detect';

const Navbar = (props) => {
	const [sidebarStatus, setSidebarStatus] = useState(false)
		
	const toggleSidebar = () => {
		setSidebarStatus(!sidebarStatus);
	};

	const TopNavbar = () => {
		return (
			<nav className={'navbar fixed-top unselectable'} style={{ width: '100vw' }} >
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a
					className="side-toggler"
					data-toggle="sideNav"
					data-target="#sideNav"
					style={{cursor: 'pointer'}}
					onClick={() => toggleSidebar()}
				>
					<FontAwesomeIcon icon={['fas', 'bars']} size="lg"/>
					<h2 className="title">Weather</h2>
				</a>
			</nav>
		);
	}

	return(
		<div className="navUI">
			<TopNavbar />
				<Sidebar 
					sidebar={<SideNavContent />}
					open={sidebarStatus}
					onSetOpen={() => toggleSidebar()}
					sidebarClassName="sideNavBar"
					docked={false}
					transitions={true}
				> </Sidebar>
		</div>
	);
}

export default Navbar;