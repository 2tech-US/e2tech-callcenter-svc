package tech2.microservice.callcenter.exception;

public class UniqueConstraintException extends RuntimeException{
    public UniqueConstraintException(String message){
        super(message);
    }
}
