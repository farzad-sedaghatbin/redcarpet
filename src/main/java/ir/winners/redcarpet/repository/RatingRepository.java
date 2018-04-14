package ir.winners.redcarpet.repository;

import ir.winners.redcarpet.domain.Rating;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Rating entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    @Query("select distinct rating from Rating rating left join fetch rating.merchants")
    List<Rating> findAllWithEagerRelationships();

    @Query("select rating from Rating rating left join fetch rating.merchants where rating.id =:id")
    Rating findOneWithEagerRelationships(@Param("id") Long id);

}
