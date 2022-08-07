package tech2.microservice.callcenter.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech2.microservice.callcenter.common.ResponseObject;
import tech2.microservice.callcenter.exception.UnAuthorizedException;
import tech2.microservice.callcenter.model.CallCenterEmployee;
import tech2.microservice.callcenter.service.CallCenterService;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

@RestController
@RequestMapping("/api/v1/call-center/employee")
@RequiredArgsConstructor
@Slf4j
public class CallCenterController {
    private final CallCenterService callCenterService;

    @GetMapping("/{accountId}")
    public ResponseEntity<ResponseObject> getEmployeeInfo(
            @RequestHeader("accountId") String decodeAccountId,
            @RequestHeader("roles") List<String> decodeRoles,
            @PathVariable String accountId) {
        if (callCenterService.isAccountExist(decodeAccountId)) {
            throw new UnAuthorizedException("Account don't exist");
        }
        if (!decodeRoles.contains("ROLE_ADMIN") && !accountId.equals(decodeAccountId)) {
            throw new UnAuthorizedException("This Account don't have permission");
        }
        CallCenterEmployee employee = callCenterService.getEmployeeInfo(accountId);
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder().message("").data(employee).build());
    }

    @PutMapping("/{accountId}")
    public ResponseEntity<ResponseObject> changeInfo(
            @RequestHeader("accountId") String decodeAccountId,
            @PathVariable String accountId,
            @RequestBody @Valid changeEmployeeInfoForm form) {
        if (!accountId.equals(decodeAccountId)) {
            throw new UnAuthorizedException("This Account don't have permission");
        }
        if (callCenterService.isAccountExist(decodeAccountId)) {
            throw new UnAuthorizedException("Account don't exist");
        }
        CallCenterEmployee updatedEmployee = callCenterService.updateEmployeeInfo(accountId,form);
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder().message("").data(updatedEmployee).build());
    }


    @GetMapping("/admin")
    public ResponseEntity<ResponseObject> getEmployeesInfo(
            @RequestHeader("roles") List<String> roles
    ) {
        if (!roles.contains("ROLE_ADMIN")) {
            throw new UnAuthorizedException("This Account don't have permission");
        }
        List<CallCenterEmployee> employees = callCenterService.getEmployeesInfo();
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder().message("").data(employees).build());
    }

    @PostMapping("/admin/")
    public ResponseEntity<ResponseObject> createEmployee(
            @RequestHeader("roles") List<String> roles,
            @RequestBody @Valid CallCenterEmployee callCenterEmployee
    ) {
        if (!roles.contains("ROLE_ADMIN")) {
            throw new UnAuthorizedException("This Account don't have permission");
        }
        CallCenterEmployee employee = callCenterService.createEmployee(callCenterEmployee, roles);
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder().message("").data(employee).build());
    }

    @PutMapping("/admin/{accountId}")
    public ResponseEntity<ResponseObject> addRoleToEmployee(
            @RequestHeader("roles") List<String> roles,
            @RequestBody @Valid addRoleToEmployeeForm form,
            @PathVariable String accountId
    ) {
        if (!roles.contains("ROLE_ADMIN")) {
            throw new UnAuthorizedException("This Account don't have permission");
        }
        callCenterService.addRoleToEmployee(accountId, form.getRole());
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder().message(
                        "Add Role " + form.getRole() + " to employee(" + accountId + ")").build()
        );
    }

}

@Data
class addRoleToEmployeeForm {
    @NotEmpty()
    private String role;
}

@Data
class changeEmployeeInfoForm{
    @NotEmpty
    @Size(min = 2, max = 20, message = "The length of username must be between 2 and 20 character")
    private String name;
    private String urlImage;
}