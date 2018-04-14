package ir.winners.redcarpet.service;

import ir.winners.redcarpet.service.dto.CheckListDTO;
import java.util.List;

/**
 * Service Interface for managing CheckList.
 */
public interface CheckListService {

    /**
     * Save a checkList.
     *
     * @param checkListDTO the entity to save
     * @return the persisted entity
     */
    CheckListDTO save(CheckListDTO checkListDTO);

    /**
     * Get all the checkLists.
     *
     * @return the list of entities
     */
    List<CheckListDTO> findAll();

    /**
     * Get the "id" checkList.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CheckListDTO findOne(Long id);

    /**
     * Delete the "id" checkList.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the checkList corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<CheckListDTO> search(String query);
}
