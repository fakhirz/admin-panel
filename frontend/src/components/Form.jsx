import React, { Fragment, useState } from 'react';
// import { products } from '../assets/products';
import InputField from './InputField';
import Button from './Button';
import { validate } from '../util/validation';

// const Form = ({fields = []}) => {
// 	const [ errors, setErrors ] = useState({});
// 	console.log("🚀 ~ Form ~ fields:", fields)
// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const formData = new FormData(e.target);
// 		const data = Object.fromEntries(formData.entries());
// 		const newErrors = validate(data, fields);
// 		if (Object.keys(newErrors).length === 0) {
// 			setErrors({});
// 		} else {
// 			setErrors(newErrors);
// 		}
// 	};

// 	return (
// 		<div>
// 			<form method="patch" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
// 				<div style={{ display: 'flex', flexDirection: 'row' }}>
// 					{fields.map((field) =>
// 						Object.keys(field).map((key) => {
// 							const field = field[key];
// 							return (
// 								<div key={key} className="field-names">
// 									<InputField field={field} error={errors[field.name]} />
// 								</div>
// 							);
// 						})
// 					)}
// 				</div>
// 				<p>
// 					<Button type="submit">Submit</Button>
// 				</p>
// 			</form>
// 		</div>
// 	);
// };
const Form = ({ fields = [] }) => {
	const [errors, setErrors] = useState({});
	
	const handleSubmit = (e) => {
	  e.preventDefault();
	  const formData = new FormData(e.target);
	  const data = Object.fromEntries(formData.entries());
	  const newErrors = validate(data, fields);
	  if (Object.keys(newErrors).length === 0) {
		setErrors({});
	  } else {
		setErrors(newErrors);
	  }
	};
  
	return (
	  <div>
		<form method="patch" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
		  <div style={{ display: 'flex', flexDirection: 'row' }}>
			{fields.map((fieldItem, index) =>
			  Object.keys(fieldItem).map((key) => {
			  console.log("🚀 ~ Object.keys ~ fieldItem:", fieldItem)
				const fieldData = fieldItem[key]; // Avoid shadowing by renaming
				console.log("🚀 ~ Object.keys ~ fieldData:", fieldData)
				return (
				  <div key={index} className="field-names">
					<InputField field={fieldItem} error={errors[fieldData]} />
				  </div>
				);
			  })
			)}
		  </div>
		  <p>
			<Button type="submit">Submit</Button>
		  </p>
		</form>
	  </div>
	);
			console.log("🚀 ~ Form ~ fields:", fields)
			console.log("🚀 ~ Form ~ fields:", fields)
			console.log("🚀 ~ Form ~ fields:", fields)
			console.log("🚀 ~ Form ~ fields:", fields)
			console.log("🚀 ~ Form ~ fields:", fields)
  };
  
export default Form;

// import React, { useState } from 'react';
// import { products } from '../src/assets/products';
// import InputField from './InputField';
// import Button from './Button';

// const Form = () => {
// 	const [errors, setErrors] = useState({});

// 	const validate = (data) => {
// 		const newErrors = {};
// 		if (!data.name) {
// 			newErrors.name = 'Name is required';
// 		} else if (data.name.length > products.name.max) {
// 			newErrors.name = `Max ${products.name.max} characters are allowed`;
// 		}
// 		if (!data.price) {
// 			newErrors.price = 'Price is required';
// 		} else if (isNaN(data.price) || data.price.length > products.price.max) {
// 			newErrors.price = `Price must be a valid number and less than or equal to ${products.price.max}`;
// 		}
// 		if (!data.cost) {
// 			newErrors.cost = 'Cost is required';
// 		} else if (isNaN(data.cost) || data.cost.length > products.cost.max) {
// 			newErrors.cost = `Cost must be a valid number and less than or equal to ${products.cost.max}`;
// 		}
// 		if (!data.url) {
// 			newErrors.url = 'URL is required';
// 		}
// 		return newErrors;
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const formData = new FormData(e.target);
// 		const data = Object.fromEntries(formData.entries());
// 		const newErrors = validate(data);
// 		if (Object.keys(newErrors).length === 0) {
// 			console.log('FORM DATA: ', data);
// 			setErrors({});
// 		} else {
// 			setErrors(newErrors);
// 		}
// 	};

// 	return (
// 		<form method="patch" onSubmit={handleSubmit}>
// 			<p>
// 				<InputField
// 					label="Name"
// 					id="name"
// 					type="text"
// 					name="name"
// 					defaultValue={products.name.value}
// 					error={errors.name}
// 				/>
// 			</p>
// 			<p>
// 				<InputField
// 					label="Price"
// 					id="price"
// 					type="number"
// 					name="price"
// 					defaultValue={products.price.value}
// 					error={errors.price}
// 				/>
// 			</p>
// 			<p>
// 				<InputField
// 					label="Cost"
// 					id="cost"
// 					type="number"
// 					name="cost"
// 					defaultValue={products.cost.value}
// 					error={errors.cost}
// 				/>
// 			</p>
// 			<p>
// 				<InputField
// 					label="URL"
// 					id="url"
// 					type="url"
// 					name="url"
// 					defaultValue={products.url.value}
// 					error={errors.url}
// 				/>
// 			</p>
// 			<p>
// 				<label htmlFor="category">Category: </label>
// 				<select name="category" defaultValue={products.category[0].value}>
// 					{products.category.map((item, index) => (
// 						<option key={index} value={item.value}>
// 							{item.value}
// 						</option>
// 					))}
// 				</select>
// 			</p>
// 			<p>
// 				<button type="submit">Submit</button>
// 			</p>
// 		</form>
// 	);
// };

// export default Form;
