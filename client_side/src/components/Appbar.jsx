// components/Appbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Appbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Employee Management System
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/add-employee">
          Add Employee
        </Button>
        <Button color="inherit" component={Link} to="/edit-employee">
          Edit Employee
        </Button>
        <Button color="inherit" component={Link} to="/delete-employee">
          Delete Employee
        </Button>
        <Button color="inherit" component={Link} to="/generate-report">
          Generate Report
        </Button>
        <Button color="inherit" component={Link} to="/update-salary">
          Update Salary
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
