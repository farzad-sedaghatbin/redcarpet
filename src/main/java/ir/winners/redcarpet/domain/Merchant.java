package ir.winners.redcarpet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import ir.winners.redcarpet.domain.enumeration.MerchatType;

import ir.winners.redcarpet.domain.enumeration.ClassType;

/**
 * A Merchant.
 */
@Entity
@Table(name = "merchant")
@Document(indexName = "merchant")
public class Merchant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private MerchatType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_range")
    private ClassType range;

    @OneToOne
    @JoinColumn(unique = true)
    private Media logo;

    @OneToMany(mappedBy = "merchant")
    @JsonIgnore
    private Set<Ads> ads = new HashSet<>();

    @OneToMany(mappedBy = "merchant")
    @JsonIgnore
    private Set<Service> services = new HashSet<>();

    @OneToMany(mappedBy = "merchant")
    @JsonIgnore
    private Set<Media> media = new HashSet<>();

    @ManyToMany(mappedBy = "merchants")
    @JsonIgnore
    private Set<Rating> ratings = new HashSet<>();

    @ManyToMany(mappedBy = "merchants")
    @JsonIgnore
    private Set<Comment> comments = new HashSet<>();

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

    public Merchant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MerchatType getType() {
        return type;
    }

    public Merchant type(MerchatType type) {
        this.type = type;
        return this;
    }

    public void setType(MerchatType type) {
        this.type = type;
    }

    public ClassType getRange() {
        return range;
    }

    public Merchant range(ClassType range) {
        this.range = range;
        return this;
    }

    public void setRange(ClassType range) {
        this.range = range;
    }

    public Media getLogo() {
        return logo;
    }

    public Merchant logo(Media media) {
        this.logo = media;
        return this;
    }

    public void setLogo(Media media) {
        this.logo = media;
    }

    public Set<Ads> getAds() {
        return ads;
    }

    public Merchant ads(Set<Ads> ads) {
        this.ads = ads;
        return this;
    }

    public Merchant addAds(Ads ads) {
        this.ads.add(ads);
        ads.setMerchant(this);
        return this;
    }

    public Merchant removeAds(Ads ads) {
        this.ads.remove(ads);
        ads.setMerchant(null);
        return this;
    }

    public void setAds(Set<Ads> ads) {
        this.ads = ads;
    }

    public Set<Service> getServices() {
        return services;
    }

    public Merchant services(Set<Service> services) {
        this.services = services;
        return this;
    }

    public Merchant addService(Service service) {
        this.services.add(service);
        service.setMerchant(this);
        return this;
    }

    public Merchant removeService(Service service) {
        this.services.remove(service);
        service.setMerchant(null);
        return this;
    }

    public void setServices(Set<Service> services) {
        this.services = services;
    }

    public Set<Media> getMedia() {
        return media;
    }

    public Merchant media(Set<Media> media) {
        this.media = media;
        return this;
    }

    public Merchant addMedia(Media media) {
        this.media.add(media);
        media.setMerchant(this);
        return this;
    }

    public Merchant removeMedia(Media media) {
        this.media.remove(media);
        media.setMerchant(null);
        return this;
    }

    public void setMedia(Set<Media> media) {
        this.media = media;
    }

    public Set<Rating> getRatings() {
        return ratings;
    }

    public Merchant ratings(Set<Rating> ratings) {
        this.ratings = ratings;
        return this;
    }

    public Merchant addRating(Rating rating) {
        this.ratings.add(rating);
        rating.getMerchants().add(this);
        return this;
    }

    public Merchant removeRating(Rating rating) {
        this.ratings.remove(rating);
        rating.getMerchants().remove(this);
        return this;
    }

    public void setRatings(Set<Rating> ratings) {
        this.ratings = ratings;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Merchant comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Merchant addComment(Comment comment) {
        this.comments.add(comment);
        comment.getMerchants().add(this);
        return this;
    }

    public Merchant removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.getMerchants().remove(this);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
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
        Merchant merchant = (Merchant) o;
        if (merchant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), merchant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Merchant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", range='" + getRange() + "'" +
            "}";
    }
}
