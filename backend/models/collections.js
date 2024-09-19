const db = require('../util/database');

module.exports = class Collections {
	constructor(id, name, created_at) {
		this.id = id;
		this.name = name;
		this.created_at = created_at;
	}
	save() {
		return db.execute('INSERT INTO collections(id, name, created_at) VALUES(?, ?, ?)', [
			this.id,
			this.name,
			this.created_at
		]);
	}
	saveFieldEntry() {}
	static getCollections() {
		return db.execute('SELECT * FROM collections');
	}
	static getCollectionRecords(id) {
		return db.execute(
			'SELECT collection_id, name AS collection_name, price AS collection_price FROM products WHERE collection_id = ?',
			[ id ]
		);
	}
	static fetchTablesData() {
		return db.execute('SELECT collections.name FROM collections');
	}
	static fetchTableColumns(tableName) {
		return db.execute(
			'SELECT collection_fields.field_name AS columnName FROM collection_fields INNER JOIN collections ON collection_fields.collection_id = collections.id WHERE collections.name = ?',
			[ tableName ]
		);
	}
	
};
