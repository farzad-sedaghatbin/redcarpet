package ir.winners.redcarpet.service;

import ir.winners.redcarpet.service.dto.MarketObjectDTO;
import java.util.List;

/**
 * Service Interface for managing MarketObject.
 */
public interface MarketObjectService {

    /**
     * Save a marketObject.
     *
     * @param marketObjectDTO the entity to save
     * @return the persisted entity
     */
    MarketObjectDTO save(MarketObjectDTO marketObjectDTO);

    /**
     * Get all the marketObjects.
     *
     * @return the list of entities
     */
    List<MarketObjectDTO> findAll();

    /**
     * Get the "id" marketObject.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MarketObjectDTO findOne(Long id);

    /**
     * Delete the "id" marketObject.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the marketObject corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<MarketObjectDTO> search(String query);
}
