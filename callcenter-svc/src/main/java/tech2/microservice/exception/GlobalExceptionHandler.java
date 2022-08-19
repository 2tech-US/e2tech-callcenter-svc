package tech2.microservice.exception;

import io.grpc.Status;
import net.devh.boot.grpc.server.advice.GrpcAdvice;
import net.devh.boot.grpc.server.advice.GrpcExceptionHandler;

@GrpcAdvice
public class GlobalExceptionHandler {
    @GrpcExceptionHandler
    public Status handleNotFoundException(NotFoundException e) {
        return Status.NOT_FOUND.withDescription("Not Found " + e.getMessage());
    }

    @GrpcExceptionHandler
    public Status handleDuplicateResourceException(DuplicateResourceException e) {
        return Status.ALREADY_EXISTS.withDescription("Not Found " + e.getMessage());
    }
}
