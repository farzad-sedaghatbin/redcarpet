package ir.winners.redcarpet.service;

import ir.winners.redcarpet.service.dto.CermonyDTO;
import java.util.List;

/**
 * Service Interface for managing Cermony.
 */
public interface CermonyService {

    /**
     * Save a cermony.
     *
     * @param cermonyDTO the entity to save
     * @return the persisted entity
     */
    CermonyDTO save(CermonyDTO cermonyDTO);

    /**
     * Get all the cermonies.
     *
     * @return the list of entities
     */
    List<CermonyDTO> findAll();

    /**
     * Get the "id" cermony.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CermonyDTO findOne(Long id);

    /**
     * Delete the "id" cermony.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the cermony corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<CermonyDTO> search(String query);
}
