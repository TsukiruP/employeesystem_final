import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Button, 
  TextField, 
  MenuItem, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  CircularProgress,
  Typography 
} from '@material-ui/core';

const GenerateReport = () => {
  const paperStyle = { padding: '30px 20px', margin: '20px auto', width: 800 };
  const [reportType, setReportType] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    if (!reportType) {
      setError('Please select a report type.');
      return;
    }

    if (reportType === 'employee-pay' && !employeeId) {
      setError('Please enter an employee ID.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      let url;
      switch (reportType) {
        case 'job-title':
          url = 'http://localhost:8080/api/payroll/job-title';
          break;
        case 'division':
          url = 'http://localhost:8080/api/payroll/division';
          break;
        case 'employee-pay':
          url = `http://localhost:8080/api/payroll/employee/${employeeId}`;
          break;
        default:
          throw new Error('Invalid report type');
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setReportData(formatReportData(reportType, data));
    } catch (err) {
      setError(err.message || 'Error generating report.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatReportData = (type, data) => {
    switch (type) {
      case 'job-title':
        return data.map(row => ({
          'Job Title': row[0],
          'Total Earnings': formatCurrency(row[1])
        }));
      case 'division':
        return data.map(row => ({
          'Division': row[0],
          'Total Earnings': formatCurrency(row[1])
        }));
      case 'employee-pay':
        return data.map(row => ({
          'Employee ID': row[0],
          'Earnings': formatCurrency(row[1]),
          'Pay Date': new Date(row[2]).toLocaleDateString()
        }));
      default:
        return data;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h4" color="primary" gutterBottom>
          Generate Report
        </Typography>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <TextField
            select
            label="Report Type"
            value={reportType}
            onChange={(e) => {
              setReportType(e.target.value);
              setReportData([]);
              setError('');
            }}
            variant="outlined"
            style={{ flex: 1 }}
          >
            <MenuItem value="job-title">Pay by Job Title</MenuItem>
            <MenuItem value="division">Pay by Division</MenuItem>
            <MenuItem value="employee-pay">Employee Pay History</MenuItem>
          </TextField>

          {reportType === 'employee-pay' && (
            <TextField
              label="Employee ID"
              type="number"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              variant="outlined"
              style={{ width: '200px' }}
            />
          )}

          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleGenerateReport} 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate'}
          </Button>
        </div>

        {error && (
          <Typography color="error" style={{ marginBottom: '20px' }}>
            {error}
          </Typography>
        )}

        {reportData.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(reportData[0]).map((key) => (
                  <TableCell key={key} style={{ fontWeight: 'bold' }}>
                    {key}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, idx) => (
                    <TableCell key={idx}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
};

export default GenerateReport;