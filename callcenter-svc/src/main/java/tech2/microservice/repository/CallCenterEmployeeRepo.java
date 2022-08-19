package tech2.microservice.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import tech2.microservice.model.CallCenterEmployee;

@Repository

public interface CallCenterEmployeeRepo extends PagingAndSortingRepository<CallCenterEmployee,String> {
    CallCenterEmployee findByPhone(String phone);
    Boolean existsByPhone(String phone);
}