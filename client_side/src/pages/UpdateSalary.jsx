import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

export default function UpdateSalaries() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const classes = useStyles();

  // State for range update form
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [percentageRange, setPercentageRange] = useState('');

  // State for less-than update form
  const [lessThanAmount, setLessThanAmount] = useState('');
  const [percentageLess, setPercentageLess] = useState('');

  const handleRangeSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/employees/increase-by-range?minSalary=${minSalary}&maxSalary=${maxSalary}&percentage=${percentageRange}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert('Salaries updated successfully for the range!');
      } else {
        alert('Failed to update salaries by range.');
      }
    } catch (error) {
      console.error('Error updating salaries by range:', error);
      alert('An error occurred while updating salaries.');
    }
  };

  const handleLessThanSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/employees/increase-if-less-than?amount=${lessThanAmount}&percentage=${percentageLess}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert('Salaries updated successfully for employees earning less than the amount!');
      } else {
        alert('Failed to update salaries for employees earning less than the amount.');
      }
    } catch (error) {
      console.error('Error updating salaries for employees earning less than the amount:', error);
      alert('An error occurred while updating salaries.');
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'blue' }}>
          <u>Update Salaries</u>
        </h1>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleRangeSubmit}>
          <h3>Increase Salary by Range</h3>
          <TextField
            label="Min Salary"
            variant="outlined"
            fullWidth
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
          />
          <TextField
            label="Max Salary"
            variant="outlined"
            fullWidth
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
          />
          <TextField
            label="Percentage Increase"
            variant="outlined"
            fullWidth
            value={percentageRange}
            onChange={(e) => setPercentageRange(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Update by Range
          </Button>
        </form>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleLessThanSubmit}>
          <h3>Increase Salary for Employees Earning Less Than</h3>
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            value={lessThanAmount}
            onChange={(e) => setLessThanAmount(e.target.value)}
          />
          <TextField
            label="Percentage Increase"
            variant="outlined"
            fullWidth
            value={percentageLess}
            onChange={(e) => setPercentageLess(e.target.value)}
          />
          <Button variant="contained" color="secondary" type="submit">
            Update for Less Than
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
