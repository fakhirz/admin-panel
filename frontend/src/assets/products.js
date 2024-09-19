export const products = [
	{
		name: {
			name: 'name',
			value: 'Bags',
			type: 'text',
			label: 'Name',
			minLength: 3,
			required: true
		},
		price: {
			name: 'price',
			value: 10,
			type: 'number',
			label: 'Price',
			required: true
		},
		cost: {
			name: 'cost',
			value: 5,
			type: 'number',
			label: 'Cost',
			required: true
		},
		url: {
			name: 'URL',
			value: 'https://google.com/',
			type: 'url',
			label: 'URL',
			required: true
		},
		// select: {
		// 	type: 'select',
		// 	label: 'Category',
		// 	options: [ { value: 'toys' }, { value: 'home and kitchen' } ]
		// },
		// checkbox: {
		// 	label: 'Colors',
		// 	id: 'colors',
		// 	type: 'checkbox',
		// 	required: true,
		// 	options: [ { value: 'red', label: 'Red' }, { value: 'white', label: 'White' } ]
		// }
	}
];
