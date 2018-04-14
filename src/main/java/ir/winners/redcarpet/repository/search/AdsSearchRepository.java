package ir.winners.redcarpet.repository.search;

import ir.winners.redcarpet.domain.Ads;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Ads entity.
 */
public interface AdsSearchRepository extends ElasticsearchRepository<Ads, Long> {
}
