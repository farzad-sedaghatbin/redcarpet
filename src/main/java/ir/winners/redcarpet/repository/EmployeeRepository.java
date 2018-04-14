package ir.winners.redcarpet.repository;

import ir.winners.redcarpet.domain.Employee;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Employee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
