export const validate = (data, dataArray) => {
	const newErrors = {};

	dataArray.forEach((product) => {
		if (!product || typeof product !== 'object') return; // Check if product is valid

		Object.keys(product).forEach((key) => {
			const field = product[key];
			// Add a check to ensure field is valid
			if (!field || typeof field !== 'object') return;
			const value = data[key];
			console.log(field, value);
			// Common validation rules
			// Check if the field is required and not filled
			if (field.is_required && !value) {
				newErrors[key] = `${field.label || key} is required`;
				console.log('CAUGHT ERROR: field is required and not filled ', field);
				// Check if the input exceeds the maximum length
			} else if (field.maxLength && value.length > field.maxLength) {
				newErrors[key] = `${field.label || key} must be less than ${field.maxLength} characters`;

				// Check if the input is shorter than the minimum length
			} else if (field.minLength && value.length < field.minLength) {
				newErrors[key] = `${field.label || key} must be at least ${field.minLength} characters`;
			}

			// Type-specific validation rules
			switch (field.type) {
				case 'number':
					// Check if the value is a valid number
					if (isNaN(value)) {
						newErrors[key] = `${field.label || key} must be a valid number`;

						// Check if the value is below the minimum allowed value
					} else if (field.min !== undefined && value < field.min) {
						newErrors[key] = `${field.label || key} must be at least ${field.min}`;

						// Check if the value is above the maximum allowed value
					} else if (field.max !== undefined && value > field.max) {
						newErrors[key] = `${field.label || key} must be at most ${field.max}`;
					}
					break;

				case 'email':
					// Validate the email format
					if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
						newErrors[key] = `${field.label || key} must be a valid email address`;
					}
					break;

				case 'url':
					// Validate the URL format
					if (value && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value)) {
						newErrors[key] = `${field.label || key} must be a valid URL`;
					}
					break;

				case 'checkbox':
					// Ensure at least one checkbox is selected if required
					if (field.is_required && !data[key]) {
						newErrors[key] = `Please select at least one ${field.label || key}`;
					}
					break;

				case 'select':
					// Ensure an option is selected if required
					if (field.is_required && !value) {
						newErrors[key] = `Please select a ${field.label || key}`;
					}
					break;

				case 'password':
					// Validate the password against a pattern (e.g., regex for specific requirements)
					if (field.pattern && !new RegExp(field.pattern).test(value)) {
						newErrors[key] = `${field.label || key} must match the required pattern`;
					}

					// Check for confirm password match
					if (field.confirm && value !== data[field.confirm]) {
						newErrors[key] = `Passwords do not match`;
					}
					break;

				default:
					break;
			}
		});
	});

	return newErrors;
};
