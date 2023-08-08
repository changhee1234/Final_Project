package com.bitc.camp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.Charset;


@RestController
public class SearchController {
    private static final Logger log = LoggerFactory.getLogger(SearchController.class);

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/naver/blog")
    public ResponseEntity<String> searchNaverBlog(@RequestParam("query") String query) {
        URI uri = UriComponentsBuilder
                .fromUriString("https://openapi.naver.com")
                .path("/v1/search/blog.json")
                .queryParam("query", query)
                .queryParam("display", 10)
                .queryParam("start", 1)
//                .queryParam("sort", "random")
                .encode(Charset.forName("UTF-8"))
                .build()
                .toUri();

        log.info("uri : {}", uri);

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", "RNz0vDxk6HSaQUQ27P7q");
        headers.set("X-Naver-Client-Secret", "jRckvNBbhN");

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> result = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

        return result;
    }
}
