package tech2.microservice.callcenter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech2.microservice.callcenter.model.CallCenterEmployee;

@Repository

public interface CallCenterEmployeeRepo extends JpaRepository<CallCenterEmployee,Long> {
    CallCenterEmployee findByAccountId(String accountId);
    Boolean existsByAccountId(String accountId);
}