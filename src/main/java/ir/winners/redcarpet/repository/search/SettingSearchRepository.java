package ir.winners.redcarpet.repository.search;

import ir.winners.redcarpet.domain.Setting;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Setting entity.
 */
public interface SettingSearchRepository extends ElasticsearchRepository<Setting, Long> {
}
