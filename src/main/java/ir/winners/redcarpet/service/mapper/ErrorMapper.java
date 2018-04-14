package ir.winners.redcarpet.service.mapper;

import ir.winners.redcarpet.domain.*;
import ir.winners.redcarpet.service.dto.ErrorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Error and its DTO ErrorDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ErrorMapper extends EntityMapper<ErrorDTO, Error> {



    default Error fromId(Long id) {
        if (id == null) {
            return null;
        }
        Error error = new Error();
        error.setId(id);
        return error;
    }
}
