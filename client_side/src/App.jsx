// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar'; // Import the Appbar component
import Home from './pages/Home'

// Define different page components (you can create them as needed)

const AddEmployee = () => <div>Add Employee Page</div>;
const EditEmployee  = () => <div>Edit Employee Page</div>;
const DeleteEmployee = () => <div>Delete Employee Page</div>;
const GenerateReport = () => <div>Generate Report Page</div>;
const UpdateSalary = () => <div>Update Salary Page</div>;

function App() {
  return (
    <Router>
      {/* Include the Appbar */}
      <Appbar />

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit-employee" element={<EditEmployee />} />
        <Route path="/delete-employee" element={<DeleteEmployee />} />
        <Route path="/generate-report" element={<GenerateReport />} />
        <Route path="/update-salary" element={<UpdateSalary />} />
      </Routes>
    </Router>
  );
}

export default App;
