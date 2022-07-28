package tech2.microservice.callcenter.exception;


public class NotFoundException extends RuntimeException{
    public NotFoundException(String message){
        super(message);
    }
}
