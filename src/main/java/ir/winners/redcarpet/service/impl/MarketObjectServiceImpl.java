package ir.winners.redcarpet.service.impl;

import ir.winners.redcarpet.service.MarketObjectService;
import ir.winners.redcarpet.domain.MarketObject;
import ir.winners.redcarpet.repository.MarketObjectRepository;
import ir.winners.redcarpet.repository.search.MarketObjectSearchRepository;
import ir.winners.redcarpet.service.dto.MarketObjectDTO;
import ir.winners.redcarpet.service.mapper.MarketObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing MarketObject.
 */
@Service
@Transactional
public class MarketObjectServiceImpl implements MarketObjectService {

    private final Logger log = LoggerFactory.getLogger(MarketObjectServiceImpl.class);

    private final MarketObjectRepository marketObjectRepository;

    private final MarketObjectMapper marketObjectMapper;

    private final MarketObjectSearchRepository marketObjectSearchRepository;

    public MarketObjectServiceImpl(MarketObjectRepository marketObjectRepository, MarketObjectMapper marketObjectMapper, MarketObjectSearchRepository marketObjectSearchRepository) {
        this.marketObjectRepository = marketObjectRepository;
        this.marketObjectMapper = marketObjectMapper;
        this.marketObjectSearchRepository = marketObjectSearchRepository;
    }

    /**
     * Save a marketObject.
     *
     * @param marketObjectDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MarketObjectDTO save(MarketObjectDTO marketObjectDTO) {
        log.debug("Request to save MarketObject : {}", marketObjectDTO);
        MarketObject marketObject = marketObjectMapper.toEntity(marketObjectDTO);
        marketObject = marketObjectRepository.save(marketObject);
        MarketObjectDTO result = marketObjectMapper.toDto(marketObject);
        marketObjectSearchRepository.save(marketObject);
        return result;
    }

    /**
     * Get all the marketObjects.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MarketObjectDTO> findAll() {
        log.debug("Request to get all MarketObjects");
        return marketObjectRepository.findAll().stream()
            .map(marketObjectMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one marketObject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MarketObjectDTO findOne(Long id) {
        log.debug("Request to get MarketObject : {}", id);
        MarketObject marketObject = marketObjectRepository.findOne(id);
        return marketObjectMapper.toDto(marketObject);
    }

    /**
     * Delete the marketObject by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MarketObject : {}", id);
        marketObjectRepository.delete(id);
        marketObjectSearchRepository.delete(id);
    }

    /**
     * Search for the marketObject corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MarketObjectDTO> search(String query) {
        log.debug("Request to search MarketObjects for query {}", query);
        return StreamSupport
            .stream(marketObjectSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(marketObjectMapper::toDto)
            .collect(Collectors.toList());
    }
}
