package ir.winners.redcarpet.repository.search;

import ir.winners.redcarpet.domain.Cermony;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Cermony entity.
 */
public interface CermonySearchRepository extends ElasticsearchRepository<Cermony, Long> {
}
