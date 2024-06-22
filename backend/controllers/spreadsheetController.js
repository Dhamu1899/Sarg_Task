const Spreadsheet = require('../models/spreadsheet');

// Create
exports.create = async (req, res) => {
  try {
    const { row, column, value } = req.body;
    const newCell = await Spreadsheet.create({ row, column, value });
    res.json(newCell);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read
exports.read = async (req, res) => {
  try {
    const data = await Spreadsheet.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const cell = await Spreadsheet.findByPk(id);
    if (cell) {
      cell.value = value;
      await cell.save();
      res.json(cell);
    } else {
      res.status(404).json({ error: 'Cell not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const cell = await Spreadsheet.findByPk(id);
    if (cell) {
      await cell.destroy();
      res.json({ message: 'Cell deleted' });
    } else {
      res.status(404).json({ error: 'Cell not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
