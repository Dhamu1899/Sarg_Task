const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const spreadsheetRoutes = require('./routes/spreadsheetRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/spreadsheet', spreadsheetRoutes);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
