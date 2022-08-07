package tech2.microservice.callcenter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech2.microservice.callcenter.model.CallCenterRequest;

import java.util.List;

@Repository
public interface CallCenterRequestRepo extends JpaRepository <CallCenterRequest, Long> {
    List<CallCenterRequest> findByPhone(String phone);
}
