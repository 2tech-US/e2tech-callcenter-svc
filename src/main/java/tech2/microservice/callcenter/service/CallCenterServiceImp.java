package tech2.microservice.callcenter.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech2.microservice.callcenter.exception.NotFoundException;
import tech2.microservice.callcenter.model.CallCenterEmployee;
import tech2.microservice.callcenter.model.CallCenterRole;
import tech2.microservice.callcenter.repository.CallCenterEmployeeRepo;
import tech2.microservice.callcenter.repository.CallCenterRoleRepo;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CallCenterServiceImp implements CallCenterService{

    private final CallCenterEmployeeRepo employeeRepo;
    private final CallCenterRoleRepo roleRepo;

    @Override
    public boolean isAccountExist(Long accountId) {
        return employeeRepo.existsByAccountId(accountId);
    }


    @Override
    public CallCenterEmployee getEmployeeInfo(Long accountId) {
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
    public void updateEmployeeInfo(Long accountId,
                                   CallCenterEmployee updateEmployee) {
        CallCenterEmployee employee = employeeRepo.findByAccountId(accountId);
        if(employee == null) {
            throw new NotFoundException("Employee ID(" + accountId +") don't exist");
        }
        employeeRepo.save(employee);
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
    public void addRoleToEmployee(Long accountID,
                                  String roleName) {
        CallCenterEmployee employee = this.getEmployeeInfo(accountID);
        CallCenterRole role = this.getRole(roleName);
        employee.getRoles().add(role);
        employeeRepo.save(employee);
    }
}
