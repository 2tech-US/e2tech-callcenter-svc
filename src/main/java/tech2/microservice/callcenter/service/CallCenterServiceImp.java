package tech2.microservice.callcenter.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech2.microservice.callcenter.exception.NotFoundException;
import tech2.microservice.callcenter.model.CallCenterEmployee;
import tech2.microservice.callcenter.model.CallCenterRequest;
import tech2.microservice.callcenter.model.CallCenterRole;
import tech2.microservice.callcenter.repository.CallCenterEmployeeRepo;
import tech2.microservice.callcenter.repository.CallCenterRequestRepo;
import tech2.microservice.callcenter.repository.CallCenterRoleRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CallCenterServiceImp implements CallCenterService{

    private final CallCenterEmployeeRepo employeeRepo;
    private final CallCenterRoleRepo roleRepo;
    private final CallCenterRequestRepo requestRepo;
    @Override
    public boolean isAccountExist(String accountId) {
        return employeeRepo.existsByAccountId(accountId);
    }


    @Override
    public CallCenterEmployee getEmployeeInfo(String accountId) {
        CallCenterEmployee employee = employeeRepo.findByAccountId(accountId);
        if(employee == null) {
            throw new NotFoundException("Employee ID(" + accountId +") don't exist");
        }
        return employee;
    }

    @Override
    public List<CallCenterEmployee> getEmployeesInfo() {
        return employeeRepo.findAll();
    }

    @Override
    public CallCenterEmployee createEmployee(CallCenterEmployee employee,
                                             List<String> rolesName) {
        List<CallCenterRole> roles = new ArrayList<>();
        for(final String roleName : rolesName) {
            CallCenterRole role = this.getRole(roleName);
            roles.add(role);
        }
        employee.setRoles(roles);
        return employeeRepo.save(employee);
    }

    @Override
    public CallCenterEmployee updateEmployeeInfo(String accountId,
                                   Object updateEmployee) {
        CallCenterEmployee employee = employeeRepo.findByAccountId(accountId);
        if(employee == null) {
            throw new NotFoundException("Employee ID(" + accountId +") don't exist");
        }
        BeanUtils.copyProperties(updateEmployee,employee);
        return employeeRepo.save(employee);
    }

    @Override
    public CallCenterRole getRole(String roleName) {
        CallCenterRole role = roleRepo.findByName(roleName);
        if(role == null) {
            throw new NotFoundException("Role name(" + roleName +") don't exist");
        }
        return role;
    }

    @Override
    public List<CallCenterRole> getRoles() {
        return roleRepo.findAll();
    }


    @Override
    public void addRoleToEmployee(String accountID,
                                  String roleName) {
        CallCenterEmployee employee = this.getEmployeeInfo(accountID);
        CallCenterRole role = this.getRole(roleName);
        employee.getRoles().add(role);
        employeeRepo.save(employee);
    }

    @Override
    public void removeRoleToEmployee(String accountID,
                                  String roleName) {
        CallCenterEmployee employee = this.getEmployeeInfo(accountID);
        CallCenterRole role = this.getRole(roleName);
        employee.getRoles().remove(role);
        employeeRepo.save(employee);
    }

    @Override
    public CallCenterRequest createRequest(CallCenterRequest callCenterRequest) {
        //TODO: Create arriving location and picking location in location service
        return requestRepo.save(callCenterRequest);
    }

    @Override
    public CallCenterRequest getRequest(Long requestId) {
        Optional<CallCenterRequest> callCenterRequest = requestRepo.findById(requestId);
        if(callCenterRequest.isEmpty()) {
            throw new NotFoundException("Request " + requestId + " Not found");
        }
        else return callCenterRequest.get();
    }

    @Override
    public List<CallCenterRequest> getRequests() {
        return requestRepo.findAll();
    }

    @Override
    public List<CallCenterRequest> getRequestByPhone(String phone) {
        return requestRepo.findByPhone(phone);
    }

    @Override
    public void updateRequestState(Long requestId, String driverId, Long cabId, String state) {
        CallCenterRequest callCenterRequest = this.getRequest(requestId);
        callCenterRequest.setDriverId(driverId);
        callCenterRequest.setCabId(cabId);
        callCenterRequest.setRequestState(state);
        requestRepo.save(callCenterRequest);
    }
}
