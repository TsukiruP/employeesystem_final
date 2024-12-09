import React, { useState } from 'react';
import { 
  Container, Paper, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, MenuItem, CircularProgress 
} from '@material-ui/core';

export default function SearchEmployee() {
  const paperStyle = { padding: '30px 20px', margin: '20px auto', width: 800 };
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('fullname'); // Default search by fullname
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search query.');
      return;
    }

    setError('');
    setLoading(true);
    setResults([]); // Clear previous results during new search

    try {
      const response = await fetch(
        `http://localhost:8080/employees/search?${searchBy}=${encodeURIComponent(searchQuery)}`, 
        { method: 'GET' }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      if (data.length === 0) {
        setError('No employees found matching the criteria.');
      }
      setResults(data);
    } catch (err) {
      setError(err.message || 'Error searching for employee.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'blue' }}>
          <u>Search Employee</u>
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <TextField
            label="Search Query"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1 }}
          />
          <TextField
            select
            label="Search By"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            variant="outlined"
            style={{ width: '200px' }}
          >
            <MenuItem value="fullname">First + Last Name</MenuItem>
            <MenuItem value="ssn">SSN</MenuItem>
            <MenuItem value="empid">Employee ID</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {results.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Hire Date</TableCell>
                <TableCell>SSN</TableCell>
                <TableCell>Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((employee) => (
                <TableRow key={employee.empid}>
                  <TableCell>{employee.empid}</TableCell>
                  <TableCell>{`${employee.firstname} ${employee.lastname}`}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.hiredate}</TableCell>
                  <TableCell>{employee.ssn}</TableCell>
                  <TableCell>{employee.salary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {results.length === 0 && !error && !loading && <p>No results found.</p>}
      </Paper>
    </Container>
  );
}
