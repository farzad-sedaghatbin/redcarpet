package ir.winners.redcarpet.repository;

import ir.winners.redcarpet.domain.Cermony;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Cermony entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CermonyRepository extends JpaRepository<Cermony, Long> {

}
