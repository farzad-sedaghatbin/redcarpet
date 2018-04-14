package ir.winners.redcarpet.repository.search;

import ir.winners.redcarpet.domain.MarketObject;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MarketObject entity.
 */
public interface MarketObjectSearchRepository extends ElasticsearchRepository<MarketObject, Long> {
}
