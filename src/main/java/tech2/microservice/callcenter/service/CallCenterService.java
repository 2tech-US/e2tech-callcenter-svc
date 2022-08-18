package tech2.microservice.callcenter.service;

import tech2.microservice.callcenter.model.CallCenterEmployee;
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

}
