package com.zompany.employeesystem;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    boolean existsBySsn(String ssn);
}
