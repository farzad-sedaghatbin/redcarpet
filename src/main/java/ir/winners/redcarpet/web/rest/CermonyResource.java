package ir.winners.redcarpet.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.winners.redcarpet.service.CermonyService;
import ir.winners.redcarpet.web.rest.errors.BadRequestAlertException;
import ir.winners.redcarpet.web.rest.util.HeaderUtil;
import ir.winners.redcarpet.service.dto.CermonyDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Cermony.
 */
@RestController
@RequestMapping("/api")
public class CermonyResource {

    private final Logger log = LoggerFactory.getLogger(CermonyResource.class);

    private static final String ENTITY_NAME = "cermony";

    private final CermonyService cermonyService;

    public CermonyResource(CermonyService cermonyService) {
        this.cermonyService = cermonyService;
    }

    /**
     * POST  /cermonies : Create a new cermony.
     *
     * @param cermonyDTO the cermonyDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cermonyDTO, or with status 400 (Bad Request) if the cermony has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cermonies")
    @Timed
    public ResponseEntity<CermonyDTO> createCermony(@RequestBody CermonyDTO cermonyDTO) throws URISyntaxException {
        log.debug("REST request to save Cermony : {}", cermonyDTO);
        if (cermonyDTO.getId() != null) {
            throw new BadRequestAlertException("A new cermony cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CermonyDTO result = cermonyService.save(cermonyDTO);
        return ResponseEntity.created(new URI("/api/cermonies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cermonies : Updates an existing cermony.
     *
     * @param cermonyDTO the cermonyDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cermonyDTO,
     * or with status 400 (Bad Request) if the cermonyDTO is not valid,
     * or with status 500 (Internal Server Error) if the cermonyDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cermonies")
    @Timed
    public ResponseEntity<CermonyDTO> updateCermony(@RequestBody CermonyDTO cermonyDTO) throws URISyntaxException {
        log.debug("REST request to update Cermony : {}", cermonyDTO);
        if (cermonyDTO.getId() == null) {
            return createCermony(cermonyDTO);
        }
        CermonyDTO result = cermonyService.save(cermonyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cermonyDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cermonies : get all the cermonies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cermonies in body
     */
    @GetMapping("/cermonies")
    @Timed
    public List<CermonyDTO> getAllCermonies() {
        log.debug("REST request to get all Cermonies");
        return cermonyService.findAll();
        }

    /**
     * GET  /cermonies/:id : get the "id" cermony.
     *
     * @param id the id of the cermonyDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cermonyDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cermonies/{id}")
    @Timed
    public ResponseEntity<CermonyDTO> getCermony(@PathVariable Long id) {
        log.debug("REST request to get Cermony : {}", id);
        CermonyDTO cermonyDTO = cermonyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cermonyDTO));
    }

    /**
     * DELETE  /cermonies/:id : delete the "id" cermony.
     *
     * @param id the id of the cermonyDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cermonies/{id}")
    @Timed
    public ResponseEntity<Void> deleteCermony(@PathVariable Long id) {
        log.debug("REST request to delete Cermony : {}", id);
        cermonyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/cermonies?query=:query : search for the cermony corresponding
     * to the query.
     *
     * @param query the query of the cermony search
     * @return the result of the search
     */
    @GetMapping("/_search/cermonies")
    @Timed
    public List<CermonyDTO> searchCermonies(@RequestParam String query) {
        log.debug("REST request to search Cermonies for query {}", query);
        return cermonyService.search(query);
    }

}
