package ir.winners.redcarpet.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A CheckList.
 */
@Entity
@Table(name = "check_list")
@Document(indexName = "checklist")
public class CheckList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "item")
    private String item;

    @ManyToOne
    private Cermony cermony;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItem() {
        return item;
    }

    public CheckList item(String item) {
        this.item = item;
        return this;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public Cermony getCermony() {
        return cermony;
    }

    public CheckList cermony(Cermony cermony) {
        this.cermony = cermony;
        return this;
    }

    public void setCermony(Cermony cermony) {
        this.cermony = cermony;
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
        CheckList checkList = (CheckList) o;
        if (checkList.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), checkList.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CheckList{" +
            "id=" + getId() +
            ", item='" + getItem() + "'" +
            "}";
    }
}
