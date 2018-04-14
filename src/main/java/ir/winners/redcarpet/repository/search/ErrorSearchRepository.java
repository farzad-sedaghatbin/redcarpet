package ir.winners.redcarpet.repository.search;

import ir.winners.redcarpet.domain.Error;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Error entity.
 */
public interface ErrorSearchRepository extends ElasticsearchRepository<Error, Long> {
}
