const db = require('../util/database');

module.exports = class CollectionFields {
	constructor(
		id,
		collection_id,
		field_type_id,
		field_label,
		field_name,
		field_id,
		field_title,
		is_required,
		is_unique,
		default_value,
		placeholder,
		attributes,
		created_at,
		referenced_table_column,
		referenced_table_name
	) {
		this.id = id;
		this.collection_id = collection_id;
		this.field_type_id = field_type_id;
		this.field_label = field_label;
		this.field_name = field_name;
		this.field_id = field_id;
		this.field_title = field_title;
		this.is_required = is_required;
		this.is_unique = is_unique;
		this.default_value = default_value;
		this.placeholder = placeholder;
		this.attributes = JSON.stringify(attributes);
		this.created_at = created_at;
		this.referenced_table_column = referenced_table_column;
		this.referenced_table_name = referenced_table_name;
	}
	save() {
		return db.execute(
			'INSERT INTO collection_fields(id, collection_id, field_type_id, field_label,field_name, field_id, field_title, is_required, is_unique, default_value, placeholder, attributes, created_at, referenced_table_column, referenced_table_name) VALUES(?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[
				this.id,
				this.collection_id,
				this.field_type_id,
				this.field_label,
				this.field_name,
				this.field_id,
				this.field_title,
				this.is_required,
				this.is_unique,
				this.default_value,
				this.placeholder,
				this.attributes,
				this.created_at,
				this.referenced_table_column,
				this.referenced_table_name
			]
		);
	}
	static getCollections() {
		return db.execute('SELECT * FROM collections');
	}
	static getCollectionFieldsData(collectionId) {
		return db.execute('SELECT input_fields.input_type AS field_type, collection_fields.* FROM collection_fields INNER JOIN input_fields ON input_fields.id = collection_fields.field_type_id WHERE collection_id = ?', [ collectionId ]);
	}
	static getCollectionFieldNames(collectionId) {
		return db.execute('SELECT collection_fields.field_name FROM collection_fields WHERE collection_id = ?', [ collectionId ]);
	}
};
