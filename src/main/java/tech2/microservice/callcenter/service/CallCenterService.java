package tech2.microservice.callcenter.service;

import tech2.microservice.callcenter.model.CallCenterEmployee;
import tech2.microservice.callcenter.model.CallCenterRole;

import java.util.List;

public interface CallCenterService {
    boolean isAccountExist(Long accountId);
    CallCenterEmployee getEmployeeInfo(Long accountId);
    List<CallCenterEmployee> getEmployeesInfo();
    void updateEmployeeInfo(Long accountID, CallCenterEmployee callCenterEmployee);
    CallCenterRole getRole(String roleName);
    List<CallCenterRole> getRoles();
    void addRoleToEmployee(Long accountID, String roleName);
}
