package ir.winners.redcarpet.service.impl;

import ir.winners.redcarpet.service.MerchantService;
import ir.winners.redcarpet.domain.Merchant;
import ir.winners.redcarpet.repository.MerchantRepository;
import ir.winners.redcarpet.repository.search.MerchantSearchRepository;
import ir.winners.redcarpet.service.dto.MerchantDTO;
import ir.winners.redcarpet.service.mapper.MerchantMapper;
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
 * Service Implementation for managing Merchant.
 */
@Service
@Transactional
public class MerchantServiceImpl implements MerchantService {

    private final Logger log = LoggerFactory.getLogger(MerchantServiceImpl.class);

    private final MerchantRepository merchantRepository;

    private final MerchantMapper merchantMapper;

    private final MerchantSearchRepository merchantSearchRepository;

    public MerchantServiceImpl(MerchantRepository merchantRepository, MerchantMapper merchantMapper, MerchantSearchRepository merchantSearchRepository) {
        this.merchantRepository = merchantRepository;
        this.merchantMapper = merchantMapper;
        this.merchantSearchRepository = merchantSearchRepository;
    }

    /**
     * Save a merchant.
     *
     * @param merchantDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MerchantDTO save(MerchantDTO merchantDTO) {
        log.debug("Request to save Merchant : {}", merchantDTO);
        Merchant merchant = merchantMapper.toEntity(merchantDTO);
        merchant = merchantRepository.save(merchant);
        MerchantDTO result = merchantMapper.toDto(merchant);
        merchantSearchRepository.save(merchant);
        return result;
    }

    /**
     * Get all the merchants.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MerchantDTO> findAll() {
        log.debug("Request to get all Merchants");
        return merchantRepository.findAll().stream()
            .map(merchantMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one merchant by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MerchantDTO findOne(Long id) {
        log.debug("Request to get Merchant : {}", id);
        Merchant merchant = merchantRepository.findOne(id);
        return merchantMapper.toDto(merchant);
    }

    /**
     * Delete the merchant by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Merchant : {}", id);
        merchantRepository.delete(id);
        merchantSearchRepository.delete(id);
    }

    /**
     * Search for the merchant corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MerchantDTO> search(String query) {
        log.debug("Request to search Merchants for query {}", query);
        return StreamSupport
            .stream(merchantSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(merchantMapper::toDto)
            .collect(Collectors.toList());
    }
}
