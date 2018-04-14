package ir.winners.redcarpet.service;

import ir.winners.redcarpet.service.dto.AdsDTO;
import java.util.List;

/**
 * Service Interface for managing Ads.
 */
public interface AdsService {

    /**
     * Save a ads.
     *
     * @param adsDTO the entity to save
     * @return the persisted entity
     */
    AdsDTO save(AdsDTO adsDTO);

    /**
     * Get all the ads.
     *
     * @return the list of entities
     */
    List<AdsDTO> findAll();

    /**
     * Get the "id" ads.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AdsDTO findOne(Long id);

    /**
     * Delete the "id" ads.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the ads corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<AdsDTO> search(String query);
}
