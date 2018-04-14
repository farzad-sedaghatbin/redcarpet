package ir.winners.redcarpet.service.mapper;

import ir.winners.redcarpet.domain.*;
import ir.winners.redcarpet.service.dto.MediaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Media and its DTO MediaDTO.
 */
@Mapper(componentModel = "spring", uses = {MerchantMapper.class})
public interface MediaMapper extends EntityMapper<MediaDTO, Media> {

    @Mapping(source = "merchant.id", target = "merchantId")
    MediaDTO toDto(Media media);

    @Mapping(source = "merchantId", target = "merchant")
    Media toEntity(MediaDTO mediaDTO);

    default Media fromId(Long id) {
        if (id == null) {
            return null;
        }
        Media media = new Media();
        media.setId(id);
        return media;
    }
}
