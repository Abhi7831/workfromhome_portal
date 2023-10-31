package net.javaguides.springboot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private long id;

	@Column(name = "emp_id")
	private long empId;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "email_id")
	private String emailId;

	@Column(name= "phone_number")
	private String phoneNumber;

	@Column(name= "department")
	private String department;

	@Column(name= "position")
	private String position;

	@Column(name= "password")
	private String password;

	@Column(name= "role")
	private String role;

	@Column(name ="country")
	private String country;

	@Column(name= "gender")
	private String gender;

	public Employee() {

	}

	public Employee(Long empId,String firstName, String lastName, String emailId, String phoneNumber, String department, String position, String password, String gender, String role, String country) {
		super();
		this.empId=empId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.department=department;
		this.phoneNumber=phoneNumber;
		this.position=position;
		this.password=password;
		this.country=country;
		this.role=role;
		this.gender=gender;
	}
//	public long getId() {
//		return id;
//	}
//	public void setId(long id) {
//		this.id = id;
//	}

	public Long getEmpId() {
		return empId;
	}
	public void setEmpId(Long empId) {
		this.empId = empId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}

	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}

	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}

	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}

}
