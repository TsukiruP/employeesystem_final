// Home.jsx
import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [employees, setEmployees] = useState([]);

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

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      
      <Grid container spacing={4}>
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.ssn}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {employee.firstname} {employee.lastname}
                </Typography>
                <Typography color="textSecondary">
                  {employee.email}
                </Typography>
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
