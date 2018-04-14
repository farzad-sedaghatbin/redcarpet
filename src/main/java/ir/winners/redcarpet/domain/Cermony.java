package ir.winners.redcarpet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import ir.winners.redcarpet.domain.enumeration.CermonyType;

/**
 * A Cermony.
 */
@Entity
@Table(name = "cermony")
@Document(indexName = "cermony")
public class Cermony implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "cermony_type")
    private CermonyType cermonyType;

    @OneToMany(mappedBy = "cermony")
    @JsonIgnore
    private Set<CheckList> checkLists = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CermonyType getCermonyType() {
        return cermonyType;
    }

    public Cermony cermonyType(CermonyType cermonyType) {
        this.cermonyType = cermonyType;
        return this;
    }

    public void setCermonyType(CermonyType cermonyType) {
        this.cermonyType = cermonyType;
    }

    public Set<CheckList> getCheckLists() {
        return checkLists;
    }

    public Cermony checkLists(Set<CheckList> checkLists) {
        this.checkLists = checkLists;
        return this;
    }

    public Cermony addCheckList(CheckList checkList) {
        this.checkLists.add(checkList);
        checkList.setCermony(this);
        return this;
    }

    public Cermony removeCheckList(CheckList checkList) {
        this.checkLists.remove(checkList);
        checkList.setCermony(null);
        return this;
    }

    public void setCheckLists(Set<CheckList> checkLists) {
        this.checkLists = checkLists;
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
        Cermony cermony = (Cermony) o;
        if (cermony.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cermony.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cermony{" +
            "id=" + getId() +
            ", cermonyType='" + getCermonyType() + "'" +
            "}";
    }
}
