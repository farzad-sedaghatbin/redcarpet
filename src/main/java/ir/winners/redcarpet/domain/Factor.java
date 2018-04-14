package ir.winners.redcarpet.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Factor.
 */
@Entity
@Table(name = "factor")
@Document(indexName = "factor")
public class Factor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "jhi_cost")
    private Long cost;

    @Column(name = "event_time")
    private ZonedDateTime eventTime;

    @Column(name = "done")
    private Boolean done;

    @Column(name = "jhi_uid")
    private String uid;

    @ManyToOne
    private MarketObject marketObject;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Factor name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Factor description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCost() {
        return cost;
    }

    public Factor cost(Long cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Long cost) {
        this.cost = cost;
    }

    public ZonedDateTime getEventTime() {
        return eventTime;
    }

    public Factor eventTime(ZonedDateTime eventTime) {
        this.eventTime = eventTime;
        return this;
    }

    public void setEventTime(ZonedDateTime eventTime) {
        this.eventTime = eventTime;
    }

    public Boolean isDone() {
        return done;
    }

    public Factor done(Boolean done) {
        this.done = done;
        return this;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public String getUid() {
        return uid;
    }

    public Factor uid(String uid) {
        this.uid = uid;
        return this;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public MarketObject getMarketObject() {
        return marketObject;
    }

    public Factor marketObject(MarketObject marketObject) {
        this.marketObject = marketObject;
        return this;
    }

    public void setMarketObject(MarketObject marketObject) {
        this.marketObject = marketObject;
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
        Factor factor = (Factor) o;
        if (factor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), factor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Factor{" +
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
