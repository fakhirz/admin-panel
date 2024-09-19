import React from 'react';
import '../assets/styles.css';
import Button from '../components/Button';
import Form from '../components/Form';
import Header from '../components/Header';
import InputField from '../components/InputField';

const Dashboard = () => {
	return (
		<div className="app-container">
			<div className="content">
				<Header>Home</Header>
				<div className="form-container">
					<Form/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
