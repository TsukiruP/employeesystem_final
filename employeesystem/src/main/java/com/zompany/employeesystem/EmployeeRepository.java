package com.zompany.employeesystem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    boolean existsBySsn(String ssn);
    @Query("SELECT e FROM Employee e WHERE CONCAT(e.firstname, ' ', e.lastname) LIKE %:fullName%")
    List<Employee> findByName(@Param("fullName") String fullName);

    List<Employee> findBySsn(String ssn);
    Optional<Employee> findByEmpid(Integer empid);

    @Modifying
    @Query("UPDATE Employee e SET e.salary = e.salary + (e.salary * :percentage / 100) WHERE e.salary BETWEEN :minSalary AND :maxSalary")
    int updateSalaryByRange(@Param("minSalary") double minSalary, @Param("maxSalary") double maxSalary, @Param("percentage") double percentage);

    @Modifying
    @Query("UPDATE Employee e SET e.salary = e.salary + (e.salary * :percentage / 100) WHERE e.salary < :amount")
    int updateSalaryIfLessThan(@Param("amount") double amount, @Param("percentage") double percentage);
}
