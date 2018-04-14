package ir.winners.redcarpet.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Error.
 */
@Entity
@Table(name = "error")
@Document(indexName = "error")
public class Error implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "moment")
    private ZonedDateTime moment;

    @Column(name = "jhi_log")
    private String log;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getMoment() {
        return moment;
    }

    public Error moment(ZonedDateTime moment) {
        this.moment = moment;
        return this;
    }

    public void setMoment(ZonedDateTime moment) {
        this.moment = moment;
    }

    public String getLog() {
        return log;
    }

    public Error log(String log) {
        this.log = log;
        return this;
    }

    public void setLog(String log) {
        this.log = log;
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
        Error error = (Error) o;
        if (error.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), error.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Error{" +
            "id=" + getId() +
            ", moment='" + getMoment() + "'" +
            ", log='" + getLog() + "'" +
            "}";
    }
}
