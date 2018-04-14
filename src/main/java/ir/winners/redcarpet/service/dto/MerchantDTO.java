package ir.winners.redcarpet.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ir.winners.redcarpet.domain.enumeration.MerchatType;
import ir.winners.redcarpet.domain.enumeration.ClassType;

/**
 * A DTO for the Merchant entity.
 */
public class MerchantDTO implements Serializable {

    private Long id;

    private String name;

    private MerchatType type;

    private ClassType range;

    private Long logoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MerchatType getType() {
        return type;
    }

    public void setType(MerchatType type) {
        this.type = type;
    }

    public ClassType getRange() {
        return range;
    }

    public void setRange(ClassType range) {
        this.range = range;
    }

    public Long getLogoId() {
        return logoId;
    }

    public void setLogoId(Long mediaId) {
        this.logoId = mediaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MerchantDTO merchantDTO = (MerchantDTO) o;
        if(merchantDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), merchantDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MerchantDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", range='" + getRange() + "'" +
            "}";
    }
}
