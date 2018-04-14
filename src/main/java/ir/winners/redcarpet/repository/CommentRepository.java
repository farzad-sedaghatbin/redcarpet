package ir.winners.redcarpet.repository;

import ir.winners.redcarpet.domain.Comment;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Comment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select distinct comment from Comment comment left join fetch comment.merchants")
    List<Comment> findAllWithEagerRelationships();

    @Query("select comment from Comment comment left join fetch comment.merchants where comment.id =:id")
    Comment findOneWithEagerRelationships(@Param("id") Long id);

}
