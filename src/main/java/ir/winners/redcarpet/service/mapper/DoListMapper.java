package ir.winners.redcarpet.service.mapper;

import ir.winners.redcarpet.domain.*;
import ir.winners.redcarpet.service.dto.DoListDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DoList and its DTO DoListDTO.
 */
@Mapper(componentModel = "spring", uses = {CheckListMapper.class})
public interface DoListMapper extends EntityMapper<DoListDTO, DoList> {

    @Mapping(source = "checkList.id", target = "checkListId")
    DoListDTO toDto(DoList doList);

    @Mapping(source = "checkListId", target = "checkList")
    DoList toEntity(DoListDTO doListDTO);

    default DoList fromId(Long id) {
        if (id == null) {
            return null;
        }
        DoList doList = new DoList();
        doList.setId(id);
        return doList;
    }
}
