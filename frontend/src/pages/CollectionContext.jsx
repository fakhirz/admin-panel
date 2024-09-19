// src/context/CollectionContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const CollectionContext = createContext();

export const useCollectionContext = () => useContext(CollectionContext);

export const CollectionProvider = ({ children }) => {
  const [fields, setFields] = useState([]);
  const [newFieldType, setNewFieldType] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [tableColumns, setTableColumns] = useState([]);
  const [selectedTableColumn, setSelectedTableColumn] = useState('');
  const [tableColumnValues, setTableColumnValues] = useState([]);



  useEffect(() => {
    if (selectedTable) {
      fetchTableColumns();
    } else {
      setTableColumns([]);
    }
  }, [selectedTable]);

  useEffect(() => {
    if (selectedTableColumn) {
      fetchSelectedTableColumnValues();
    } else {
      setTableColumnValues([]);
    }
  }, [selectedTableColumn]);

  const fetchTableColumns = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tables/${selectedTable}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch columns: ${response.status}`);
      }
      const tableColumns = await response.json();
      setTableColumns(tableColumns);
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  const fetchSelectedTableColumnValues = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tables/${selectedTable}/${selectedTableColumn}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch column values: ${response.status}`);
      }
      const columnValues = await response.json();
      setTableColumnValues(columnValues);
    } catch (error) {
      console.error('Error fetching column values:', error);
    }
  };

  const generateRandomID = (id) => {
    const randomString = Math.random().toString(36).substr(2, 9);
    let randomID = `${id}-${randomString}`;
    return randomID;
  };

  const handleAddField = () => {
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
  };

  const handleDeleteField = (id) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);
  };

  const handleFieldTypeChange = (e) => {
    setNewFieldType(e.target.value);
  };

  return (
    <CollectionContext.Provider
      value={{
        fields,
        setFields,
        newFieldType,
        setNewFieldType,
        selectedTable,
        setSelectedTable,
        tableColumns,
        selectedTableColumn,
        setSelectedTableColumn,
        tableColumnValues,
        handleAddField,
        handleDeleteField,
        handleFieldTypeChange,
        fetchTableColumns,
        fetchSelectedTableColumnValues
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};
