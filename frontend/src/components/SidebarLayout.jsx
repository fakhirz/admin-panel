import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faFileCirclePlus, faTableColumns, faSliders, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import classes from './SidebarLayout.module.css';

const Sidebar = () => {
	return (
		<div className={classes.sidebar}>
			<div className={classes.logo}><FontAwesomeIcon icon={faLaptopCode} style={{ marginRight: '3px' }} /> Admin Panel</div>

			<NavLink to="/" className={({ isActive }) => (isActive ? classes.active : undefined)} end>
				<FontAwesomeIcon icon={faHouseChimney} style={{ marginRight: '3px' }} /> Dashboard
			</NavLink>
			<NavLink to="/collections" className={({ isActive }) => (isActive ? classes.active : undefined)} end>
				<FontAwesomeIcon icon={faFileCirclePlus} style={{ marginRight: '3px' }} /> Collections
			</NavLink>
			<NavLink to="/forms" className={({ isActive }) => (isActive ? classes.active : undefined)} end>
				<FontAwesomeIcon icon={faTableColumns} style={{ marginRight: '3px' }} /> Forms
			</NavLink>
			<NavLink to="/settings" className={({ isActive }) => (isActive ? classes.active : undefined)} end>
      <FontAwesomeIcon icon={faSliders} style={{ marginRight: '3px' }} /> Settings
			</NavLink>
		</div>
	);
};

export default Sidebar;
