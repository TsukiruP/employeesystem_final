import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Import the three-dot icon
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate(); // Use useNavigate

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Correct endpoint for your backend
        const response = await axios.get('http://localhost:8080/employees/getAll');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleMenuClick = (event, employee) => {
    // console.log('Selected Employee:', employee);  // Log the employee to inspect its properties
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);  // Save the selected employee for later use
  };
  

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    // Navigate to the edit page for the selected employee using navigate
    navigate(`/edit/${selectedEmployee.empid}`); // Change from ssn to id
  };

  const handleDelete = async () => {
    handleMenuClose();
    try {
      // Log the empid to confirm the correct employee is selected
      console.log('Deleting employee with empid:', selectedEmployee.empid);
  
      // Make the DELETE request using empid
      await axios.delete(`http://localhost:8080/employees/${selectedEmployee.empid}`);
  
      // Update the state to remove the deleted employee from the list
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.empid !== selectedEmployee.empid)
      );
  
      alert('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error.response ? error.response.data : error.message);
      alert('Failed to delete employee');
    }
  };
  
  

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>

      <Grid container spacing={4}>
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}> {/* Change from ssn to id */}
            <Card>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">
                    {employee.firstname} {employee.lastname}
                  </Typography>
                  <IconButton onClick={(e) => handleMenuClick(e, employee)}>
                    <MoreVertIcon />
                  </IconButton>
                </div>
                <Typography color="textSecondary">{employee.email}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Hire Date: {new Date(employee.hiredate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Salary: ${employee.salary}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  SSN: {employee.ssn}
                </Typography>
              </CardContent>
            </Card>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
