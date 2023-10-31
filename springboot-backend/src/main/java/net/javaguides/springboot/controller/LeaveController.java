package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.LeaveRequest;
import net.javaguides.springboot.repository.LeaveRequestRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class LeaveController {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    @Autowired
    private EmployeeRepository employeeRepository; // Make sure you have this line


    // Get all leave requests
    @GetMapping("/leaveRequests")
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

//    @GetMapping("leaveRequests/check-login/{emp_id}")
//    public ResponseEntity<Map<String,String>> checkEmployeeLogin(@PathVariable Long emp_id) {
//        Employee employee=employeeRepository.findById(emp_id)
//                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist"));
//        Map<String,String> response = new HashMap<>();
//        response.put(employee.getPassword(), employee.getRole());
//        return ResponseEntity.ok(response);
//    }


//     Create leave request rest API
    @PostMapping("/leaveRequests")
    public LeaveRequest createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        leaveRequest.setAdmin_remark("Waiting for approval");
        leaveRequest.setStatus("Pending");

//        Employee employee = employeeRepository.findById(leaveRequest.getEmployee().getEmpId())
//                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with emp_id: " + leaveRequest.getEmployee().getEmpId()));

//        leaveRequest.setEmployee(employee);

        return leaveRequestRepository.save(leaveRequest);
    }



    // Get leave request by ID rest API
    @GetMapping("/leaveRequests/{leave_id}")
    public ResponseEntity<LeaveRequest> getLeaveRequestById(@PathVariable Long leave_id) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leave_id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave Request does not exist with id: " + leave_id));
        return ResponseEntity.ok(leaveRequest);
    }

    //Update leave request rest API
    @PutMapping("/leaveRequests/{leave_id}")
    public ResponseEntity<LeaveRequest> updateLeaveRequest(@PathVariable Long leave_id, @RequestBody LeaveRequest leaveRequestDetails) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leave_id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave Request does not exist with id: " + leave_id));

        // Update leave request details here
        leaveRequest.setLeave_type(leaveRequestDetails.getLeave_type());
        leaveRequest.setFrom_date(leaveRequestDetails.getFrom_date());
        leaveRequest.setTo_date(leaveRequestDetails.getTo_date());
        leaveRequest.setPosting_date(leaveRequestDetails.getPosting_date());
        leaveRequest.setDescription(leaveRequestDetails.getDescription());
        leaveRequest.setAdmin_remark(leaveRequestDetails.getAdmin_remark());
        leaveRequest.setStatus(leaveRequestDetails.getStatus());
        // Update other fields as needed

        LeaveRequest updatedLeaveRequest = leaveRequestRepository.save(leaveRequest);
        return ResponseEntity.ok(updatedLeaveRequest);
    }

    // Delete leave request rest API
    @DeleteMapping("/leaveRequests/{leave_id}")
    public ResponseEntity<Map<String, Boolean>> deleteLeaveRequest(@PathVariable Long leave_id) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leave_id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave Request does not exist with id: " + leave_id));

        leaveRequestRepository.delete(leaveRequest);
        Map<String, Boolean> response = Map.of("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
