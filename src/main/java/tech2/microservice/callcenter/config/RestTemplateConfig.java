package tech2.microservice.callcenter.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import tech2.microservice.callcenter.common.ResponseObject;

@Configuration
public class RestTemplateConfig {
    @Bean // Here init database
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }
}
