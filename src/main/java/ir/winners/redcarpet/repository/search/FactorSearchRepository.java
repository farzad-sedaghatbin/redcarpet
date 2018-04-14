package ir.winners.redcarpet.repository.search;

import ir.winners.redcarpet.domain.Factor;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Factor entity.
 */
public interface FactorSearchRepository extends ElasticsearchRepository<Factor, Long> {
}
