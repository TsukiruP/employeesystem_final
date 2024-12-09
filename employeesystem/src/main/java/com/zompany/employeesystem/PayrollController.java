package com.zompany.employeesystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/payroll")
@CrossOrigin(origins = "http://localhost:5173")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    // Endpoint to get pay by job title
    @GetMapping("/job-title")
    public List<Object[]> getPayByJobTitle() {
        return payrollService.getPayByJobTitle();
    }

    // Endpoint to get pay by division
    @GetMapping("/division")
    public List<Object[]> getPayByDivision() {
        return payrollService.getPayByDivision();
    }

    // Endpoint to get payroll details for a specific employee
    @GetMapping("/employee/{empid}")
    public List<Object[]> getPayByEmployee(@PathVariable Integer empid) {
        return payrollService.getPayByEmployee(empid);
    }
}
