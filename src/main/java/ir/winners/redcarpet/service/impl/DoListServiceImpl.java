package ir.winners.redcarpet.service.impl;

import ir.winners.redcarpet.service.DoListService;
import ir.winners.redcarpet.domain.DoList;
import ir.winners.redcarpet.repository.DoListRepository;
import ir.winners.redcarpet.repository.search.DoListSearchRepository;
import ir.winners.redcarpet.service.dto.DoListDTO;
import ir.winners.redcarpet.service.mapper.DoListMapper;
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
 * Service Implementation for managing DoList.
 */
@Service
@Transactional
public class DoListServiceImpl implements DoListService {

    private final Logger log = LoggerFactory.getLogger(DoListServiceImpl.class);

    private final DoListRepository doListRepository;

    private final DoListMapper doListMapper;

    private final DoListSearchRepository doListSearchRepository;

    public DoListServiceImpl(DoListRepository doListRepository, DoListMapper doListMapper, DoListSearchRepository doListSearchRepository) {
        this.doListRepository = doListRepository;
        this.doListMapper = doListMapper;
        this.doListSearchRepository = doListSearchRepository;
    }

    /**
     * Save a doList.
     *
     * @param doListDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DoListDTO save(DoListDTO doListDTO) {
        log.debug("Request to save DoList : {}", doListDTO);
        DoList doList = doListMapper.toEntity(doListDTO);
        doList = doListRepository.save(doList);
        DoListDTO result = doListMapper.toDto(doList);
        doListSearchRepository.save(doList);
        return result;
    }

    /**
     * Get all the doLists.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DoListDTO> findAll() {
        log.debug("Request to get all DoLists");
        return doListRepository.findAll().stream()
            .map(doListMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one doList by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DoListDTO findOne(Long id) {
        log.debug("Request to get DoList : {}", id);
        DoList doList = doListRepository.findOne(id);
        return doListMapper.toDto(doList);
    }

    /**
     * Delete the doList by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DoList : {}", id);
        doListRepository.delete(id);
        doListSearchRepository.delete(id);
    }

    /**
     * Search for the doList corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DoListDTO> search(String query) {
        log.debug("Request to search DoLists for query {}", query);
        return StreamSupport
            .stream(doListSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(doListMapper::toDto)
            .collect(Collectors.toList());
    }
}
