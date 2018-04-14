package ir.winners.redcarpet.service.mapper;

import ir.winners.redcarpet.domain.*;
import ir.winners.redcarpet.service.dto.ChatDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Chat and its DTO ChatDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ChatMapper extends EntityMapper<ChatDTO, Chat> {



    default Chat fromId(Long id) {
        if (id == null) {
            return null;
        }
        Chat chat = new Chat();
        chat.setId(id);
        return chat;
    }
}
