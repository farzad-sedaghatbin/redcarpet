package ir.winners.redcarpet.service;

import ir.winners.redcarpet.service.dto.ErrorDTO;
import java.util.List;

/**
 * Service Interface for managing Error.
 */
public interface ErrorService {

    /**
     * Save a error.
     *
     * @param errorDTO the entity to save
     * @return the persisted entity
     */
    ErrorDTO save(ErrorDTO errorDTO);

    /**
     * Get all the errors.
     *
     * @return the list of entities
     */
    List<ErrorDTO> findAll();

    /**
     * Get the "id" error.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ErrorDTO findOne(Long id);

    /**
     * Delete the "id" error.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the error corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<ErrorDTO> search(String query);
}
