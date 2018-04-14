package ir.winners.redcarpet.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.winners.redcarpet.service.ErrorService;
import ir.winners.redcarpet.web.rest.errors.BadRequestAlertException;
import ir.winners.redcarpet.web.rest.util.HeaderUtil;
import ir.winners.redcarpet.service.dto.ErrorDTO;
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
 * REST controller for managing Error.
 */
@RestController
@RequestMapping("/api")
public class ErrorResource {

    private final Logger log = LoggerFactory.getLogger(ErrorResource.class);

    private static final String ENTITY_NAME = "error";

    private final ErrorService errorService;

    public ErrorResource(ErrorService errorService) {
        this.errorService = errorService;
    }

    /**
     * POST  /errors : Create a new error.
     *
     * @param errorDTO the errorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new errorDTO, or with status 400 (Bad Request) if the error has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/errors")
    @Timed
    public ResponseEntity<ErrorDTO> createError(@RequestBody ErrorDTO errorDTO) throws URISyntaxException {
        log.debug("REST request to save Error : {}", errorDTO);
        if (errorDTO.getId() != null) {
            throw new BadRequestAlertException("A new error cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ErrorDTO result = errorService.save(errorDTO);
        return ResponseEntity.created(new URI("/api/errors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /errors : Updates an existing error.
     *
     * @param errorDTO the errorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated errorDTO,
     * or with status 400 (Bad Request) if the errorDTO is not valid,
     * or with status 500 (Internal Server Error) if the errorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/errors")
    @Timed
    public ResponseEntity<ErrorDTO> updateError(@RequestBody ErrorDTO errorDTO) throws URISyntaxException {
        log.debug("REST request to update Error : {}", errorDTO);
        if (errorDTO.getId() == null) {
            return createError(errorDTO);
        }
        ErrorDTO result = errorService.save(errorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, errorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /errors : get all the errors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of errors in body
     */
    @GetMapping("/errors")
    @Timed
    public List<ErrorDTO> getAllErrors() {
        log.debug("REST request to get all Errors");
        return errorService.findAll();
        }

    /**
     * GET  /errors/:id : get the "id" error.
     *
     * @param id the id of the errorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the errorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/errors/{id}")
    @Timed
    public ResponseEntity<ErrorDTO> getError(@PathVariable Long id) {
        log.debug("REST request to get Error : {}", id);
        ErrorDTO errorDTO = errorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(errorDTO));
    }

    /**
     * DELETE  /errors/:id : delete the "id" error.
     *
     * @param id the id of the errorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/errors/{id}")
    @Timed
    public ResponseEntity<Void> deleteError(@PathVariable Long id) {
        log.debug("REST request to delete Error : {}", id);
        errorService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/errors?query=:query : search for the error corresponding
     * to the query.
     *
     * @param query the query of the error search
     * @return the result of the search
     */
    @GetMapping("/_search/errors")
    @Timed
    public List<ErrorDTO> searchErrors(@RequestParam String query) {
        log.debug("REST request to search Errors for query {}", query);
        return errorService.search(query);
    }

}
