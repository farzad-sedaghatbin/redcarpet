package ir.winners.redcarpet.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CheckList entity.
 */
public class CheckListDTO implements Serializable {

    private Long id;

    private String item;

    private Long cermonyId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public Long getCermonyId() {
        return cermonyId;
    }

    public void setCermonyId(Long cermonyId) {
        this.cermonyId = cermonyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CheckListDTO checkListDTO = (CheckListDTO) o;
        if(checkListDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), checkListDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CheckListDTO{" +
            "id=" + getId() +
            ", item='" + getItem() + "'" +
            "}";
    }
}
