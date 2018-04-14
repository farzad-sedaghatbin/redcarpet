package ir.winners.redcarpet.service;

import ir.winners.redcarpet.service.dto.DoListDTO;
import java.util.List;

/**
 * Service Interface for managing DoList.
 */
public interface DoListService {

    /**
     * Save a doList.
     *
     * @param doListDTO the entity to save
     * @return the persisted entity
     */
    DoListDTO save(DoListDTO doListDTO);

    /**
     * Get all the doLists.
     *
     * @return the list of entities
     */
    List<DoListDTO> findAll();

    /**
     * Get the "id" doList.
     *
     * @param id the id of the entity
     * @return the entity
     */
    DoListDTO findOne(Long id);

    /**
     * Delete the "id" doList.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the doList corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<DoListDTO> search(String query);
}
