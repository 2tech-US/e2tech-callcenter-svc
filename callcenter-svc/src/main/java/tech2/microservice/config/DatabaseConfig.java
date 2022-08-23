package tech2.microservice.config;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import tech2.microservice.model.CallCenterEmployee;
import tech2.microservice.repository.CallCenterEmployeeRepo;
import tech2.microservice.service.CallCenterService;
import tech2.microservice.utls.DateParser;

@Configuration
@AllArgsConstructor
public class DatabaseConfig implements CommandLineRunner {
    private final CallCenterEmployeeRepo repo;
    private static final Logger LOG = LoggerFactory
            .getLogger(DatabaseConfig.class);
    @Override
    public void run(String... args) throws Exception {
        LOG.info(repo.save(CallCenterEmployee.builder()
                                       .role("admin")
                                       .name("admin-name")
                                       .phone("0000000000")
                                       .build()).toString());
    }
}
