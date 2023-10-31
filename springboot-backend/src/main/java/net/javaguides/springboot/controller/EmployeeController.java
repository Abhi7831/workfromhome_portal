package net.javaguides.springboot.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	// get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	}

	@GetMapping("employees/check-login/{emp_id}")
	public ResponseEntity<Map<String,String>> checkEmployeeLogin(@PathVariable Long emp_id) {
		Employee employee=employeeRepository.findById(emp_id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee does not exist"));
		Map<String,String> response = new HashMap<>();
		response.put(employee.getPassword(), employee.getRole());
		return ResponseEntity.ok(response);
	}
	
	// create employee rest api
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}
	
	// get employee by id rest api
	@GetMapping("/employees/{emp_id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long emp_id) {
		Employee employee = employeeRepository.findById(emp_id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + emp_id));
		return ResponseEntity.ok(employee);
	}

		//get employee by id and password
//	@GetMapping("/employees?id=${id}&password=${password}")
//	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id, String pass){
//		Employee employee=employeeRepository.findById(id)
//				.orElseThrow(() -> new ResourceNotFoundException("Employee does not exist "));
//				if(Objects.equals(employee.getPassword(), pass)){
//					return ResponseEntity.ok(employee);
//				}
//				else{
//					return ResponseEntity.ok(employee); // to be changed!!!!
//				}
//	}
	//validate user login
//	@GetMapping("/employees/login")
//	public ResponseEntity<String> validateUserLogin(@RequestParam String email, @RequestParam String password) {
//		Employee user = employeeRepository.findByEmailId(email);
//
//		if (user != null && user.getPassword().equals(password)) {
//			return ResponseEntity.ok(user.getRole());
//		} else {
//			return ResponseEntity.badRequest().body("Invalid email or password");
//		}
//	}

	// validate employee by id rest api
	@GetMapping("/employees/login/{emp_id}")
	public ResponseEntity<String> validateEmployeeById(@PathVariable Long emp_id){
		Employee employee=employeeRepository.findById(emp_id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee does not exist"));
		return ResponseEntity.ok(employee.getRole());
	}

	// get performance by id rest api
	@GetMapping("/employees/{emp_id}/performance")
	public ResponseEntity<Map<String,String>> getPerformanceById(@PathVariable Long emp_id){
		Employee employee=employeeRepository.findById(emp_id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee does not exist"));
		Map<String,String> response = new HashMap<>();//////////////this change i have done from int to varchar
		response.put(employee.getPhoneNumber(),employee.getCountry());
		return ResponseEntity.ok(response);
	}

	// save performance rest api
	@PutMapping("/employees/{emp_id}/performance")
	public ResponseEntity<Employee> updatePerformance(@PathVariable Long emp_id, @RequestBody Employee employeeDetails){
		Employee employee = employeeRepository.findById(emp_id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist "));
		employee.setCountry(employeeDetails.getCountry());
		employee.setPhoneNumber(employeeDetails.getPhoneNumber());
		Employee updatedEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}

	// update employee rest api
	
	@PutMapping("/employees/{emp_id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long emp_id, @RequestBody Employee employeeDetails){
		Employee employee = employeeRepository.findById(emp_id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + emp_id));

		employee.setFirstName(employeeDetails.getFirstName());
		employee.setLastName(employeeDetails.getLastName());
		employee.setEmailId(employeeDetails.getEmailId());
		employee.setPosition(employeeDetails.getPosition());
		employee.setDepartment(employeeDetails.getDepartment());
		employee.setPhoneNumber(employeeDetails.getPhoneNumber());
		//employee.setPassword(employeeDetails.getPassword());
		employee.setRole(employeeDetails.getRole());
		employee.setCountry(employeeDetails.getCountry());
//		employee.setScore(employeeDetails.getScore());
		Employee updatedEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	// delete employee rest api
	@DeleteMapping("/employees/{emp_id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long emp_id){
		Employee employee = employeeRepository.findById(emp_id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + emp_id));
		
		employeeRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
