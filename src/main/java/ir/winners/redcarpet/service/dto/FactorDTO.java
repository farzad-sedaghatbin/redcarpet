package ir.winners.redcarpet.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Factor entity.
 */
public class FactorDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private Long cost;

    private ZonedDateTime eventTime;

    private Boolean done;

    private String uid;

    private Long marketObjectId;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCost() {
        return cost;
    }

    public void setCost(Long cost) {
        this.cost = cost;
    }

    public ZonedDateTime getEventTime() {
        return eventTime;
    }

    public void setEventTime(ZonedDateTime eventTime) {
        this.eventTime = eventTime;
    }

    public Boolean isDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public Long getMarketObjectId() {
        return marketObjectId;
    }

    public void setMarketObjectId(Long marketObjectId) {
        this.marketObjectId = marketObjectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FactorDTO factorDTO = (FactorDTO) o;
        if(factorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), factorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FactorDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", cost=" + getCost() +
            ", eventTime='" + getEventTime() + "'" +
            ", done='" + isDone() + "'" +
            ", uid='" + getUid() + "'" +
            "}";
    }
}
