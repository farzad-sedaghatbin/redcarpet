package ir.winners.redcarpet.service.impl;

import ir.winners.redcarpet.service.CheckListService;
import ir.winners.redcarpet.domain.CheckList;
import ir.winners.redcarpet.repository.CheckListRepository;
import ir.winners.redcarpet.repository.search.CheckListSearchRepository;
import ir.winners.redcarpet.service.dto.CheckListDTO;
import ir.winners.redcarpet.service.mapper.CheckListMapper;
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
 * Service Implementation for managing CheckList.
 */
@Service
@Transactional
public class CheckListServiceImpl implements CheckListService {

    private final Logger log = LoggerFactory.getLogger(CheckListServiceImpl.class);

    private final CheckListRepository checkListRepository;

    private final CheckListMapper checkListMapper;

    private final CheckListSearchRepository checkListSearchRepository;

    public CheckListServiceImpl(CheckListRepository checkListRepository, CheckListMapper checkListMapper, CheckListSearchRepository checkListSearchRepository) {
        this.checkListRepository = checkListRepository;
        this.checkListMapper = checkListMapper;
        this.checkListSearchRepository = checkListSearchRepository;
    }

    /**
     * Save a checkList.
     *
     * @param checkListDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CheckListDTO save(CheckListDTO checkListDTO) {
        log.debug("Request to save CheckList : {}", checkListDTO);
        CheckList checkList = checkListMapper.toEntity(checkListDTO);
        checkList = checkListRepository.save(checkList);
        CheckListDTO result = checkListMapper.toDto(checkList);
        checkListSearchRepository.save(checkList);
        return result;
    }

    /**
     * Get all the checkLists.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CheckListDTO> findAll() {
        log.debug("Request to get all CheckLists");
        return checkListRepository.findAll().stream()
            .map(checkListMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one checkList by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CheckListDTO findOne(Long id) {
        log.debug("Request to get CheckList : {}", id);
        CheckList checkList = checkListRepository.findOne(id);
        return checkListMapper.toDto(checkList);
    }

    /**
     * Delete the checkList by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CheckList : {}", id);
        checkListRepository.delete(id);
        checkListSearchRepository.delete(id);
    }

    /**
     * Search for the checkList corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CheckListDTO> search(String query) {
        log.debug("Request to search CheckLists for query {}", query);
        return StreamSupport
            .stream(checkListSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(checkListMapper::toDto)
            .collect(Collectors.toList());
    }
}
