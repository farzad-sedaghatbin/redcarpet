package ir.winners.redcarpet.repository.search;

import ir.winners.redcarpet.domain.Merchant;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Merchant entity.
 */
public interface MerchantSearchRepository extends ElasticsearchRepository<Merchant, Long> {
}
