package tech2.microservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech2.microservice.exception.DuplicateResourceException;
import tech2.microservice.exception.NotFoundException;
import tech2.microservice.model.CallCenterEmployee;
import tech2.microservice.repository.CallCenterEmployeeRepo;


import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CallCenterServiceImp implements CallCenterService {

    private final CallCenterEmployeeRepo employeeRepo;

    @Override
    public boolean isAccountExist(String phone) {
        return employeeRepo.existsById(phone);
    }

    @Override
    public CallCenterEmployee getEmployeeInfo(String phone) {
        CallCenterEmployee employee = employeeRepo.findByPhone(phone);
        if (employee == null) {
            throw new NotFoundException("Employee ID(" + phone + ") don't exist");
        }
        return employee;
    }

    @Override
    public List<CallCenterEmployee> getEmployeesInfo(int offset,
                                                     int limit) {
        Pageable pageable = PageRequest.of(offset, limit);
        return employeeRepo.findAll(pageable).toList();
    }

    @Override
    public CallCenterEmployee createEmployee(CallCenterEmployee employee) {
        if (employeeRepo.existsByPhone(employee.getPhone()))
            throw new DuplicateResourceException("This Account Already Existed " + employee.getPhone());
        return employeeRepo.save(employee);
    }

    @Override
    public CallCenterEmployee updateEmployeeInfo(String phone,
                                                 CallCenterEmployee updateEmployee) {
        CallCenterEmployee employee = this.getEmployeeInfo(phone);
        if (employee == null) {
            throw new NotFoundException("Employee ID(" + phone + ") don't exist");
        }
        BeanUtils.copyProperties(updateEmployee, employee);
        updateEmployee.setPhone(phone);
        return employeeRepo.save(employee);
    }

}
