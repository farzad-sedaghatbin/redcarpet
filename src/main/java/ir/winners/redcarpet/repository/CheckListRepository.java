package ir.winners.redcarpet.repository;

import ir.winners.redcarpet.domain.CheckList;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CheckList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CheckListRepository extends JpaRepository<CheckList, Long> {

}
