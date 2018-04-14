package ir.winners.redcarpet.service.mapper;

import ir.winners.redcarpet.domain.*;
import ir.winners.redcarpet.service.dto.RatingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Rating and its DTO RatingDTO.
 */
@Mapper(componentModel = "spring", uses = {MerchantMapper.class})
public interface RatingMapper extends EntityMapper<RatingDTO, Rating> {



    default Rating fromId(Long id) {
        if (id == null) {
            return null;
        }
        Rating rating = new Rating();
        rating.setId(id);
        return rating;
    }
}
