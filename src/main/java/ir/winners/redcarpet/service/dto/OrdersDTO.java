package ir.winners.redcarpet.service.dto;


import java.io.Serializable;
import java.util.Objects;
import ir.winners.redcarpet.domain.enumeration.CermonyType;

/**
 * A DTO for the Orders entity.
 */
public class OrdersDTO implements Serializable {

    private Long id;

    private Integer guestNo;

    private CermonyType cermonyType;

    private String location;

    private String description;

    private String budget;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGuestNo() {
        return guestNo;
    }

    public void setGuestNo(Integer guestNo) {
        this.guestNo = guestNo;
    }

    public CermonyType getCermonyType() {
        return cermonyType;
    }

    public void setCermonyType(CermonyType cermonyType) {
        this.cermonyType = cermonyType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrdersDTO ordersDTO = (OrdersDTO) o;
        if(ordersDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ordersDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrdersDTO{" +
            "id=" + getId() +
            ", guestNo=" + getGuestNo() +
            ", cermonyType='" + getCermonyType() + "'" +
            ", location='" + getLocation() + "'" +
            ", description='" + getDescription() + "'" +
            ", budget='" + getBudget() + "'" +
            "}";
    }
}
