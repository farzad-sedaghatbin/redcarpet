package ir.winners.redcarpet.repository;

import ir.winners.redcarpet.domain.DoList;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DoList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DoListRepository extends JpaRepository<DoList, Long> {

}
