package tech2.microservice.callcenter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech2.microservice.callcenter.model.CallCenterRole;

@Repository
public interface CallCenterRoleRepo extends JpaRepository<CallCenterRole,Long> {
    CallCenterRole findByName(String name);
    Boolean existsByName(String name);
}
