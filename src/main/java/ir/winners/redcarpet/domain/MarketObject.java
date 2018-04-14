package ir.winners.redcarpet.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import ir.winners.redcarpet.domain.enumeration.MarketType;

/**
 * A MarketObject.
 */
@Entity
@Table(name = "market_object")
@Document(indexName = "marketobject")
public class MarketObject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "price")
    private Integer price;

    @Enumerated(EnumType.STRING)
    @Column(name = "market_type")
    private MarketType marketType;

    @Column(name = "discount")
    private Integer discount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPrice() {
        return price;
    }

    public MarketObject price(Integer price) {
        this.price = price;
        return this;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public MarketType getMarketType() {
        return marketType;
    }

    public MarketObject marketType(MarketType marketType) {
        this.marketType = marketType;
        return this;
    }

    public void setMarketType(MarketType marketType) {
        this.marketType = marketType;
    }

    public Integer getDiscount() {
        return discount;
    }

    public MarketObject discount(Integer discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
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
        MarketObject marketObject = (MarketObject) o;
        if (marketObject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), marketObject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MarketObject{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", marketType='" + getMarketType() + "'" +
            ", discount=" + getDiscount() +
            "}";
    }
}
