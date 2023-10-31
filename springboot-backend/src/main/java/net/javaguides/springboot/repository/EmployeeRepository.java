package net.javaguides.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import net.javaguides.springboot.model.Employee;

import java.util.Optional;
@Repository

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

//    Employee findByEmailId(String email);
//      Employee findByEmpId(@Param("emp_id") Integer emp_id);
//      Employee findByShortId(@Param("short_id") String short_id);
}

