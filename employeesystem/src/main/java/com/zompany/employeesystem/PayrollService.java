package com.zompany.employeesystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    // Fetch total pay by job title
    public List<Object[]> getPayByJobTitle() {
        return payrollRepository.getPayByJobTitle();
    }

    // Fetch total pay by division
    public List<Object[]> getPayByDivision() {
        return payrollRepository.getPayByDivision();
    }

    // Fetch total payroll details for a specific employee by empid
    public List<Object[]> getPayByEmployee(Integer empid) {
        return payrollRepository.getPayByEmployee(empid);
    }
}
