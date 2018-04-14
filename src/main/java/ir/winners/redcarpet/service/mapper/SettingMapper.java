package ir.winners.redcarpet.service.mapper;

import ir.winners.redcarpet.domain.*;
import ir.winners.redcarpet.service.dto.SettingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Setting and its DTO SettingDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SettingMapper extends EntityMapper<SettingDTO, Setting> {



    default Setting fromId(Long id) {
        if (id == null) {
            return null;
        }
        Setting setting = new Setting();
        setting.setId(id);
        return setting;
    }
}
