import APIService from "./utils/api_service.js";


$("#logout").click(async()=> {
    await APIService.logout();
    window.location.href="/login"
});