package tech2.microservice.utls;


import tech2.microservice.CallCenterEmployee;

public class ProtobufModelMapping {
    public static CallCenterEmployee grpcEmployeeMapping(tech2.microservice.model.CallCenterEmployee employee) {
        return CallCenterEmployee.newBuilder()
                .setPhone(employee.getPhone())
                .setName(employee.getName())
                .setDateOfBirth(DateParser.parseDate(employee.getBirthDate()))
                .setRole(employee.getRole())
                .setUrlImage(employee.getUrlImage())
                .build();
    }
}
