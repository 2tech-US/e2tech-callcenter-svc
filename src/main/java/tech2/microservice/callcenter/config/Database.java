package tech2.microservice.callcenter.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tech2.microservice.callcenter.model.CallCenterRole;
import tech2.microservice.callcenter.repository.CallCenterRoleRepo;


@Configuration // init database when first run
public class Database {
    private static final Logger logger = LoggerFactory.getLogger(Database.class);

    @Bean
    CommandLineRunner initDatabase(CallCenterRoleRepo callCenterRoleRepo){
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
                callCenterRoleRepo.save(new CallCenterRole(null,"attendant","Receiving Customer Call"));
                callCenterRoleRepo.save(new CallCenterRole(null,"gps_locator","Locator GPS Request Address"));
                callCenterRoleRepo.save(new CallCenterRole(null,"customer_care_department","Just sittting there"));
            }
        };
    }
}
