package ir.winners.redcarpet.repository.search;

import ir.winners.redcarpet.domain.Rating;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Rating entity.
 */
public interface RatingSearchRepository extends ElasticsearchRepository<Rating, Long> {
}
