package ir.winners.redcarpet.service.mapper;

import ir.winners.redcarpet.domain.*;
import ir.winners.redcarpet.service.dto.CermonyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Cermony and its DTO CermonyDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CermonyMapper extends EntityMapper<CermonyDTO, Cermony> {


    @Mapping(target = "checkLists", ignore = true)
    Cermony toEntity(CermonyDTO cermonyDTO);

    default Cermony fromId(Long id) {
        if (id == null) {
            return null;
        }
        Cermony cermony = new Cermony();
        cermony.setId(id);
        return cermony;
    }
}
