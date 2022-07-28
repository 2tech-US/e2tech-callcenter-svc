package tech2.microservice.callcenter.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.Collection;

@Data
@Entity
@RequiredArgsConstructor
public class CallCenterEmployee {
    @Id @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private Long accountId;

    @NotEmpty(message = "The username can be empty")
    private String name;
    private String urlImage;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<CallCenterRole> roles = new ArrayList<>();
}

