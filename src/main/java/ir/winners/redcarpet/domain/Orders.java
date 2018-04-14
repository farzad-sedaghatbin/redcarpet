package ir.winners.redcarpet.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import ir.winners.redcarpet.domain.enumeration.CermonyType;

/**
 * A Orders.
 */
@Entity
@Table(name = "orders")
@Document(indexName = "orders")
public class Orders implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "guest_no")
    private Integer guestNo;

    @Enumerated(EnumType.STRING)
    @Column(name = "cermony_type")
    private CermonyType cermonyType;

    @Column(name = "location")
    private String location;

    @Column(name = "description")
    private String description;

    @Column(name = "budget")
    private String budget;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGuestNo() {
        return guestNo;
    }

    public Orders guestNo(Integer guestNo) {
        this.guestNo = guestNo;
        return this;
    }

    public void setGuestNo(Integer guestNo) {
        this.guestNo = guestNo;
    }

    public CermonyType getCermonyType() {
        return cermonyType;
    }

    public Orders cermonyType(CermonyType cermonyType) {
        this.cermonyType = cermonyType;
        return this;
    }

    public void setCermonyType(CermonyType cermonyType) {
        this.cermonyType = cermonyType;
    }

    public String getLocation() {
        return location;
    }

    public Orders location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public Orders description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBudget() {
        return budget;
    }

    public Orders budget(String budget) {
        this.budget = budget;
        return this;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Orders orders = (Orders) o;
        if (orders.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orders.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Orders{" +
            "id=" + getId() +
            ", guestNo=" + getGuestNo() +
            ", cermonyType='" + getCermonyType() + "'" +
            ", location='" + getLocation() + "'" +
            ", description='" + getDescription() + "'" +
            ", budget='" + getBudget() + "'" +
            "}";
    }
}
