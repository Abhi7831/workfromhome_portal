package net.javaguides.springboot.model;

import jakarta.persistence.*;

//public class LeaveRequest {
//}

import java.util.Date;

@Entity
@Table(name = "leave_request")
public class LeaveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leave_id;

    @ManyToOne
    @JoinColumn(name = "emp_id", referencedColumnName = "emp_id")
    private Employee employee;

    private String leave_type;
    private Date from_date;
    private Date to_date;
    private Date posting_date;
    private String description;
    private String admin_remark;
    private String status;

    // Constructors, getters, and setters

    public LeaveRequest() {
    }

    public LeaveRequest(Employee employee, String leave_type, Date from_date, Date to_date, Date posting_date, String description, String admin_remark, String status) {
        this.employee = employee;
        this.leave_type = leave_type;
        this.from_date = from_date;
        this.to_date = to_date;
        this.posting_date = posting_date;
        this.description = description;
        this.admin_remark = admin_remark;
        this.status = status;
    }

    public Long getLeave_id() {
        return leave_id;
    }

    public void setLeave_id(Long leave_id) {
        this.leave_id = leave_id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getLeave_type() {
        return leave_type;
    }

    public void setLeave_type(String leave_type) {
        this.leave_type = leave_type;
    }

    public Date getFrom_date() {
        return from_date;
    }

    public void setFrom_date(Date from_date) {
        this.from_date = from_date;
    }

    public Date getTo_date() {
        return to_date;
    }

    public void setTo_date(Date to_date) {
        this.to_date = to_date;
    }

    public Date getPosting_date() {
        return posting_date;
    }

    public void setPosting_date(Date posting_date) {
        this.posting_date = posting_date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAdmin_remark() {
        return admin_remark;
    }

    public void setAdmin_remark(String admin_remark) {
        this.admin_remark = admin_remark;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

