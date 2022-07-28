package tech2.microservice.callcenter.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech2.microservice.callcenter.common.ResponseObject;
import tech2.microservice.callcenter.exception.UnAuthorizedException;
import tech2.microservice.callcenter.model.CallCenterEmployee;
import tech2.microservice.callcenter.service.CallCenterService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/call-center")
@RequiredArgsConstructor
@Slf4j
public class CallCenterController {
    private final CallCenterService callCenterService;

    @GetMapping("/{accountId}")
    public ResponseEntity<ResponseObject> getEmployeeInfo(
            @RequestHeader("accountId") Long decodeAccountId,
            @RequestHeader("roles") List<String> decodeRoles,
            @PathVariable Long accountId) {
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
            @RequestHeader("accountId") Long decodeAccountId,
            @RequestHeader("roles") List<String> decodeRoles,
            @PathVariable Long accountId) {
        if (callCenterService.isAccountExist(decodeAccountId)) {
            throw new UnAuthorizedException("Account don't exist");
        }
        if (!accountId.equals(decodeAccountId)) {
            throw new UnAuthorizedException("This Account don't have permission");
        }
        return null;
    }


    @GetMapping("/admin")
    public ResponseEntity<ResponseObject> getEmployeesInfo(
            @RequestHeader("accountId") Long decodeAccountId,
            @RequestHeader("roles") List<String> roles
    ) {
        if (!roles.contains("ROLE_ADMIN")) {
            throw new UnAuthorizedException("This Account don't have permission");
        }
        List<CallCenterEmployee> employees = callCenterService.getEmployeesInfo();
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder().message("").data(employees).build());
    }

    @PostMapping("/admin/{accountId}")
    public ResponseEntity<ResponseObject> createEmployee(
            @RequestHeader("accountId") Long decodeAccountId,
            @RequestHeader("roles") List<String> roles,
            @PathVariable Long accountId
    ) {
        if (!roles.contains("ROLE_ADMIN")) {
            throw new UnAuthorizedException("This Account don't have permission");
        }
        //TODO: complete validation
        return null;
    }

    @PutMapping("/admin/{accountId}")
    public ResponseEntity<ResponseObject> addRoleToEmployee(
            @RequestHeader("accountId") Long decodeAccountId,
            @RequestHeader("roles") List<String> roles,
            @PathVariable Long accountId
    ) {
        if (!roles.contains("ROLE_ADMIN")) {
            throw new UnAuthorizedException("This Account don't have permission");
        }
        //TODO: complete validation
        return null;
    }

}
