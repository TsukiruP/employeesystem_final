package com.zompany.employeesystem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Integer> {

    // Fetch total pay by job title
    @Query(value = "SELECT jt.job_title, SUM(p.earnings) " +
            "FROM payroll p " +
            "JOIN employee_job_titles ejt ON p.empid = ejt.empid " +
            "JOIN job_titles jt ON ejt.job_title_id = jt.job_title_id " +
            "GROUP BY jt.job_title", 
            nativeQuery = true)
    List<Object[]> getPayByJobTitle();

    // Fetch total pay by division
    @Query(value = "SELECT d.name, SUM(p.earnings) " +
            "FROM payroll p " +
            "JOIN employee_division ed ON p.empid = ed.empid " +
            "JOIN division d ON ed.div_ID = d.ID " +
            "GROUP BY d.name", 
            nativeQuery = true)
    List<Object[]> getPayByDivision();

    // Fetch total payroll details for a specific employee
    @Query(value = "SELECT e.empid, p.earnings, p.pay_date " +
            "FROM payroll p " +
            "JOIN employees e ON p.empid = e.empid " +
            "WHERE e.empid = :empid " +
            "ORDER BY p.pay_date, p.earnings", 
            nativeQuery = true)
    List<Object[]> getPayByEmployee(Integer empid);
}
