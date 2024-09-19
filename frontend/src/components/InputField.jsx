import React, { Fragment, useEffect, useState } from 'react';
import styles from './InputField.module.css';

const InputField = ({ field, error }) => {
    const [ selectTagOpen, setSelectTagOpen ] = useState(false);
	const [ fieldData, setFieldData ] = useState([]);
	const [ selectedCheckboxes, setSelectedCheckboxes ] = useState([]);
    console.log('FIELD : ',field)
	useEffect(() => {
		setFieldData(field);
        console.log('FIELD DATA: ',fieldData)
	}, []);
	useEffect(() => {
		setFieldData((prevField) => ({ ...prevField, selectedCheckboxes: selectedCheckboxes }));
	}, [selectedCheckboxes]);

	const attributes = JSON.parse(field.attributes);
	const label = field.field_label || '';
	const title = field.field_title || 'Choose';
	const id = field.field_id || '';
	const placeholder = field.placeholder || '';
	const max = attributes.max || '';
	const min = attributes.min || '';
	const minLength = attributes.minLength || '';
	const maxLength = attributes.maxLength || '';
	const isRequired = field.is_required || '';
	const type = field.field_type || 'text';
	const name = field.field_name || '';
	const defaultValue = field.default_value || '';
	const options = field.options || [];
	console.log('FIELD: ', fieldData);

	const handleSelectClick = () => {
		setSelectTagOpen((prevState) => !prevState);
	};

	const handleCheckboxChange = (value) => {
		setSelectedCheckboxes((prevState) => {
			if (prevState.includes(value)) {
				return prevState.filter((item) => item !== value);
			} else {
				return [ ...prevState, value ];
			}
		});
	};
	console.log('SELECTED CHEKBOXES: ', selectedCheckboxes);

	const renderCheckboxes = () => (
		<div id="multipleCheckbox" className={styles.optionDiv} style={{ display: selectTagOpen ? 'block' : 'none' }}>
			{options.map((item, idx) => (
				<div key={idx}>
					<label htmlFor={`${id}-${idx}`} required={isRequired}>
						<div className={styles.optionLabel}>
							<input
								type="checkbox"
								id={`${id}-${idx}`}
								value={item.value}
								checked={selectedCheckboxes.includes(item.value)}
								onChange={() => handleCheckboxChange(item.value, idx)}
							/>
							<span className={styles.optionSpan}>{item.value}</span>
						</div>
					</label>
				</div>
			))}
		</div>
	);
	if (type === 'select') {
		const options = field.options;
		return (
			<Fragment>
				<label htmlFor={id} style={{ display: 'flex', flexDirection: 'column' }}>
					{title}:
					<select name={name} id={id}>
						{options.map((item, idx) => (
							<option key={idx} value={item.value}>
								{item.value}
							</option>
						))}
					</select>
				</label>
				<p className="error">{error && <small>{error}</small>}</p>
			</Fragment>
		);
	} else if (type === 'checkbox') {
		const options = field.options;
		return (
			<Fragment>
				<label htmlFor={id}>{title}:</label>
				<div className={styles.multipleSelect}>
					<div className={styles.selectBox} onClick={handleSelectClick}>
						<select>
							<option>Select options</option>
						</select>
						<div className={styles.selectionBox} />
					</div>
					{renderCheckboxes()}
				</div>
				<p className="error">{error && <small>{error}</small>}</p>
			</Fragment>
		);
	}
	return (
		<Fragment>
			<label htmlFor={id} style={{ display: 'flex', flexDirection: 'column' }}>
				{label}:
				<input
					type={type}
					id={id}
					name={name}
					min={min}
					max={max}
					required={isRequired}
					defaultValue={defaultValue}
					placeholder={placeholder}
					maxLength={maxLength}
					minLength={minLength}
				/>
			</label>

			<p className="error">{error && <small>{error}</small>}</p>
		</Fragment>
	);
};

export default InputField;

{
	/* {options.map((item, idx) => (
	<div key={idx}>
		<input type="checkbox" id={`${id}-${idx}`} value={item.value} name={name} />
		<label htmlFor={`${id}-${idx}`} required={isRequired}>
			{item.value}
		</label>
	</div>
))} */
}
{
	/* <p className="error">{error && <small>{error}</small>}</p> */
}

// import React, { Fragment } from 'react';

// const InputField = ({ label, id, field, error, type, ...props }) => {

// 	// label={field.label || ''}
// 	// id={field.name || ''}
// 	// max={field.max || ''}
// 	// type={field.type || 'text'}
// 	// name={field.name || ''}
// 	// defaultValue={field.value || ''}

// 	if (type === 'select') {
// 		const options = field.options;
// 		return (
// 			<Fragment>
// 				<label htmlFor={label}>{label}:</label>
// 				<select name={label} id={id} {...props}>
// 					{options.map((item, idx) => (
// 						<option key={idx} value={item.value}>
// 							{item.value}
// 						</option>
// 					))}
// 				</select>
// 			</Fragment>
// 		);
// 	} else if (type === 'checkbox') {
// 		const options = field.options;
// 		return (
// 			<Fragment>
// 				<label>{label}:</label>
// 				{options.map((item, idx) => (
// 					<div key={idx}>
// 						<input type="checkbox" id={`${id}-${idx}`} value={item.value} {...props} />
// 						<label htmlFor={`${id}-${idx}`}>{item.label}</label>
// 					</div>
// 				))}
// 				<small className="error">{error && <p>{error}</p>}</small>
// 			</Fragment>
// 		);
// 	}
// 	return (
// 		<Fragment>
// 			<label htmlFor={id}>{label}: </label>
// 			<input type={type} id={id} {...props} />
// 			<small className="error">{error && <p>{error}</p>}</small>
// 		</Fragment>
// 	);
// };

// export default InputField;
