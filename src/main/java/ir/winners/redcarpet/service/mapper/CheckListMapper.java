package ir.winners.redcarpet.service.mapper;

import ir.winners.redcarpet.domain.*;
import ir.winners.redcarpet.service.dto.CheckListDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CheckList and its DTO CheckListDTO.
 */
@Mapper(componentModel = "spring", uses = {CermonyMapper.class})
public interface CheckListMapper extends EntityMapper<CheckListDTO, CheckList> {

    @Mapping(source = "cermony.id", target = "cermonyId")
    CheckListDTO toDto(CheckList checkList);

    @Mapping(source = "cermonyId", target = "cermony")
    CheckList toEntity(CheckListDTO checkListDTO);

    default CheckList fromId(Long id) {
        if (id == null) {
            return null;
        }
        CheckList checkList = new CheckList();
        checkList.setId(id);
        return checkList;
    }
}
