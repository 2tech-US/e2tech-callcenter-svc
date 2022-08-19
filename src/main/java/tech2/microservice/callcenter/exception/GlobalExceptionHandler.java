//package tech2.microservice.callcenter.exception;
//
//import org.springframework.context.support.DefaultMessageSourceResolvable;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseStatus;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//import org.springframework.web.context.request.WebRequest;
//import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
//import tech2.microservice.callcenter.common.ResponseObject;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
//    @Override
//    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
//                                                                  HttpHeaders headers,
//                                                                  HttpStatus status,
//                                                                  WebRequest request) {
//
//        Map<String, List<String>> body = new HashMap<>();
//
//        List<String> errors = ex.getBindingResult().getFieldErrors().stream().map(
//                DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());
//
//        body.put("errors", errors);
//
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
//                ResponseObject.builder().message("Argument not valid").data(body).build());
//    }
//
//    @ExceptionHandler(NotFoundException.class)
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    public ResponseObject handleExceptionNoFound(NotFoundException ex) {
//        return ResponseObject.builder().message(ex.getMessage()).data(null).build();
//    }
//
//    @ExceptionHandler(UniqueConstraintException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public ResponseObject handleExceptionUniqueResource(UniqueConstraintException ex) {
//        return ResponseObject.builder().message(ex.getMessage()).data(null).build();
//    }
//
//    @ExceptionHandler(UnAuthorizedException.class)
//    @ResponseStatus(HttpStatus.UNAUTHORIZED)
//    public ResponseObject handleExceptionUanAuthorized(UnAuthorizedException ex) {
//        return ResponseObject.builder().message(ex.getMessage()).data(null).build();
//    }
//
//    @ExceptionHandler(NotMatchingPasswordException.class)
//    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
//    public ResponseObject handleExceptionUanAuthorized(NotMatchingPasswordException ex) {
//        return ResponseObject.builder().message(ex.getMessage()).data(null).build();
//    }
//
//
//}
