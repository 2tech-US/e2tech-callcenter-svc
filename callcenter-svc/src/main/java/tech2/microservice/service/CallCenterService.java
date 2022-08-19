package tech2.microservice.service;


import tech2.microservice.model.CallCenterEmployee;

import java.util.List;

public interface CallCenterService {
    boolean isAccountExist(String phone);
    CallCenterEmployee getEmployeeInfo(String phone);
    List<CallCenterEmployee> getEmployeesInfo(int offset, int limit);
    CallCenterEmployee createEmployee(CallCenterEmployee employee);
    CallCenterEmployee updateEmployeeInfo(String phone, CallCenterEmployee callCenterEmployee);
}
