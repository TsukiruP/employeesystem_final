import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import { useParams, useNavigate } from 'react-router-dom';  // Import necessary hooks

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function EditEmployee() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const { id } = useParams();  // Get the employee ID from the URL
  const navigate = useNavigate();  // Initialize navigate function

  // Initialize state for employee data (empty fields)
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [hiredate, setHiredate] = useState('');
  const [ssn, setSsn] = useState('');
  const [salary, setSalary] = useState('');
  const classes = useStyles();

  const handleClick = async (e) => {
    e.preventDefault();
  
    const employee = { firstname, lastname, email, hiredate, ssn, salary };
  
    // Check if all fields are filled
    if (!firstname || !lastname || !email || !hiredate || !ssn || !salary) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
  
      const responseText = await response.text();  // Get raw response as text
      console.log('Raw response:', responseText);  // Log the raw response
  
      if (response.status === 200) {
        // Display success message
        alert('Employee updated successfully!');
        navigate(`/`); // Navigate back to the employee list or home page
      } else {
        alert(responseText || 'An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating employee');
    }
  };
  
  

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>
        Edit Employee
        </h1>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="firstname"
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            id="lastname"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="hiredate"
            label="Hire Date"
            variant="outlined"
            fullWidth
            value={hiredate}
            onChange={(e) => setHiredate(e.target.value)}
          />
          <TextField
            id="salary"
            label="Salary"
            variant="outlined"
            fullWidth
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <TextField
            id="ssn"
            label="SSN"
            variant="outlined"
            fullWidth
            value={ssn}
            onChange={(e) => setSsn(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
