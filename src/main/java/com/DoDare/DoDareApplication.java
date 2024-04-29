package com.DoDare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class DoDareApplication {
	public static void main(String[] args) throws Exception {
        SpringApplication.run(DoDareApplication.class, args);
    }

    @GetMapping("/test")
    public ResponseEntity test() {
      return ResponseEntity.ok("test");
    }

}
