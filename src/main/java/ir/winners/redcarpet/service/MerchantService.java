package ir.winners.redcarpet.service;

import ir.winners.redcarpet.service.dto.MerchantDTO;
import java.util.List;

/**
 * Service Interface for managing Merchant.
 */
public interface MerchantService {

    /**
     * Save a merchant.
     *
     * @param merchantDTO the entity to save
     * @return the persisted entity
     */
    MerchantDTO save(MerchantDTO merchantDTO);

    /**
     * Get all the merchants.
     *
     * @return the list of entities
     */
    List<MerchantDTO> findAll();

    /**
     * Get the "id" merchant.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MerchantDTO findOne(Long id);

    /**
     * Delete the "id" merchant.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the merchant corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<MerchantDTO> search(String query);
}
