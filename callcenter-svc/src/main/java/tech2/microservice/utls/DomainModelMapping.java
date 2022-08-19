package tech2.microservice.utls;

import tech2.microservice.model.CallCenterEmployee;

public class DomainModelMapping {
    public static CallCenterEmployee domainEmployeeMapping(tech2.microservice.CallCenterEmployee employee) {
        return CallCenterEmployee.builder()
                .phone(employee.getPhone())
                .name(employee.getName())
                .birthDate(DateParser.parseString(employee.getDateOfBirth()))
                .urlImage(employee.getUrlImage())
                .role(employee.getRole())
                .build();
    }
    public static CallCenterEmployee nonInfoEmployee(String phone,String role) {
        return CallCenterEmployee.builder()
                .phone(phone)
                .name("")
                .birthDate(null)
                .urlImage("")
                .role(role)
                .build();
    }


}
