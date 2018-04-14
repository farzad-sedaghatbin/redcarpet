package ir.winners.redcarpet.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ir.winners.redcarpet.domain.enumeration.CermonyType;

/**
 * A DTO for the Cermony entity.
 */
public class CermonyDTO implements Serializable {

    private Long id;

    private CermonyType cermonyType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CermonyType getCermonyType() {
        return cermonyType;
    }

    public void setCermonyType(CermonyType cermonyType) {
        this.cermonyType = cermonyType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CermonyDTO cermonyDTO = (CermonyDTO) o;
        if(cermonyDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cermonyDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CermonyDTO{" +
            "id=" + getId() +
            ", cermonyType='" + getCermonyType() + "'" +
            "}";
    }
}
