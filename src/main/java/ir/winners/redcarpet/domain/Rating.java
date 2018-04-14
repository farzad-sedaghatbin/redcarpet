package ir.winners.redcarpet.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Rating.
 */
@Entity
@Table(name = "rating")
@Document(indexName = "rating")
public class Rating implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_value")
    private Integer value;

    @ManyToMany
    @JoinTable(name = "rating_merchant",
               joinColumns = @JoinColumn(name="ratings_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="merchants_id", referencedColumnName="id"))
    private Set<Merchant> merchants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getValue() {
        return value;
    }

    public Rating value(Integer value) {
        this.value = value;
        return this;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Set<Merchant> getMerchants() {
        return merchants;
    }

    public Rating merchants(Set<Merchant> merchants) {
        this.merchants = merchants;
        return this;
    }

    public Rating addMerchant(Merchant merchant) {
        this.merchants.add(merchant);
        merchant.getRatings().add(this);
        return this;
    }

    public Rating removeMerchant(Merchant merchant) {
        this.merchants.remove(merchant);
        merchant.getRatings().remove(this);
        return this;
    }

    public void setMerchants(Set<Merchant> merchants) {
        this.merchants = merchants;
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
        Rating rating = (Rating) o;
        if (rating.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rating.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rating{" +
            "id=" + getId() +
            ", value=" + getValue() +
            "}";
    }
}
