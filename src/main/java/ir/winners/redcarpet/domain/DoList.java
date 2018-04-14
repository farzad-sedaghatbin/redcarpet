package ir.winners.redcarpet.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DoList.
 */
@Entity
@Table(name = "do_list")
@Document(indexName = "dolist")
public class DoList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "checked")
    private Boolean checked;

    @ManyToOne
    private CheckList checkList;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isChecked() {
        return checked;
    }

    public DoList checked(Boolean checked) {
        this.checked = checked;
        return this;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    public CheckList getCheckList() {
        return checkList;
    }

    public DoList checkList(CheckList checkList) {
        this.checkList = checkList;
        return this;
    }

    public void setCheckList(CheckList checkList) {
        this.checkList = checkList;
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
        DoList doList = (DoList) o;
        if (doList.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), doList.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DoList{" +
            "id=" + getId() +
            ", checked='" + isChecked() + "'" +
            "}";
    }
}
