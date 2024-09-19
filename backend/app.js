require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./util/database');
const app = express();
const collectionRoutes = require('./routes/collections')
const collectionFieldRoutes = require('./routes/collectionFields')
const tablesRoutes = require('./routes/tables')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '1kb' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(collectionRoutes)
app.use(collectionFieldRoutes)
app.use(tablesRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
