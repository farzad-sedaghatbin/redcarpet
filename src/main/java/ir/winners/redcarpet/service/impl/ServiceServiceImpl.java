package ir.winners.redcarpet.service.impl;

import ir.winners.redcarpet.service.ServiceService;
import ir.winners.redcarpet.domain.Service;
import ir.winners.redcarpet.repository.ServiceRepository;
import ir.winners.redcarpet.repository.search.ServiceSearchRepository;
import ir.winners.redcarpet.service.dto.ServiceDTO;
import ir.winners.redcarpet.service.mapper.ServiceMapper;
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
 * Service Implementation for managing Service.
 */
@Service
@Transactional
public class ServiceServiceImpl implements ServiceService {

    private final Logger log = LoggerFactory.getLogger(ServiceServiceImpl.class);

    private final ServiceRepository serviceRepository;

    private final ServiceMapper serviceMapper;

    private final ServiceSearchRepository serviceSearchRepository;

    public ServiceServiceImpl(ServiceRepository serviceRepository, ServiceMapper serviceMapper, ServiceSearchRepository serviceSearchRepository) {
        this.serviceRepository = serviceRepository;
        this.serviceMapper = serviceMapper;
        this.serviceSearchRepository = serviceSearchRepository;
    }

    /**
     * Save a service.
     *
     * @param serviceDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ServiceDTO save(ServiceDTO serviceDTO) {
        log.debug("Request to save Service : {}", serviceDTO);
        Service service = serviceMapper.toEntity(serviceDTO);
        service = serviceRepository.save(service);
        ServiceDTO result = serviceMapper.toDto(service);
        serviceSearchRepository.save(service);
        return result;
    }

    /**
     * Get all the services.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ServiceDTO> findAll() {
        log.debug("Request to get all Services");
        return serviceRepository.findAll().stream()
            .map(serviceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one service by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ServiceDTO findOne(Long id) {
        log.debug("Request to get Service : {}", id);
        Service service = serviceRepository.findOne(id);
        return serviceMapper.toDto(service);
    }

    /**
     * Delete the service by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Service : {}", id);
        serviceRepository.delete(id);
        serviceSearchRepository.delete(id);
    }

    /**
     * Search for the service corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ServiceDTO> search(String query) {
        log.debug("Request to search Services for query {}", query);
        return StreamSupport
            .stream(serviceSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(serviceMapper::toDto)
            .collect(Collectors.toList());
    }
}
