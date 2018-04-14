package ir.winners.redcarpet.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.winners.redcarpet.service.AdsService;
import ir.winners.redcarpet.web.rest.errors.BadRequestAlertException;
import ir.winners.redcarpet.web.rest.util.HeaderUtil;
import ir.winners.redcarpet.service.dto.AdsDTO;
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
 * REST controller for managing Ads.
 */
@RestController
@RequestMapping("/api")
public class AdsResource {

    private final Logger log = LoggerFactory.getLogger(AdsResource.class);

    private static final String ENTITY_NAME = "ads";

    private final AdsService adsService;

    public AdsResource(AdsService adsService) {
        this.adsService = adsService;
    }

    /**
     * POST  /ads : Create a new ads.
     *
     * @param adsDTO the adsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new adsDTO, or with status 400 (Bad Request) if the ads has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ads")
    @Timed
    public ResponseEntity<AdsDTO> createAds(@RequestBody AdsDTO adsDTO) throws URISyntaxException {
        log.debug("REST request to save Ads : {}", adsDTO);
        if (adsDTO.getId() != null) {
            throw new BadRequestAlertException("A new ads cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AdsDTO result = adsService.save(adsDTO);
        return ResponseEntity.created(new URI("/api/ads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ads : Updates an existing ads.
     *
     * @param adsDTO the adsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated adsDTO,
     * or with status 400 (Bad Request) if the adsDTO is not valid,
     * or with status 500 (Internal Server Error) if the adsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ads")
    @Timed
    public ResponseEntity<AdsDTO> updateAds(@RequestBody AdsDTO adsDTO) throws URISyntaxException {
        log.debug("REST request to update Ads : {}", adsDTO);
        if (adsDTO.getId() == null) {
            return createAds(adsDTO);
        }
        AdsDTO result = adsService.save(adsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, adsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ads : get all the ads.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ads in body
     */
    @GetMapping("/ads")
    @Timed
    public List<AdsDTO> getAllAds() {
        log.debug("REST request to get all Ads");
        return adsService.findAll();
        }

    /**
     * GET  /ads/:id : get the "id" ads.
     *
     * @param id the id of the adsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the adsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/ads/{id}")
    @Timed
    public ResponseEntity<AdsDTO> getAds(@PathVariable Long id) {
        log.debug("REST request to get Ads : {}", id);
        AdsDTO adsDTO = adsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(adsDTO));
    }

    /**
     * DELETE  /ads/:id : delete the "id" ads.
     *
     * @param id the id of the adsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ads/{id}")
    @Timed
    public ResponseEntity<Void> deleteAds(@PathVariable Long id) {
        log.debug("REST request to delete Ads : {}", id);
        adsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/ads?query=:query : search for the ads corresponding
     * to the query.
     *
     * @param query the query of the ads search
     * @return the result of the search
     */
    @GetMapping("/_search/ads")
    @Timed
    public List<AdsDTO> searchAds(@RequestParam String query) {
        log.debug("REST request to search Ads for query {}", query);
        return adsService.search(query);
    }

}
