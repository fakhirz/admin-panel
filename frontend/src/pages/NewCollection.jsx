import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
const NewCollection = () => {
	const { collectionId } = useParams();
	const [ fields, setFields ] = useState([]);
	const [ newFieldType, setNewFieldType ] = useState('');
	const [ tablesData, setTablesData ] = useState([]);
	const [ selectedTable, setSelectedTable ] = useState('');
	const [ tableColumns, setTableColumns ] = useState([]);
	const [ selectedTableColumn, setSelectedTableColumn ] = useState('');
	const [ tableColumnValues, setTableColumnValues ] = useState([]);
	const [ selectedValue, setSelectedValue ] = useState('');
	const [ collectionName, setCollectionName ] = useState('');
	useEffect(() => {
		const fetchTablesData = async () => {
			const response = await fetch('http://localhost:4000/tables');
			if (!response.ok) {
				throw new Error(`${response.status}`);
			}
			const tablesData = await response.json();
			setTablesData(tablesData);
		};
		fetchTablesData();
	}, []);
	useEffect(
		() => {
			if (selectedTable) {
				fetchTableColumns();
			} else {
				setTableColumns([]);
			}
		},
		[ selectedTable ]
	);

	useEffect(
		() => {
			if (selectedTableColumn) {
				fetchSelectedTableColumnValues();
			} else {
				setTableColumnValues([]);
			}
		},
		[ selectedTableColumn ]
	);

	function generateRandomID(id) {
		const randomString = Math.random().toString(36).substr(2, 9);
		let randomID = `${id}-${randomString}`;
		return randomID;
	}
	function handleInputChange(index, e) {
		e.preventDefault();
		const { name, type, value, checked } = e.target;
		setFields((prevFields) =>
			prevFields.map(
				(field, i) => (i === index ? { ...field, [name]: type === 'checkbox' ? checked : value } : field)
			)
		);
	}
	function handleNameChange(e) {
		e.preventDefault();
		console.log(e.target.value);
		setCollectionName(e.target.value);
	}

	function handleTableSelectChange(index, e) {
		const tableName = e.target.value;
		setSelectedTable(tableName);
		setFields((prevFields) =>
			prevFields.map((field, i) => (i === index ? { ...field, tableName: tableName, columnName: '' } : field))
		);
	}

	async function fetchTableColumns() {
		try {
			console.log(selectedTable);
			const response = await fetch(`http://localhost:4000/tables/${selectedTable}`);
			if (!response.ok) {
				throw new Error(`Failed to fetch columns: ${response.status}`);
			}
			const tableColumns = await response.json();
			setTableColumns(tableColumns);
		} catch (error) {
			console.error('Error fetching columns:', error);
		}
	}

	function handleTableColumnSelectChange(index, e) {
		const columnName = e.target.value;
		setSelectedTableColumn(columnName);
		setFields((prevFields) =>
			prevFields.map((field, i) => (i === index ? { ...field, columnName: columnName } : field))
		);
	}

	async function fetchSelectedTableColumnValues() {
		try {
			const response = await fetch(`http://localhost:4000/tables/${selectedTable}/${selectedTableColumn}`);
			if (!response.ok) {
				throw new Error(`Failed to fetch column values: ${response.status}`);
			}
			const columnValues = await response.json();
			setTableColumnValues(columnValues);
		} catch (error) {
			console.error('Error fetching columns:', error);
		}
	}
	function handleAddField() {
		let defID = 'field';
		const randomID = generateRandomID(defID);
		setFields((prevFields) => [
			...prevFields,
			{
				id: randomID,
				fieldType: newFieldType,
				fieldName: '',
				fieldId: '',
				fieldTitle: '',
				isRequired: false,
				isUnique: false,
				defaultValue: '',
				placeholder: '',
				attributes: {}
			}
		]);
		setNewFieldType('');
	}
	function handleDeleteField(id) {
		const updatedFields = fields.filter((field) => field.id !== id);
		setFields(updatedFields);
	}
	function handleFieldTypeChange(e) {
		setNewFieldType(e.target.value);
	}

	function renderFieldInputs(field, index) {
		if (!field || typeof field !== 'object' || !field.fieldType) return null;
		switch (field.fieldType) {
			case 'text':
				return (
					<Fragment>
						<td>
							<label htmlFor="label">Label: </label>
							<input
								type="text"
								name="label"
								id="label"
								placeholder="Enter label"
								value={field.label || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="fieldName">Name: </label>
							<input
								type="text"
								name="fieldName"
								placeholder="Enter name"
								value={field.fieldName || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="fieldId">ID: </label>
							<input
								type="text"
								name="fieldId"
								placeholder="Enter ID"
								value={field.fieldId || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="isRequired">Required: </label>
							<input
								type="checkbox"
								name="isRequired"
								checked={field.isRequired || false}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="isUnique">Unique: </label>
							<input
								type="checkbox"
								name="isUnique"
								checked={field.isUnique || false}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="defaultValue">Default Value (if any): </label>
							<input
								type="text"
								name="defaultValue"
								placeholder="Enter Value"
								value={field.defaultValue || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="placeholder">Placeholder: </label>
							<input
								type="text"
								name="placeholder"
								placeholder="Enter placeholder"
								value={field.placeholder || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
					</Fragment>
				);
			case 'number':
				return (
					<Fragment>
						<td>
							<label htmlFor="label">Label: </label>
							<input
								type="text"
								name="label"
								id="label"
								placeholder="Enter label"
								value={field.label || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="fieldName">Name: </label>
							<input
								type="text"
								name="fieldName"
								placeholder="Enter name"
								value={field.fieldName || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="fieldId">ID: </label>
							<input
								type="text"
								name="fieldId"
								placeholder="Enter ID"
								value={field.fieldId || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="isRequired">Required: </label>
							<input
								type="checkbox"
								name="isRequired"
								checked={field.isRequired || false}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="isUnique">Unique: </label>
							<input
								type="checkbox"
								name="isUnique"
								checked={field.isUnique || false}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="defaultValue">Default Value (if any): </label>
							<input
								type="text"
								name="defaultValue"
								placeholder="Enter Value"
								value={field.defaultValue || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="placeholder">Placeholder: </label>
							<input
								type="text"
								name="placeholder"
								placeholder="Enter placeholder"
								value={field.placeholder || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
					</Fragment>
				);
			case 'select':
				return (
					<Fragment>
						<td>
							<label htmlFor="label">Label: </label>
							<input
								type="text"
								name="label"
								id="label"
								placeholder="Enter label"
								value={field.label || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="fieldName">Name: </label>
							<input
								type="text"
								name="fieldName"
								id="fieldName"
								placeholder="Enter Name"
								// value={field.fieldName || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="fieldId">ID: </label>
							<input
								type="text"
								name="fieldId"
								id="fieldId"
								placeholder="Enter ID"
								// value={field.fieldId || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="tableName">Select Table:</label>
							<select
								name="tableName"
								id="tableName"
								value={field.tableName || ''}
								onChange={(e) => handleTableSelectChange(index, e)}
							>
								<option value="">Select table</option>
								{tablesData.map((item, idx) => (
									<option key={idx} value={item.name}>
										{item.name}
									</option>
								))}
							</select>
						</td>

						<td>
							<label htmlFor="tableColumn">Table Column:</label>
							<select
								name="tableColumn"
								id="tableColumn"
								value={field.tableColumn || ''}
								onChange={(e) => handleTableColumnSelectChange(index, e)}
							>
								<option value="">Select Column</option>
								{tableColumns.map((column, idx) => (
									<option key={idx} value={column.columnName}>
										{column.columnName}
									</option>
								))}
							</select>
						</td>
						{/* <td>
							<label htmlFor="columnValue">Default Value:</label>
							<select
								name="columnValue"
								id="columnValue"
								value={field.columnValue || ''}
								onChange={(e) => handleSelectValueChange(index, e)}
							>
								<option value="">Select Value</option>
								{tableColumnValues.map((columnValue, idx) => (
									<option key={idx} value={columnValue.value}>
										{columnValue.value}
									</option>
								))}
							</select>
						</td> */}
					</Fragment>
				);
			case 'checkbox':
				return (
					<Fragment>
						<td>
							<label htmlFor="fieldTitle">Title: </label>
							<input
								type="text"
								name="fieldTitle"
								id="fieldTitle"
								placeholder="Enter checkbox title"
								// value={field.title || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="fieldId">ID: </label>
							<input
								type="text"
								name="fieldId"
								id="fieldId"
								placeholder="Enter ID"
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="fieldName">Name: </label>
							<input
								type="text"
								name="fieldName"
								id="fieldName"
								placeholder="Enter Name"
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="tableName">Select Table:</label>
							<select
								name="tableName"
								id="tableName"
								value={field.tableName || ''}
								onChange={(e) => handleTableSelectChange(index, e)}
							>
								<option value="">Select table</option>
								{tablesData.map((item, idx) => (
									<option key={idx} value={item.name}>
										{item.name}
									</option>
								))}
							</select>
						</td>

						<td>
							<label htmlFor="tableColumn">Table Column:</label>
							<select
								name="tableColumn"
								id="tableColumn"
								value={field.tableColumn}
								onChange={(e) => handleTableColumnSelectChange(index, e)}
							>
								<option value="">Select Column</option>
								{tableColumns.map((column, idx) => (
									<option key={idx} value={column.columnName}>
										{column.columnName}
									</option>
								))}
							</select>
						</td>
					</Fragment>
				);
			case 'date':
				return (
					<Fragment>
						<td>
							<label htmlFor="label">Label: </label>
							<input
								type="text"
								name="label"
								id="label"
								placeholder="Enter label"
								value={field.label || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="fieldName">Name: </label>
							<input
								type="text"
								name="fieldName"
								placeholder="Enter name"
								value={field.fieldName || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="fieldId">ID: </label>
							<input
								type="text"
								name="fieldId"
								placeholder="Enter ID"
								value={field.fieldId || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="isRequired">Required: </label>
							<input
								type="checkbox"
								name="isRequired"
								checked={field.isRequired || false}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
						<td>
							<label htmlFor="defaultValue">Default Value (if any): </label>
							<input
								type="date"
								name="defaultValue"
								id="defaultValue"
								value={field.defaultValue || ''}
								onChange={(e) => handleInputChange(index, e)}
							/>
						</td>
					</Fragment>
				);
			default:
				return null;
		}
	}
	async function handleSubmit() {
		try {
			const response = await fetch(`http://localhost:4000/collections/new`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fields,
					collectionName
				})
			});

			if (response.ok) {
				console.log('Data saved successfully');
				// console.log({
				// 	fields,
				// 	collectionName
				// })
			} else {
				console.error('Error saving data');
				console.log({
					fields,
					collectionName
				})
			}
		} catch (error) {
			console.error('CAUGHT error:', error);
			// console.log({
			// 	fields,
			// 	collectionName
			// })
		}
	}
	return (
		<div className="app-container">
			<div className="content">
				<div
					className="collection_name_div"
					style={{
						display: 'flex',
						// alignItems: 'center',
						flexDirection: 'column',
						justifyContent: 'left',
						marginBottom: '25px'
					}}
				>
					<h2 style={{ color: '#4f4f4f', fontWeight: 'bolder' }}> Add New Collection: </h2>
					<input
						type="text"
						name="collectionName"
						id="collectionName"
						placeholder="Enter Collection Name"
						onChange={(e) => handleNameChange(e)}
						style={{
							border: '3px solid lightgray',
							padding: '12px 15px',
							fontSize: '1.2rem',
							fontWeight: '300'
						}}
					/>
				</div>
				<div className="form-container">
					<div className="page-header" style={{ marginBottom: '30px' }}>
						<Header
							title="Manage Fields"
							identifier={'newCollection'}
							description="Add or remove fields to define the structure of your data"
						/>
					</div>
					<div
						className="table-header"
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: '20px'
						}}
					>
						<select value={newFieldType} onChange={handleFieldTypeChange}>
							<option value="">Select Field Type</option>
							<option value="text">Text</option>
							<option value="number">Number</option>
							<option value="checkbox">Checkbox</option>
							<option value="select">Select</option>
							<option value="date">Date</option>
						</select>
						<Button className="new-field-button" onClick={handleAddField} disabled={!newFieldType}>
							<FontAwesomeIcon icon={faPlus} /> Add a Field
						</Button>
					</div>
					<div className="table-scroll">
						<table className="styled-table">
							<thead />
							<tbody>
								{fields.map((field, index) => (
									<tr key={field.id}>
										<td>
											<label htmlFor="fieldType">Type: </label>
											<p>{field.fieldType || ''}</p>
										</td>
										{renderFieldInputs(field, index)}
										<td>
											<Button
												className="delete-button"
												style={{ backgroundColor: '#f03949', color: 'white', border: 'none' }}
												onClick={() => handleDeleteField(field.id)}
											>
												<small style={{ display: 'flex' }}>
													<FontAwesomeIcon
														icon={faTrashAlt}
														style={{ marginRight: '4px' }}
													/>Trash
												</small>
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						{fields && (
							<Button type="button" onClick={handleSubmit}>
								Save
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewCollection;
