package ir.winners.redcarpet.repository;

import ir.winners.redcarpet.domain.Factor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Factor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FactorRepository extends JpaRepository<Factor, Long> {

}
