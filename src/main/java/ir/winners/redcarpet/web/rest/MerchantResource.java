package ir.winners.redcarpet.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.winners.redcarpet.service.MerchantService;
import ir.winners.redcarpet.web.rest.errors.BadRequestAlertException;
import ir.winners.redcarpet.web.rest.util.HeaderUtil;
import ir.winners.redcarpet.service.dto.MerchantDTO;
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
 * REST controller for managing Merchant.
 */
@RestController
@RequestMapping("/api")
public class MerchantResource {

    private final Logger log = LoggerFactory.getLogger(MerchantResource.class);

    private static final String ENTITY_NAME = "merchant";

    private final MerchantService merchantService;

    public MerchantResource(MerchantService merchantService) {
        this.merchantService = merchantService;
    }

    /**
     * POST  /merchants : Create a new merchant.
     *
     * @param merchantDTO the merchantDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new merchantDTO, or with status 400 (Bad Request) if the merchant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/merchants")
    @Timed
    public ResponseEntity<MerchantDTO> createMerchant(@RequestBody MerchantDTO merchantDTO) throws URISyntaxException {
        log.debug("REST request to save Merchant : {}", merchantDTO);
        if (merchantDTO.getId() != null) {
            throw new BadRequestAlertException("A new merchant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MerchantDTO result = merchantService.save(merchantDTO);
        return ResponseEntity.created(new URI("/api/merchants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /merchants : Updates an existing merchant.
     *
     * @param merchantDTO the merchantDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated merchantDTO,
     * or with status 400 (Bad Request) if the merchantDTO is not valid,
     * or with status 500 (Internal Server Error) if the merchantDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/merchants")
    @Timed
    public ResponseEntity<MerchantDTO> updateMerchant(@RequestBody MerchantDTO merchantDTO) throws URISyntaxException {
        log.debug("REST request to update Merchant : {}", merchantDTO);
        if (merchantDTO.getId() == null) {
            return createMerchant(merchantDTO);
        }
        MerchantDTO result = merchantService.save(merchantDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, merchantDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /merchants : get all the merchants.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of merchants in body
     */
    @GetMapping("/merchants")
    @Timed
    public List<MerchantDTO> getAllMerchants() {
        log.debug("REST request to get all Merchants");
        return merchantService.findAll();
        }

    /**
     * GET  /merchants/:id : get the "id" merchant.
     *
     * @param id the id of the merchantDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the merchantDTO, or with status 404 (Not Found)
     */
    @GetMapping("/merchants/{id}")
    @Timed
    public ResponseEntity<MerchantDTO> getMerchant(@PathVariable Long id) {
        log.debug("REST request to get Merchant : {}", id);
        MerchantDTO merchantDTO = merchantService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(merchantDTO));
    }

    /**
     * DELETE  /merchants/:id : delete the "id" merchant.
     *
     * @param id the id of the merchantDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/merchants/{id}")
    @Timed
    public ResponseEntity<Void> deleteMerchant(@PathVariable Long id) {
        log.debug("REST request to delete Merchant : {}", id);
        merchantService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/merchants?query=:query : search for the merchant corresponding
     * to the query.
     *
     * @param query the query of the merchant search
     * @return the result of the search
     */
    @GetMapping("/_search/merchants")
    @Timed
    public List<MerchantDTO> searchMerchants(@RequestParam String query) {
        log.debug("REST request to search Merchants for query {}", query);
        return merchantService.search(query);
    }

}
