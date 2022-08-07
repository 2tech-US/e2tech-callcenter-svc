package tech2.microservice.callcenter.service;

import org.springframework.data.geo.Point;
import tech2.microservice.callcenter.model.CallCenterEmployee;
import tech2.microservice.callcenter.model.CallCenterRequest;
import tech2.microservice.callcenter.model.CallCenterRole;

import java.util.List;

public interface CallCenterService {
    boolean isAccountExist(String accountId);
    CallCenterEmployee getEmployeeInfo(String accountId);
    List<CallCenterEmployee> getEmployeesInfo();
    CallCenterEmployee createEmployee(CallCenterEmployee employee, List<String> rolesName);
    CallCenterEmployee updateEmployeeInfo(String accountID, Object callCenterEmployee);
    CallCenterRole getRole(String roleName);
    List<CallCenterRole> getRoles();
    void addRoleToEmployee(String accountID, String roleName);
    void removeRoleToEmployee(String accountId,String roleName);
    CallCenterRequest createRequest(CallCenterRequest callCenterRequest);
    CallCenterRequest getRequest(Long requestId);
    List<CallCenterRequest> getRequests();
    List<CallCenterRequest> getRequestByPhone(String phone);

    void updateRequestState(Long requestId, String driverId, Long cabId, String state);

}
