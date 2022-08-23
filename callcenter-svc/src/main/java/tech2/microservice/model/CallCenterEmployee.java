package tech2.microservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Pattern;
import java.time.Instant;
import java.util.Date;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CallCenterEmployee {
    @Id
    private String phone;

    private String name;

    @Builder.Default
    private String urlImage = "";

    private Date birthDate;

    @Pattern(regexp = "callcenter_creator|callcenter_locator|callcenter_manager|admin", message = "Invalid Role")
    private String role;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;
}


