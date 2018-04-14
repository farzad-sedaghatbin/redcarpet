package ir.winners.redcarpet.service.mapper;

import ir.winners.redcarpet.domain.*;
import ir.winners.redcarpet.service.dto.MarketObjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MarketObject and its DTO MarketObjectDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MarketObjectMapper extends EntityMapper<MarketObjectDTO, MarketObject> {



    default MarketObject fromId(Long id) {
        if (id == null) {
            return null;
        }
        MarketObject marketObject = new MarketObject();
        marketObject.setId(id);
        return marketObject;
    }
}
