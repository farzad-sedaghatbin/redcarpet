package ir.winners.redcarpet.service.mapper;

import ir.winners.redcarpet.domain.*;
import ir.winners.redcarpet.service.dto.FactorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Factor and its DTO FactorDTO.
 */
@Mapper(componentModel = "spring", uses = {MarketObjectMapper.class})
public interface FactorMapper extends EntityMapper<FactorDTO, Factor> {

    @Mapping(source = "marketObject.id", target = "marketObjectId")
    FactorDTO toDto(Factor factor);

    @Mapping(source = "marketObjectId", target = "marketObject")
    Factor toEntity(FactorDTO factorDTO);

    default Factor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Factor factor = new Factor();
        factor.setId(id);
        return factor;
    }
}
