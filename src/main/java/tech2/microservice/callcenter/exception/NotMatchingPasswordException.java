package tech2.microservice.callcenter.exception;

public class NotMatchingPasswordException extends RuntimeException{
    public NotMatchingPasswordException(String message){
        super(message);
    }
}
