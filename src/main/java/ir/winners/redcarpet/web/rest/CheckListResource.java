package ir.winners.redcarpet.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.winners.redcarpet.service.CheckListService;
import ir.winners.redcarpet.web.rest.errors.BadRequestAlertException;
import ir.winners.redcarpet.web.rest.util.HeaderUtil;
import ir.winners.redcarpet.service.dto.CheckListDTO;
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
 * REST controller for managing CheckList.
 */
@RestController
@RequestMapping("/api")
public class CheckListResource {

    private final Logger log = LoggerFactory.getLogger(CheckListResource.class);

    private static final String ENTITY_NAME = "checkList";

    private final CheckListService checkListService;

    public CheckListResource(CheckListService checkListService) {
        this.checkListService = checkListService;
    }

    /**
     * POST  /check-lists : Create a new checkList.
     *
     * @param checkListDTO the checkListDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new checkListDTO, or with status 400 (Bad Request) if the checkList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/check-lists")
    @Timed
    public ResponseEntity<CheckListDTO> createCheckList(@RequestBody CheckListDTO checkListDTO) throws URISyntaxException {
        log.debug("REST request to save CheckList : {}", checkListDTO);
        if (checkListDTO.getId() != null) {
            throw new BadRequestAlertException("A new checkList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CheckListDTO result = checkListService.save(checkListDTO);
        return ResponseEntity.created(new URI("/api/check-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /check-lists : Updates an existing checkList.
     *
     * @param checkListDTO the checkListDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated checkListDTO,
     * or with status 400 (Bad Request) if the checkListDTO is not valid,
     * or with status 500 (Internal Server Error) if the checkListDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/check-lists")
    @Timed
    public ResponseEntity<CheckListDTO> updateCheckList(@RequestBody CheckListDTO checkListDTO) throws URISyntaxException {
        log.debug("REST request to update CheckList : {}", checkListDTO);
        if (checkListDTO.getId() == null) {
            return createCheckList(checkListDTO);
        }
        CheckListDTO result = checkListService.save(checkListDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, checkListDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /check-lists : get all the checkLists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of checkLists in body
     */
    @GetMapping("/check-lists")
    @Timed
    public List<CheckListDTO> getAllCheckLists() {
        log.debug("REST request to get all CheckLists");
        return checkListService.findAll();
        }

    /**
     * GET  /check-lists/:id : get the "id" checkList.
     *
     * @param id the id of the checkListDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the checkListDTO, or with status 404 (Not Found)
     */
    @GetMapping("/check-lists/{id}")
    @Timed
    public ResponseEntity<CheckListDTO> getCheckList(@PathVariable Long id) {
        log.debug("REST request to get CheckList : {}", id);
        CheckListDTO checkListDTO = checkListService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(checkListDTO));
    }

    /**
     * DELETE  /check-lists/:id : delete the "id" checkList.
     *
     * @param id the id of the checkListDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/check-lists/{id}")
    @Timed
    public ResponseEntity<Void> deleteCheckList(@PathVariable Long id) {
        log.debug("REST request to delete CheckList : {}", id);
        checkListService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/check-lists?query=:query : search for the checkList corresponding
     * to the query.
     *
     * @param query the query of the checkList search
     * @return the result of the search
     */
    @GetMapping("/_search/check-lists")
    @Timed
    public List<CheckListDTO> searchCheckLists(@RequestParam String query) {
        log.debug("REST request to search CheckLists for query {}", query);
        return checkListService.search(query);
    }

}
