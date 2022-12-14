import APIService from "./utils/api_service.js";
//import { cacheKey } from "./utils/common.js";
import { validateUserEmail, validateStringField } from "./utils/validate.js";

$("#forget-password").on("click", async (event) => {
  $("#modal-forget-password").modal("show");
});

$("#send-forget-password").on("click", async (event) => {
  if (!validateStringField("useremail", "error", 7, 15)) {
    return;
  }
  const email = $("#user-email-forget").val();
  try {
    const res = await APIService.requestResetPassword(email);
    $("#modal-forget-password").modal("hide");
    $(".toast-body").text(
      "Check your email and click the link to activate your account"
    );
    $(".toast").toast("show");
  } catch (err) {
    console.log(err.message);
  }
});

$("#login").click(async () => {
  $("#error").text("");
  const role = $("#login").data("role");
  const email =   validateStringField("useremail", "error", 7, 15);
  if (!email) return;
  const password = $("#userpwd").val();
  const userInfo = {
    email: email,
    password: password,
  };
  try {
    console.log(role);
    const res = await APIService.login(email, password,role);
    if(res.status === 200) {
      window.location.href = `/home`;
    }
    else {
      throw new Error(res.error);
    }
  } catch (err) {
    $(".text-danger").text(err.message);
  }
});

$("#useremail").on("input propertychange", function (e) {
  e.preventDefault();
  validateStringField("useremail", "error", 7, 15);
});

$("#user-email-forget").on("input propertychange", function (e) {
  e.preventDefault();
  validateUserEmail("user-email-forget", "forget-error");
});

$("#password_show_hide").on("click", function (e) {
  const show_eye = $("#show_eye");
  const hide_eye = $("#hide_eye");

  const x = $("#userpwd");

  hide_eye.removeClass("d-none");
  if (x.attr("type") === "password") {
    x.attr("type", "text");
    show_eye.css("display", "none");
    hide_eye.css("display", "block");
  } else {
    x.attr("type", "password");
    show_eye.css("display", "block");
    hide_eye.css("display", "none");
  }
});
