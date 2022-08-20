package tech2.microservice;

import io.grpc.netty.shaded.io.netty.handler.codec.http.HttpResponseStatus;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import tech2.microservice.service.CallCenterService;
import tech2.microservice.utls.DomainModelMapping;
import tech2.microservice.utls.ProtobufModelMapping;

@GrpcService
@RequiredArgsConstructor
public class GrpcCallCenterService extends CallCenterServiceGrpc.CallCenterServiceImplBase {
    private final CallCenterService callCenterService;

    @Override
    public void getEmployee(getEmployeeRequest request,
                            StreamObserver<getEmployeeResponse> responseObserver) {
        CallCenterEmployee employee = ProtobufModelMapping.grpcEmployeeMapping(
                callCenterService.getEmployeeInfo(request.getPhone()));
        responseObserver.onNext(getEmployeeResponse.newBuilder()
                                        .setStatus(HttpResponseStatus.OK.code())
                                        .setItem(employee)
                                        .build());
        responseObserver.onCompleted();
    }

    @Override
    public void getListEmployee(getListEmployeeRequest request,
                                StreamObserver<getListEmployeeResponse> responseObserver) {
        Iterable<CallCenterEmployee> listEmployee = callCenterService.getEmployeesInfo(request.getOffset(),
                                                                                       request.getLimit()).stream().map(
                ProtobufModelMapping::grpcEmployeeMapping).toList();
        responseObserver.onNext(getListEmployeeResponse.newBuilder()
                                        .setStatus(HttpResponseStatus.OK.code())
                                        .setTotal(callCenterService.count())
                                        .addAllItems(listEmployee)
                                        .build());
        responseObserver.onCompleted();
    }

    @Override
    public void createEmployee(createCallCenterEmployeeRequest request,
                               StreamObserver<getEmployeeResponse> responseObserver) {
        CallCenterEmployee employee = ProtobufModelMapping.grpcEmployeeMapping(
                callCenterService.createEmployee(
                        DomainModelMapping.nonInfoEmployee(request.getPhone(), request.getRole())));
        responseObserver.onNext(getEmployeeResponse.newBuilder()
                                        .setStatus(HttpResponseStatus.CREATED.code())
                                        .setItem(employee)
                                        .build());
        responseObserver.onCompleted();
    }

    @Override
    public void updateEmployee(updateCallCenterEmployeeRequest request,
                               StreamObserver<getEmployeeResponse> responseObserver) {
        CallCenterEmployee requestData = request.getEmployee();
        CallCenterEmployee employee = ProtobufModelMapping.grpcEmployeeMapping(
                callCenterService.updateEmployeeInfo(requestData.getPhone(),
                                                     DomainModelMapping.domainEmployeeMapping(requestData)));

        responseObserver.onNext(getEmployeeResponse.newBuilder()
                                        .setStatus(HttpResponseStatus.OK.code())
                                        .setItem(employee)
                                        .build());
        responseObserver.onCompleted();
    }
}
