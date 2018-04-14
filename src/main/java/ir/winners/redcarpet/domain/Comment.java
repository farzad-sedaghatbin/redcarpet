package ir.winners.redcarpet.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Comment.
 */
@Entity
@Table(name = "comment")
@Document(indexName = "comment")
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "message")
    private String message;

    @ManyToMany
    @JoinTable(name = "comment_merchant",
               joinColumns = @JoinColumn(name="comments_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="merchants_id", referencedColumnName="id"))
    private Set<Merchant> merchants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public Comment message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Set<Merchant> getMerchants() {
        return merchants;
    }

    public Comment merchants(Set<Merchant> merchants) {
        this.merchants = merchants;
        return this;
    }

    public Comment addMerchant(Merchant merchant) {
        this.merchants.add(merchant);
        merchant.getComments().add(this);
        return this;
    }

    public Comment removeMerchant(Merchant merchant) {
        this.merchants.remove(merchant);
        merchant.getComments().remove(this);
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
        Comment comment = (Comment) o;
        if (comment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Comment{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            "}";
    }
}
