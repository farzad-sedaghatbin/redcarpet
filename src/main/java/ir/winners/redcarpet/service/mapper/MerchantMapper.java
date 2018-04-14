package ir.winners.redcarpet.service.mapper;

import ir.winners.redcarpet.domain.*;
import ir.winners.redcarpet.service.dto.MerchantDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Merchant and its DTO MerchantDTO.
 */
@Mapper(componentModel = "spring", uses = {MediaMapper.class})
public interface MerchantMapper extends EntityMapper<MerchantDTO, Merchant> {

    @Mapping(source = "logo.id", target = "logoId")
    MerchantDTO toDto(Merchant merchant);

    @Mapping(source = "logoId", target = "logo")
    @Mapping(target = "ads", ignore = true)
    @Mapping(target = "services", ignore = true)
    @Mapping(target = "media", ignore = true)
    @Mapping(target = "ratings", ignore = true)
    @Mapping(target = "comments", ignore = true)
    Merchant toEntity(MerchantDTO merchantDTO);

    default Merchant fromId(Long id) {
        if (id == null) {
            return null;
        }
        Merchant merchant = new Merchant();
        merchant.setId(id);
        return merchant;
    }
}
