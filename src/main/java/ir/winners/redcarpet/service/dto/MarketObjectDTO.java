package ir.winners.redcarpet.service.dto;


import java.io.Serializable;
import java.util.Objects;
import ir.winners.redcarpet.domain.enumeration.MarketType;

/**
 * A DTO for the MarketObject entity.
 */
public class MarketObjectDTO implements Serializable {

    private Long id;

    private Integer price;

    private MarketType marketType;

    private Integer discount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public MarketType getMarketType() {
        return marketType;
    }

    public void setMarketType(MarketType marketType) {
        this.marketType = marketType;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MarketObjectDTO marketObjectDTO = (MarketObjectDTO) o;
        if(marketObjectDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), marketObjectDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MarketObjectDTO{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", marketType='" + getMarketType() + "'" +
            ", discount=" + getDiscount() +
            "}";
    }
}
