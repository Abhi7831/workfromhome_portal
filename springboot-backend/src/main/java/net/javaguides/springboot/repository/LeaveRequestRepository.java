package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
//    List<LeaveRequest> findByEmployee_EmpId(Long empId);

//    Employee findByEmailId(String email);
//      Employee findByEmpId(@Param("emp_id") Integer emp_id);
//      Employee findByShortId(@Param("short_id") String short_id);
}
