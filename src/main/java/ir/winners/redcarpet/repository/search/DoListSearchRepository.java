package ir.winners.redcarpet.repository.search;

import ir.winners.redcarpet.domain.DoList;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DoList entity.
 */
public interface DoListSearchRepository extends ElasticsearchRepository<DoList, Long> {
}
