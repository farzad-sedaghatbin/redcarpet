package ir.winners.redcarpet.repository.search;

import ir.winners.redcarpet.domain.CheckList;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CheckList entity.
 */
public interface CheckListSearchRepository extends ElasticsearchRepository<CheckList, Long> {
}
