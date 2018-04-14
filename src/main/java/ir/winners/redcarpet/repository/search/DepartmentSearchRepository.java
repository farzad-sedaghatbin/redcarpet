package ir.winners.redcarpet.repository.search;

import ir.winners.redcarpet.domain.Department;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Department entity.
 */
public interface DepartmentSearchRepository extends ElasticsearchRepository<Department, Long> {
}
