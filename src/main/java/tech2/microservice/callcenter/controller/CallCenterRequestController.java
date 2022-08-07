package tech2.microservice.callcenter.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Point;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech2.microservice.callcenter.common.ResponseObject;
import tech2.microservice.callcenter.exception.UnAuthorizedException;
import tech2.microservice.callcenter.model.CallCenterEmployee;
import tech2.microservice.callcenter.model.CallCenterRequest;
import tech2.microservice.callcenter.service.CallCenterService;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping("/api/v1/call-center/request")
@RequiredArgsConstructor
@Slf4j
public class CallCenterRequestController {
    private CallCenterService callCenterService;

    @GetMapping("/{requestId}")
    public ResponseEntity<ResponseObject> getEmployeeInfo(
            @RequestHeader("accountId") String decodeAccountId,
            @RequestHeader("roles") List<String> decodeRoles,
            @PathVariable Long requestId) {
        if (callCenterService.isAccountExist(decodeAccountId)) {
            throw new UnAuthorizedException("Account don't exist");
        }
        CallCenterRequest request = callCenterService.getRequest(requestId);
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder().message("").data(request).build());
    }

    @PostMapping("/")
    public ResponseEntity<ResponseObject> createRequest(
            @RequestHeader("accountId") String decodeAccountId,
            @RequestHeader("roles") List<String> decodeRoles,
            @RequestBody @Valid CallCenterRequest callCenterRequest) {
        if (callCenterService.isAccountExist(decodeAccountId)) {
            throw new UnAuthorizedException("Account don't exist");
        }
        CallCenterRequest request = callCenterService.createRequest(callCenterRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder().message("").data(request).build());
    }


    // TODO: This API call by Driver Service, replace it by gRPC
    @PutMapping("/{requestId}")
    public ResponseEntity<ResponseObject> changeState(
            @PathVariable Long requestId,
            @RequestBody @Valid changeRequestState form) {
        callCenterService.updateRequestState(requestId,form.getDriverId(),form.getCabId(),form.getState());
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder().message("").data("").build());
    }
}

@Data
class changeRequestState{
    @NotEmpty
    private String driverId;
    @NotNull
    private Long cabId;
    @NotEmpty
    private String state;
}