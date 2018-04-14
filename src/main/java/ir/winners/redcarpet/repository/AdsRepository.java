package ir.winners.redcarpet.repository;

import ir.winners.redcarpet.domain.Ads;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ads entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdsRepository extends JpaRepository<Ads, Long> {

}
