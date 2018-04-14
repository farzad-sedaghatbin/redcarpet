package ir.winners.redcarpet.service;

import ir.winners.redcarpet.service.dto.ServiceDTO;
import java.util.List;

/**
 * Service Interface for managing Service.
 */
public interface ServiceService {

    /**
     * Save a service.
     *
     * @param serviceDTO the entity to save
     * @return the persisted entity
     */
    ServiceDTO save(ServiceDTO serviceDTO);

    /**
     * Get all the services.
     *
     * @return the list of entities
     */
    List<ServiceDTO> findAll();

    /**
     * Get the "id" service.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ServiceDTO findOne(Long id);

    /**
     * Delete the "id" service.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the service corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<ServiceDTO> search(String query);
}
