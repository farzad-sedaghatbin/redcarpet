package ir.winners.redcarpet.service;

import ir.winners.redcarpet.service.dto.FactorDTO;
import java.util.List;

/**
 * Service Interface for managing Factor.
 */
public interface FactorService {

    /**
     * Save a factor.
     *
     * @param factorDTO the entity to save
     * @return the persisted entity
     */
    FactorDTO save(FactorDTO factorDTO);

    /**
     * Get all the factors.
     *
     * @return the list of entities
     */
    List<FactorDTO> findAll();

    /**
     * Get the "id" factor.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FactorDTO findOne(Long id);

    /**
     * Delete the "id" factor.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the factor corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<FactorDTO> search(String query);
}
