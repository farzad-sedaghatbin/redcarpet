package ir.winners.redcarpet.service;

import ir.winners.redcarpet.service.dto.SettingDTO;
import java.util.List;

/**
 * Service Interface for managing Setting.
 */
public interface SettingService {

    /**
     * Save a setting.
     *
     * @param settingDTO the entity to save
     * @return the persisted entity
     */
    SettingDTO save(SettingDTO settingDTO);

    /**
     * Get all the settings.
     *
     * @return the list of entities
     */
    List<SettingDTO> findAll();

    /**
     * Get the "id" setting.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SettingDTO findOne(Long id);

    /**
     * Delete the "id" setting.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the setting corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<SettingDTO> search(String query);
}
