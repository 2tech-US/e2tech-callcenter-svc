package tech2.microservice.callcenter.common;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseObject {
    private String message;
    private Object data;
}
