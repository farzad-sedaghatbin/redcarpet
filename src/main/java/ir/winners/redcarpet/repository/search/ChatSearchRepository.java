package ir.winners.redcarpet.repository.search;

import ir.winners.redcarpet.domain.Chat;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Chat entity.
 */
public interface ChatSearchRepository extends ElasticsearchRepository<Chat, Long> {
}
