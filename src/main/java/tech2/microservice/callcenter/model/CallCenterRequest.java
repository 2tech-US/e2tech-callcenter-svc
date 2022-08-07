package tech2.microservice.callcenter.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
@RequiredArgsConstructor
@NoArgsConstructor
public class CallCenterRequest {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long id;
    private String phone;
    private String employeeId;
    private Long locationId;
    private String driverId;
    private Long cabId;
    private String requestState ;
    @CreationTimestamp
    private Date createdAt;
    @UpdateTimestamp
    private Date updatedAt;
}
