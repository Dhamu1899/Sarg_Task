import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Spreadsheet = () => {
  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState('');
  const [newColumn, setNewColumn] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/spreadsheet/read');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCellChange = async (id, value) => {
    try {
      await axios.put(`http://localhost:3000/api/spreadsheet/update/${id}`, { value });
      fetchData();
    } catch (error) {
      console.error('Error updating cell:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/spreadsheet/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting cell:', error);
    }
  };

  const handleAddCell = async () => {
    try {
      await axios.post('http://localhost:3000/api/spreadsheet/create', {
        row: newRow,
        column: newColumn,
        value: newValue,
      });
      setNewRow('');
      setNewColumn('');
      setNewValue('');
      fetchData();
    } catch (error) {
      console.error('Error adding cell:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Spreadsheet CRUD Application</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Row"
          value={newRow}
          onChange={(e) => setNewRow(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Column"
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleAddCell}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Cell
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Row</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map(cell => (
            <tr key={cell.id}>
              <td className="px-6 py-4 whitespace-nowrap">{cell.row}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cell.column}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={cell.value}
                  onChange={(e) => handleCellChange(cell.id, e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(cell.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
