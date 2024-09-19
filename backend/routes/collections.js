const express = require('express');
const CollectionFields = require('../models/collectionFields');
const db = require('../util/database');
const router = express.Router();
const Collections = require('../models/collections');

const getFieldTypeId = (fieldTypeName) => {
	return db.execute(`SELECT id FROM input_fields WHERE input_type = '${fieldTypeName}'`);
};
const dataTypeIdentification = {
	text: 'VARCHAR(255)',
	number: 'INT',
	date: 'DATETIME',
	checkbox: 'INT',
	select: 'VARCHAR(255)'
};

function makeCollectionTable(tableName, fields) {
	console.log('MY FIELDS: ', fields);
	const tableColumns = fields
		.map((field) => {
			return `${field.fieldName} ${dataTypeIdentification[field.fieldType]}`;
		})
		.join(',');
	// console.log(`CREATE TABLE ${tableName} (${tableColumns});`)
    const sanitizedTableName = `\`${tableName}\``;

    const createTableQuery = `CREATE TABLE ${sanitizedTableName} (id INT PRIMARY KEY AUTO_INCREMENT, ${tableColumns});`;
    console.log(createTableQuery);

    return db.execute(createTableQuery);
}
const getCollections = async (req, res, next) => {
	// console.log('COLLECTIONS REQUEST');
	try {
		const [ collections ] = await Collections.getCollections();
		// console.log('COLLECTIONS: ', collections);
		res.json({ collections });
	} catch (err) {
		console.error('Error fetching collections:', err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
const getCollection = async (req, res, next) => {
	const collectionId = req.params.collectionId;
	// console.log(collectionId);
	try {
		const [ collectionRecords ] = await Collections.getCollectionRecords(collectionId);
		// console.log('COLLECITON RECORDS: ', collectionRecords);
		res.json({ collectionRecords });
	} catch (err) {	
		console.error('Error fetching collection data:', err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
const postCollectionAndFields = async (req, res, next) => {
	const fieldsData = req.body.fields;
	const collectionName = req.body.collectionName;
	console.log('DATA RECIEVED: ', fieldsData);
	const created_at = new Date();
	try {
		const collection = new Collections(null, collectionName, created_at);
		const [ collectionResult ] = await collection.save();
		const collectionId = collectionResult.insertId;
		const collectionTable = makeCollectionTable(collectionName, fieldsData);
		fieldsData.map(async (field) => {
			console.log('FIELD: ', field);
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
			const [ fieldsResult ] = await collectionFields.save();
			// try{
			// 	const [collectionFieldNames] = await CollectionFields.getCollectionFieldNames(collectionId);
			// 	console.log('collectionFieldNames: ', collectionFieldNames);
			// } catch{
			// 	console.error('Error saving collection:', error);
			// 	return res.status(500).json({ error: 'Internal Server Error' });
			// }
			console.log('COLLECTION FIELDS: ', collectionFields);
			// 	return res.json({ collection: { id: result.insertId, name, created_at } });
		});
	} catch (error) {
		console.error('Error saving collection:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};
const getEditCollectionRecords = async (req, res, next) => {
	// console.log('PENDING FUNCTIONLAITY!')
};

router.get('/collections', getCollections);
router.post('/collections/new', postCollectionAndFields);
router.get('/collections/:collectionId', getCollection);
router.get('/collections/:collectionId/edit', getEditCollectionRecords);

module.exports = router;
