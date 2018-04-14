package ir.winners.redcarpet.service.impl;

import ir.winners.redcarpet.service.CermonyService;
import ir.winners.redcarpet.domain.Cermony;
import ir.winners.redcarpet.repository.CermonyRepository;
import ir.winners.redcarpet.repository.search.CermonySearchRepository;
import ir.winners.redcarpet.service.dto.CermonyDTO;
import ir.winners.redcarpet.service.mapper.CermonyMapper;
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
 * Service Implementation for managing Cermony.
 */
@Service
@Transactional
public class CermonyServiceImpl implements CermonyService {

    private final Logger log = LoggerFactory.getLogger(CermonyServiceImpl.class);

    private final CermonyRepository cermonyRepository;

    private final CermonyMapper cermonyMapper;

    private final CermonySearchRepository cermonySearchRepository;

    public CermonyServiceImpl(CermonyRepository cermonyRepository, CermonyMapper cermonyMapper, CermonySearchRepository cermonySearchRepository) {
        this.cermonyRepository = cermonyRepository;
        this.cermonyMapper = cermonyMapper;
        this.cermonySearchRepository = cermonySearchRepository;
    }

    /**
     * Save a cermony.
     *
     * @param cermonyDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CermonyDTO save(CermonyDTO cermonyDTO) {
        log.debug("Request to save Cermony : {}", cermonyDTO);
        Cermony cermony = cermonyMapper.toEntity(cermonyDTO);
        cermony = cermonyRepository.save(cermony);
        CermonyDTO result = cermonyMapper.toDto(cermony);
        cermonySearchRepository.save(cermony);
        return result;
    }

    /**
     * Get all the cermonies.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CermonyDTO> findAll() {
        log.debug("Request to get all Cermonies");
        return cermonyRepository.findAll().stream()
            .map(cermonyMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one cermony by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CermonyDTO findOne(Long id) {
        log.debug("Request to get Cermony : {}", id);
        Cermony cermony = cermonyRepository.findOne(id);
        return cermonyMapper.toDto(cermony);
    }

    /**
     * Delete the cermony by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cermony : {}", id);
        cermonyRepository.delete(id);
        cermonySearchRepository.delete(id);
    }

    /**
     * Search for the cermony corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CermonyDTO> search(String query) {
        log.debug("Request to search Cermonies for query {}", query);
        return StreamSupport
            .stream(cermonySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(cermonyMapper::toDto)
            .collect(Collectors.toList());
    }
}
