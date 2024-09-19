const express = require('express');
const db = require('../util/database');
const router = express.Router();
const CollectionFields = require('../models/collectionFields');

const getFieldTypeId = (fieldTypeName) => {
	return db.execute(`SELECT id FROM input_fields WHERE input_type = '${fieldTypeName}'`);
};
const postCollectionFieldsData = async (req, res, next) => {
	console.log('HELLO WORLD: ',req.body)
};
const postCollectionFields = async (req, res, next) => {
	const collectionId = req.params.collectionId;
	const created_at = new Date();
	const fieldsData = req.body;
	console.log('DATA RECIEVED: ', fieldsData);
	try {
		fieldsData.map(async (field) => {
			// console.log('FIELD: ', field);
			const fieldType = field.fieldType || '';
			const fieldName = field.fieldName || '';
			const fieldId = field.fieldId || '';
			const fieldTitle = field.fieldTitle || '';
			const isRequired = field.isRequired || 0;
			const isUnique = field.isUnique || 0;
			const defaultValue = field.defaultValue || '';
			const placeholder = field.placeholder || '';
			const fieldLabel = field.label || '';
			const attributes = field.attributes || {};
			const referencedTableColumnName = field.columnName || 'no reference';
			const referencedTableName = field.tableName || 'no reference';
			const [ [ fieldTypeId ] ] = await getFieldTypeId(fieldType);
			const collectionFields = new CollectionFields(
				null,
				collectionId,
				fieldTypeId.id,
				fieldLabel,
				fieldName,
				fieldId,
				fieldTitle,
				isRequired,
				isUnique,
				defaultValue,
				placeholder,
				attributes,
				created_at,
				referencedTableColumnName,
				referencedTableName
			);
			console.log("COLLECTION FIELDS: ", collectionFields)
			const [ result ] = await collectionFields.save();
			// console.log('RESULT: ', result);
		});
	} catch (error) {
		console.error('Error saving collection:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};
const getCollectionFields = async (req, res, next) => {
	const collectionId = req.params.collectionId;
	console.log('HERE!!!');
	try {
		const [ fieldsData ] = await CollectionFields.getCollectionFieldsData(collectionId);
		// console.log('FETCHED FIELDS DATA: ', fieldsData);
		// Filter fields that require fetching options
		const optionFieldsArray = fieldsData.filter((field) => {
			return field.field_type === 'checkbox' || field.field_type === 'select';
		});
		const optionsData = await Promise.all(
			optionFieldsArray.map(async (field) => {
				const tableName = field.referenced_table_name;
				const tableColumn = field.referenced_table_column;
				const tableIdentifier = `${tableName}_${tableColumn}`
				const [ fetchOptionsData ] = await getFieldOptions(field);
				// console.log('FETCHED OPTIONS', fetchOptionsData);
				return { [tableIdentifier]: fetchOptionsData };
			})
		);
		console.log('OPTIONS FIELD: ', optionsData);
		res.json({ fields: fieldsData, optionsData: optionsData });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
function getFieldOptions(field) {
	// console.log('GOT FIELD: ', field);
	const ref_table_name = field.referenced_table_name;
	const ref_table_column = field.referenced_table_column;
	return db.execute(`SELECT ${ref_table_name}.${ref_table_column} AS value FROM ${ref_table_name}`);
}

router.post('/collections/:collectionId/new', postCollectionFieldsData);
router.post('/collections/:collectionId/save', postCollectionFields);
router.get('/collections/:collectionId/fields', getCollectionFields);

module.exports = router;
