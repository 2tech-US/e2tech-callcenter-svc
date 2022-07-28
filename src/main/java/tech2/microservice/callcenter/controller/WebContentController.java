package tech2.microservice.callcenter.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/call-center")
public class WebContentController {

    @GetMapping("/login")
    public String getLoginPage(){
        return "login";
    }




}
