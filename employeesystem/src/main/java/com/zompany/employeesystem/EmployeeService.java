package com.zompany.employeesystem;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public boolean validateEmployeeData(Employee employee) {
        String[] blacklistedWords = {"CREATE", "DROP", "ALTER", "TRUNCATE", "DELETE", "RENAME", "INSERT", "UPDATE", "SHOW", "MODIFY"};
        String[] inputs = {employee.getFirstname(), employee.getLastname(), employee.getEmail(),
                employee.getHiredate(), employee.getSsn()};

        for (String input : inputs) {
            if (input != null) {
                for (String word : blacklistedWords) {
                    if (input.toUpperCase().contains(word)) {
                        System.err.println("Potential SQL injection detected: " + input);
                        return false;
                    }
                }
            }
        }
        return true;
    }

    public Employee insertEmployee(Employee employee) {
        // Check if employee already exists based on SSN
        if (employeeRepository.existsBySsn(employee.getSsn())) {
            throw new IllegalArgumentException("Employee with this SSN already exists");
        }

        // Validate employee data
        if (validateEmployeeData(employee)) {
            return employeeRepository.save(employee);
        } else {
            throw new IllegalArgumentException("Invalid data detected");
        }
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll(); // Use the injected instance
    }

    public boolean deleteEmployee(Integer id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id); // This deletes the employee by ID
            return true;
        }
        return false; // If the employee does not exist
    }

    public Employee updateEmployee(Integer id, Employee updatedEmployee) {
        // Fetch the existing employee
        Employee existingEmployee = employeeRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Employee not found with ID: " + id));

        // Validate the data (same as insert)
        if (!validateEmployeeData(updatedEmployee)) {
            throw new IllegalArgumentException("Invalid data detected");
        }

        // Ensure SSN is not conflicting with another existing employee
        if (employeeRepository.existsBySsn(updatedEmployee.getSsn()) &&
                !existingEmployee.getSsn().equals(updatedEmployee.getSsn())) {
            throw new IllegalArgumentException("Employee with this SSN already exists");
        }

        // Update the existing employee with the new data
        existingEmployee.setFirstname(updatedEmployee.getFirstname());
        existingEmployee.setLastname(updatedEmployee.getLastname());
        existingEmployee.setEmail(updatedEmployee.getEmail());
        existingEmployee.setHiredate(updatedEmployee.getHiredate());
        existingEmployee.setSsn(updatedEmployee.getSsn());
        existingEmployee.setSalary(updatedEmployee.getSalary());

        // Perform the update (save the updated employee)
        return employeeRepository.save(existingEmployee); // Save the updated employee
    }

    // Search employees by name, SSN, or empid
    public List<Employee> searchEmployees(String fullname, String ssn, Integer empid) {
        if (fullname != null && !fullname.isEmpty()) {
            return employeeRepository.findByName(fullname); // Adjusted for full name
        } else if (ssn != null && !ssn.isEmpty()) {
            return employeeRepository.findBySsn(ssn);
        } else if (empid != null) {
            return employeeRepository.findByEmpid(empid).map(List::of).orElse(List.of());
        } else {
            throw new IllegalArgumentException("At least one search parameter must be provided");
        }
    }

    @Transactional
    public int increaseSalaryByRange(double minSalary, double maxSalary, double percentage) {
        return employeeRepository.updateSalaryByRange(minSalary, maxSalary, percentage);
    }

    @Transactional
    public int increaseSalaryIfLessThan(double amount, double percentage) {
        return employeeRepository.updateSalaryIfLessThan(amount, percentage);
    }
    
}
