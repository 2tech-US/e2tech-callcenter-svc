package tech2.microservice.callcenter.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@RequiredArgsConstructor
public class CallCenterEmployee {
    @Id @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String accountId;

    @NotEmpty(message = "The username can be empty")
    private String name;
    private String urlImage;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<CallCenterRole> roles = new ArrayList<>();

    private static final List<String> invisibleFields =  List.of("id", "accountId");
}

