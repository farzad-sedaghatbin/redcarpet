package ir.winners.redcarpet.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.winners.redcarpet.service.DoListService;
import ir.winners.redcarpet.web.rest.errors.BadRequestAlertException;
import ir.winners.redcarpet.web.rest.util.HeaderUtil;
import ir.winners.redcarpet.service.dto.DoListDTO;
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
 * REST controller for managing DoList.
 */
@RestController
@RequestMapping("/api")
public class DoListResource {

    private final Logger log = LoggerFactory.getLogger(DoListResource.class);

    private static final String ENTITY_NAME = "doList";

    private final DoListService doListService;

    public DoListResource(DoListService doListService) {
        this.doListService = doListService;
    }

    /**
     * POST  /do-lists : Create a new doList.
     *
     * @param doListDTO the doListDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new doListDTO, or with status 400 (Bad Request) if the doList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/do-lists")
    @Timed
    public ResponseEntity<DoListDTO> createDoList(@RequestBody DoListDTO doListDTO) throws URISyntaxException {
        log.debug("REST request to save DoList : {}", doListDTO);
        if (doListDTO.getId() != null) {
            throw new BadRequestAlertException("A new doList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DoListDTO result = doListService.save(doListDTO);
        return ResponseEntity.created(new URI("/api/do-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /do-lists : Updates an existing doList.
     *
     * @param doListDTO the doListDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated doListDTO,
     * or with status 400 (Bad Request) if the doListDTO is not valid,
     * or with status 500 (Internal Server Error) if the doListDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/do-lists")
    @Timed
    public ResponseEntity<DoListDTO> updateDoList(@RequestBody DoListDTO doListDTO) throws URISyntaxException {
        log.debug("REST request to update DoList : {}", doListDTO);
        if (doListDTO.getId() == null) {
            return createDoList(doListDTO);
        }
        DoListDTO result = doListService.save(doListDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, doListDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /do-lists : get all the doLists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of doLists in body
     */
    @GetMapping("/do-lists")
    @Timed
    public List<DoListDTO> getAllDoLists() {
        log.debug("REST request to get all DoLists");
        return doListService.findAll();
        }

    /**
     * GET  /do-lists/:id : get the "id" doList.
     *
     * @param id the id of the doListDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the doListDTO, or with status 404 (Not Found)
     */
    @GetMapping("/do-lists/{id}")
    @Timed
    public ResponseEntity<DoListDTO> getDoList(@PathVariable Long id) {
        log.debug("REST request to get DoList : {}", id);
        DoListDTO doListDTO = doListService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(doListDTO));
    }

    /**
     * DELETE  /do-lists/:id : delete the "id" doList.
     *
     * @param id the id of the doListDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/do-lists/{id}")
    @Timed
    public ResponseEntity<Void> deleteDoList(@PathVariable Long id) {
        log.debug("REST request to delete DoList : {}", id);
        doListService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/do-lists?query=:query : search for the doList corresponding
     * to the query.
     *
     * @param query the query of the doList search
     * @return the result of the search
     */
    @GetMapping("/_search/do-lists")
    @Timed
    public List<DoListDTO> searchDoLists(@RequestParam String query) {
        log.debug("REST request to search DoLists for query {}", query);
        return doListService.search(query);
    }

}
