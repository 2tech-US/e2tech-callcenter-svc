package tech2.microservice.callcenter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class CallCenterApplication {
    public static void main(String[] args) {
        SpringApplication.run(CallCenterApplication.class, args);
    }
}
