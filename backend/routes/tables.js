const express = require('express');
const router = express.Router();
const Collections = require('../models/collections');
const db = require('../util/database');

const getTablesData = async (req, res, next) => {
	try {
		const [ tables ] = await Collections.fetchTablesData();
		// console.log('Tables: ', tables);
		res.json(tables);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
const getTableColumns = async (req, res, next) => {
	const tableName = req.params.tableName;
	console.log('GOT THIS.... ', tableName);
	try {
		const [ tableColumns ] = await Collections.fetchTableColumns(tableName);
		console.log('TABLE COLUMNS: ', tableColumns);
		res.json(tableColumns);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
function fetchColumnValues(tableName, selectedColumn) {
	return db.execute(
		`SELECT ${tableName}.${selectedColumn} AS value FROM collections INNER JOIN collection_fields ON collection_fields.collection_id = collections.id INNER JOIN ${tableName} ON collections.id = ${tableName}.collection_id WHERE collections.name = '${tableName}' AND collection_fields.field_name = '${selectedColumn}'`
	);
}
const getColumnValues = async (req, res, next) => {
	const tableName = req.params.tableName;
	const selectedColumn = req.params.selectedTableColumn;
	// console.log({
	//     tableName: tableName,
	//     selectedColumn: selectedColumn
	// })
	try {
		const [ columnValues ] = await fetchColumnValues(tableName, selectedColumn);
		// console.log('COLUMN VALUES: ', columnValues);
		res.json(columnValues);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

router.get('/tables', getTablesData);
router.get('/tables/:tableName', getTableColumns);
router.get('/tables/:tableName/:selectedTableColumn', getColumnValues);

module.exports = router;
