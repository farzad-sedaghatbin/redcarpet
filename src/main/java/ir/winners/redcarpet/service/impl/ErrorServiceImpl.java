package ir.winners.redcarpet.service.impl;

import ir.winners.redcarpet.service.ErrorService;
import ir.winners.redcarpet.domain.Error;
import ir.winners.redcarpet.repository.ErrorRepository;
import ir.winners.redcarpet.repository.search.ErrorSearchRepository;
import ir.winners.redcarpet.service.dto.ErrorDTO;
import ir.winners.redcarpet.service.mapper.ErrorMapper;
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
 * Service Implementation for managing Error.
 */
@Service
@Transactional
public class ErrorServiceImpl implements ErrorService {

    private final Logger log = LoggerFactory.getLogger(ErrorServiceImpl.class);

    private final ErrorRepository errorRepository;

    private final ErrorMapper errorMapper;

    private final ErrorSearchRepository errorSearchRepository;

    public ErrorServiceImpl(ErrorRepository errorRepository, ErrorMapper errorMapper, ErrorSearchRepository errorSearchRepository) {
        this.errorRepository = errorRepository;
        this.errorMapper = errorMapper;
        this.errorSearchRepository = errorSearchRepository;
    }

    /**
     * Save a error.
     *
     * @param errorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ErrorDTO save(ErrorDTO errorDTO) {
        log.debug("Request to save Error : {}", errorDTO);
        Error error = errorMapper.toEntity(errorDTO);
        error = errorRepository.save(error);
        ErrorDTO result = errorMapper.toDto(error);
        errorSearchRepository.save(error);
        return result;
    }

    /**
     * Get all the errors.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ErrorDTO> findAll() {
        log.debug("Request to get all Errors");
        return errorRepository.findAll().stream()
            .map(errorMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one error by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ErrorDTO findOne(Long id) {
        log.debug("Request to get Error : {}", id);
        Error error = errorRepository.findOne(id);
        return errorMapper.toDto(error);
    }

    /**
     * Delete the error by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Error : {}", id);
        errorRepository.delete(id);
        errorSearchRepository.delete(id);
    }

    /**
     * Search for the error corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ErrorDTO> search(String query) {
        log.debug("Request to search Errors for query {}", query);
        return StreamSupport
            .stream(errorSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(errorMapper::toDto)
            .collect(Collectors.toList());
    }
}
