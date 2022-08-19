package tech2.microservice.exception;

import io.grpc.Status;
import net.devh.boot.grpc.server.advice.GrpcAdvice;
import net.devh.boot.grpc.server.advice.GrpcExceptionHandler;
import org.springframework.transaction.TransactionSystemException;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.Set;

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

    @GrpcExceptionHandler
    public Status handleValidationFail(ConstraintViolationException e) {
        StringBuilder message = new StringBuilder();
        Set<ConstraintViolation<?>> violations = e.getConstraintViolations();
        for (ConstraintViolation<?> violation : violations) {
            message.append(violation.getMessage().concat(";"));
        }
        return Status.INVALID_ARGUMENT.withDescription(message.toString());
    }

    @GrpcExceptionHandler
    public Status handleTransactionSystemException(TransactionSystemException e) {
        StringBuilder message = new StringBuilder();
        Throwable cause = ((TransactionSystemException) e).getRootCause();
        if (cause instanceof ConstraintViolationException) {
            Set<ConstraintViolation<?>> violations = ((ConstraintViolationException) cause).getConstraintViolations();
            for (ConstraintViolation<?> violation : violations) {
                message.append(violation.getMessage().concat(";"));
            }
            return Status.INVALID_ARGUMENT.withDescription(message.toString());
        }
        return Status.INTERNAL.withDescription("Whatever happens, happens");
    }
}
