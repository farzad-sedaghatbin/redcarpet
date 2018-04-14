package ir.winners.redcarpet.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Chat entity.
 */
public class ChatDTO implements Serializable {

    private Long id;

    private String message;

    private ZonedDateTime chatTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ZonedDateTime getChatTime() {
        return chatTime;
    }

    public void setChatTime(ZonedDateTime chatTime) {
        this.chatTime = chatTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ChatDTO chatDTO = (ChatDTO) o;
        if(chatDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chatDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChatDTO{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            ", chatTime='" + getChatTime() + "'" +
            "}";
    }
}
