package ir.winners.redcarpet.service;

import ir.winners.redcarpet.service.dto.RatingDTO;
import java.util.List;

/**
 * Service Interface for managing Rating.
 */
public interface RatingService {

    /**
     * Save a rating.
     *
     * @param ratingDTO the entity to save
     * @return the persisted entity
     */
    RatingDTO save(RatingDTO ratingDTO);

    /**
     * Get all the ratings.
     *
     * @return the list of entities
     */
    List<RatingDTO> findAll();

    /**
     * Get the "id" rating.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RatingDTO findOne(Long id);

    /**
     * Delete the "id" rating.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the rating corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<RatingDTO> search(String query);
}
