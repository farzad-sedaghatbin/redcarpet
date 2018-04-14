package ir.winners.redcarpet.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the DoList entity.
 */
public class DoListDTO implements Serializable {

    private Long id;

    private Boolean checked;

    private Long checkListId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    public Long getCheckListId() {
        return checkListId;
    }

    public void setCheckListId(Long checkListId) {
        this.checkListId = checkListId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DoListDTO doListDTO = (DoListDTO) o;
        if(doListDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), doListDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DoListDTO{" +
            "id=" + getId() +
            ", checked='" + isChecked() + "'" +
            "}";
    }
}
