package ir.winners.redcarpet.repository;

import ir.winners.redcarpet.domain.MarketObject;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MarketObject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MarketObjectRepository extends JpaRepository<MarketObject, Long> {

}
