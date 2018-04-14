package ir.winners.redcarpet.service.impl;

import ir.winners.redcarpet.service.AdsService;
import ir.winners.redcarpet.domain.Ads;
import ir.winners.redcarpet.repository.AdsRepository;
import ir.winners.redcarpet.repository.search.AdsSearchRepository;
import ir.winners.redcarpet.service.dto.AdsDTO;
import ir.winners.redcarpet.service.mapper.AdsMapper;
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
 * Service Implementation for managing Ads.
 */
@Service
@Transactional
public class AdsServiceImpl implements AdsService {

    private final Logger log = LoggerFactory.getLogger(AdsServiceImpl.class);

    private final AdsRepository adsRepository;

    private final AdsMapper adsMapper;

    private final AdsSearchRepository adsSearchRepository;

    public AdsServiceImpl(AdsRepository adsRepository, AdsMapper adsMapper, AdsSearchRepository adsSearchRepository) {
        this.adsRepository = adsRepository;
        this.adsMapper = adsMapper;
        this.adsSearchRepository = adsSearchRepository;
    }

    /**
     * Save a ads.
     *
     * @param adsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AdsDTO save(AdsDTO adsDTO) {
        log.debug("Request to save Ads : {}", adsDTO);
        Ads ads = adsMapper.toEntity(adsDTO);
        ads = adsRepository.save(ads);
        AdsDTO result = adsMapper.toDto(ads);
        adsSearchRepository.save(ads);
        return result;
    }

    /**
     * Get all the ads.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AdsDTO> findAll() {
        log.debug("Request to get all Ads");
        return adsRepository.findAll().stream()
            .map(adsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one ads by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AdsDTO findOne(Long id) {
        log.debug("Request to get Ads : {}", id);
        Ads ads = adsRepository.findOne(id);
        return adsMapper.toDto(ads);
    }

    /**
     * Delete the ads by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ads : {}", id);
        adsRepository.delete(id);
        adsSearchRepository.delete(id);
    }

    /**
     * Search for the ads corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AdsDTO> search(String query) {
        log.debug("Request to search Ads for query {}", query);
        return StreamSupport
            .stream(adsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(adsMapper::toDto)
            .collect(Collectors.toList());
    }
}
