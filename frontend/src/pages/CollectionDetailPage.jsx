import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../pages/Collections.module.css';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import Form from '../components/Form';

const CollectionDetailPage = () => {
	const { collectionId } = useParams();
	const [ collectionDetail, setCollectionDetail ] = useState([]);
	const [ fieldsOptionValues, setFieldsOptionValues ] = useState([]);
	const [ fields, setFields ] = useState([]);
	console.log('collectionDetail: ', collectionDetail);
	useEffect(
		() => {
			const fetchCollectionData = async () => {
				try {
					const response = await fetch(`http://localhost:4000/collections/${collectionId}`);
					if (!response.ok) {
						throw new Error(`${response.status}`);
					}
					const data = await response.json();
					setCollectionDetail(data.collectionRecords);
				} catch (error) {
					console.error(error);
				}
			};

			fetchCollectionData();
		},
		[ collectionId ]
	);
	useEffect(
		() => {
			const fetchInputFields = async () => {
				try {
					const response = await fetch(`http://localhost:4000/collections/${collectionId}/fields`);
					if (!response.ok) {
						throw new Error(`${response.status}`);
					}
					const fieldsData = await response.json();
					console.log(fieldsData);
					// console.log('OPTION VALUEES: ',fieldsData.optionsData);
					setFields(fieldsData.fields);
					setFieldsOptionValues(fieldsData.optionsData);
				} catch (error) {
					console.error(error);
				}
			};

			fetchInputFields();
		},
		[ collectionId ]
	);
	return (
		<div className="app-container">
			<div className="content">
				{/* <Header>Collection Detail</Header> */}
				<div className="form-container" style={{ marginBottom: '15px' }}>
					<div>
						<h2>Add new Record</h2>
					</div>
						<Form fields={fields} optionValues={fieldsOptionValues} collectionId={collectionId} />
				</div>

				<div className="form-container">
					<div
						className="table-header"
						style={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<h2>Records</h2>
						<div>
							<Button className="new-collection-button">Add New</Button>
						</div>
					</div>
					<table className="styled-table">
						<thead>
							<th>Collection Name</th>
							<th>Price</th>
							<th>Edit</th>
							<th>Delete</th>
						</thead>
						<tbody>
							{collectionDetail.map((collection, index) => (
								<tr key={index}>
									<td>{collection.collection_name}</td>
									<td>{collection.collection_price}</td>
									<td>
										<Link to={`/collections/${collection.collection_id}/edit`}>
											<Button
												className="edit-button"
												style={{
													backgroundColor: 'dodgerblue',
													color: 'white',
													border: 'none'
												}}
											>
												<FontAwesomeIcon icon={faEdit} style={{ marginRight: '4px' }} /> Open
											</Button>
										</Link>
									</td>
									<td>
										<Button
											className="delete-button"
											style={{ backgroundColor: '#f03949', color: 'white', border: 'none' }}
										>
											{' '}
											<FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '4px' }} /> Trash
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default CollectionDetailPage;
