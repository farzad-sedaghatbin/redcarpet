package ir.winners.redcarpet.service.mapper;

import ir.winners.redcarpet.domain.*;
import ir.winners.redcarpet.service.dto.AdsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Ads and its DTO AdsDTO.
 */
@Mapper(componentModel = "spring", uses = {MerchantMapper.class})
public interface AdsMapper extends EntityMapper<AdsDTO, Ads> {

    @Mapping(source = "merchant.id", target = "merchantId")
    AdsDTO toDto(Ads ads);

    @Mapping(source = "merchantId", target = "merchant")
    Ads toEntity(AdsDTO adsDTO);

    default Ads fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ads ads = new Ads();
        ads.setId(id);
        return ads;
    }
}
