package com.zompany.employeesystem;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<String> addEmployee(@RequestBody Employee employee) {
        try {
            Employee savedEmployee = employeeService.insertEmployee(employee);
            return ResponseEntity.ok("Employee inserted successfully: " + savedEmployee);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public List<Employee> list() {
        return employeeService.getAllEmployees(); // Corrected method call
    }
}
