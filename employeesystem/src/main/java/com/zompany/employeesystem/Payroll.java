package com.zompany.employeesystem;

import jakarta.persistence.*;

@Entity
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer payID;  // Primary key for Payroll

    @ManyToOne
    @JoinColumn(name = "empid", referencedColumnName = "empid")  // Foreign key to Employee
    private Employee employee;  // Reference to Employee entity

    private String pay_date;
    private Double earnings;

    // Add other fields for taxes, retirement, health care etc.
    private Double fed_tax;
    private Double fed_med;
    private Double fed_SS;
    private Double state_tax;
    private Double retire_401k;
    private Double health_care;

    // Getters and setters
    public Integer getPayID() {
        return payID;
    }

    public void setPayID(Integer payID) {
        this.payID = payID;
    }

    public String getPay_date() {
        return pay_date;
    }

    public void setPay_date(String pay_date) {
        this.pay_date = pay_date;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Double getEarnings() {
        return earnings;
    }

    public void setEarnings(Double earnings) {
        this.earnings = earnings;
    }

    public Double getFed_tax() {
        return fed_tax;
    }

    public void setFed_tax(Double fed_tax) {
        this.fed_tax = fed_tax;
    }

    public Double getFed_med() {
        return fed_med;
    }

    public void setFed_med(Double fed_med) {
        this.fed_med = fed_med;
    }

    public Double getFed_SS() {
        return fed_SS;
    }

    public void setFed_SS(Double fed_SS) {
        this.fed_SS = fed_SS;
    }

    public Double getState_tax() {
        return state_tax;
    }

    public void setState_tax(Double state_tax) {
        this.state_tax = state_tax;
    }

    public Double getRetire_401k() {
        return retire_401k;
    }

    public void setRetire_401k(Double retire_401k) {
        this.retire_401k = retire_401k;
    }

    public Double getHealth_care() {
        return health_care;
    }

    public void setHealth_care(Double health_care) {
        this.health_care = health_care;
    }
}
