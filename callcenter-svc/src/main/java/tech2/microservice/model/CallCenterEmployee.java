package tech2.microservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CallCenterEmployee {
    @Id @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private String phone;

    @NotEmpty(message = "The username can be empty")
    private String name;
    private String urlImage;

    private String role;
}

