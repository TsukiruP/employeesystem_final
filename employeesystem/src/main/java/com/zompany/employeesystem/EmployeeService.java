package com.zompany.employeesystem;

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
}
