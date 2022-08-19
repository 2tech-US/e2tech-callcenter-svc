package tech2.microservice.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    private final String PAGE_NAME = "E2TECH | ";
    @GetMapping("/login")
    public String getLoginPage(Model model){
        model.addAttribute("pageTitle",PAGE_NAME + "Login");
        return "login";
    }

    @GetMapping("/home")
    public String getHomePage(Model model) {
        model.addAttribute("pageTitle",PAGE_NAME + "Home");
        model.addAttribute("isHome",true);
        return "home";
    }

    @GetMapping("workplace/attendant")
    public String getAttendantPage(Model model) {
        model.addAttribute("pageTitle",PAGE_NAME + "Attendant Service");
        model.addAttribute("isService",true);
        return "attendant";
    }

    @GetMapping("/workplace/gps-locator")
    public String getGpsLocatorPage(Model model) {
        model.addAttribute("pageTitle",PAGE_NAME + "GPS Locate Service");
        model.addAttribute("isService",true);
        return "gps-locator";
    }

    @GetMapping("/workplace/customer-care")
    public String getCustomerCarePage(Model model) {
        model.addAttribute("pageTitle",PAGE_NAME + "Customer Care Service");
        model.addAttribute("isService",true);
        return "customer-care";
    }
}
