package ir.winners.redcarpet.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.winners.redcarpet.service.MarketObjectService;
import ir.winners.redcarpet.web.rest.errors.BadRequestAlertException;
import ir.winners.redcarpet.web.rest.util.HeaderUtil;
import ir.winners.redcarpet.service.dto.MarketObjectDTO;
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
 * REST controller for managing MarketObject.
 */
@RestController
@RequestMapping("/api")
public class MarketObjectResource {

    private final Logger log = LoggerFactory.getLogger(MarketObjectResource.class);

    private static final String ENTITY_NAME = "marketObject";

    private final MarketObjectService marketObjectService;

    public MarketObjectResource(MarketObjectService marketObjectService) {
        this.marketObjectService = marketObjectService;
    }

    /**
     * POST  /market-objects : Create a new marketObject.
     *
     * @param marketObjectDTO the marketObjectDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new marketObjectDTO, or with status 400 (Bad Request) if the marketObject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/market-objects")
    @Timed
    public ResponseEntity<MarketObjectDTO> createMarketObject(@RequestBody MarketObjectDTO marketObjectDTO) throws URISyntaxException {
        log.debug("REST request to save MarketObject : {}", marketObjectDTO);
        if (marketObjectDTO.getId() != null) {
            throw new BadRequestAlertException("A new marketObject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MarketObjectDTO result = marketObjectService.save(marketObjectDTO);
        return ResponseEntity.created(new URI("/api/market-objects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /market-objects : Updates an existing marketObject.
     *
     * @param marketObjectDTO the marketObjectDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated marketObjectDTO,
     * or with status 400 (Bad Request) if the marketObjectDTO is not valid,
     * or with status 500 (Internal Server Error) if the marketObjectDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/market-objects")
    @Timed
    public ResponseEntity<MarketObjectDTO> updateMarketObject(@RequestBody MarketObjectDTO marketObjectDTO) throws URISyntaxException {
        log.debug("REST request to update MarketObject : {}", marketObjectDTO);
        if (marketObjectDTO.getId() == null) {
            return createMarketObject(marketObjectDTO);
        }
        MarketObjectDTO result = marketObjectService.save(marketObjectDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, marketObjectDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /market-objects : get all the marketObjects.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of marketObjects in body
     */
    @GetMapping("/market-objects")
    @Timed
    public List<MarketObjectDTO> getAllMarketObjects() {
        log.debug("REST request to get all MarketObjects");
        return marketObjectService.findAll();
        }

    /**
     * GET  /market-objects/:id : get the "id" marketObject.
     *
     * @param id the id of the marketObjectDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the marketObjectDTO, or with status 404 (Not Found)
     */
    @GetMapping("/market-objects/{id}")
    @Timed
    public ResponseEntity<MarketObjectDTO> getMarketObject(@PathVariable Long id) {
        log.debug("REST request to get MarketObject : {}", id);
        MarketObjectDTO marketObjectDTO = marketObjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(marketObjectDTO));
    }

    /**
     * DELETE  /market-objects/:id : delete the "id" marketObject.
     *
     * @param id the id of the marketObjectDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/market-objects/{id}")
    @Timed
    public ResponseEntity<Void> deleteMarketObject(@PathVariable Long id) {
        log.debug("REST request to delete MarketObject : {}", id);
        marketObjectService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/market-objects?query=:query : search for the marketObject corresponding
     * to the query.
     *
     * @param query the query of the marketObject search
     * @return the result of the search
     */
    @GetMapping("/_search/market-objects")
    @Timed
    public List<MarketObjectDTO> searchMarketObjects(@RequestParam String query) {
        log.debug("REST request to search MarketObjects for query {}", query);
        return marketObjectService.search(query);
    }

}
