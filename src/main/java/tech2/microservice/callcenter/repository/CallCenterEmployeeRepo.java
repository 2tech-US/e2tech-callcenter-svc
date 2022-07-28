package tech2.microservice.callcenter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech2.microservice.callcenter.model.CallCenterEmployee;

public interface CallCenterEmployeeRepo extends JpaRepository<CallCenterEmployee,Long> {
    CallCenterEmployee findByAccountId(Long accountId);
    Boolean existsByAccountId(Long accountId);
}