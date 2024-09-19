// pages/Collections.js
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFile } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../pages/Collections.css';

const Collections = () => {
	const [ collections, setCollections ] = useState([]);
	// const [ isModalOpen, setIsModalOpen ] = useState(false);

	useEffect(() => {
		const fetchCollections = async () => {
			try {
				const response = await fetch(`http://localhost:4000/collections`);
				if (!response.ok) {
					throw new Error(` ${response.status}`);
				}
				const data = await response.json();
				console.log('COLLECTIONS: ',data.collections)
				setCollections(data.collections);
			} catch (error) {
				console.log('EROOROR')
				console.error(error);
			}
		};
		fetchCollections();
	}, []);

	const handleNewCollection = async () => {
		try {
			const response = await fetch(`http://localhost:4000/collections/new`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: newCollectionName })
			});
			if (!response.ok) {
				throw new Error(`${response.status}`);
			}
			const data = await response.json();
			setCollections([ ...collections, data.collection ]);
			setIsModalOpen(false);
			setNewCollectionName('');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="app-container">
			<div className="content">
				<div className="form-container">
					<div
						className="table-header"
						style={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<h2>All Collections</h2>
						<div>
							<Link className="new-collection-button" to={`/collections/new`}>
								New Collection
							</Link>
						</div>
					</div>
					<table className="styled-table">
						<thead>
							<tr>
								<th>Collection Name</th>
								<th>Collection ID</th>
								<th>Edit Collection</th>
								<th>View Collection</th>
								<th>Delete Collection</th>
							</tr>
						</thead>
						<tbody>
							{collections.map((collection, index) => (
								<tr key={index}>
									<td>{collection.name}</td>
									<td>{collection.id}</td>
									<td>
										<Link to={`/collections/${collection.id}`}>
											<Button
												className="edit-button"
												style={{
													backgroundColor: 'dodgerblue',
													color: 'white',
													border: 'none',
													padding: '12px 20px',
													fontSize: '18px'
												}}
											>
												<small>
													<FontAwesomeIcon
														icon={faEdit}
														style={{ marginRight: '4px' }}
													/>{' '}
													Open
												</small>
											</Button>
										</Link>
									</td>
									<td>
										<Link to={`/collections/${collection.id}/view`}>
											<Button
												className="edit-button"
												style={{
													backgroundColor: '#4f4f4f',
													color: 'white',
													border: 'none',
													padding: '12px 20px',
													fontSize: '18px'
												}}
											>
												<small>
													<FontAwesomeIcon
														icon={faFile}
														style={{ marginRight: '4px' }}
													/>{' '}
													View
												</small>
											</Button>
										</Link>
									</td>
									<td>
										<Button
											className="delete-button"
											style={{
												backgroundColor: '#f03949',
												color: 'white',
												border: 'none',
												padding: '12px 20px',
												fontSize: '18px'
											}}
										>
											<small>
												<FontAwesomeIcon
													icon={faTrashAlt}
													style={{ marginRight: '4px' }}
												/>{' '}
												Trash
											</small>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			{/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<h2>New Collection</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleNewCollection();
					}}
				>
					<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						<label htmlFor="collectionName">Collection Name:</label>
						<input
							type="text"
							id="collectionName"
							value={newCollectionName}
							onChange={(e) => setNewCollectionName(e.target.value)}
							required
						/>
					</div>
					<Button type="submit" style={{ marginTop: '10px' }}>
						Save
					</Button>
				</form>
			</Modal> */}
		</div>
	);
};

export default Collections;
