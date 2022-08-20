import APIService from "./utils/api_service.js";
import {
  validateStringField,
  validateUserPassword,
  validateUserName,
} from "./utils/validate.js";

$(document).ready(function () {
  $(".toast").toast("hide");
});

$("#signup").on("click", async () => {
  $("#error").text("");

  const isValidUserEmail = validateStringField(
    "useremail",
    "email-error",
    7,
    15
  );
  const isValidUserName = validateUserName("username", "name-error");
  const isValidUserPwd = validateUserPassword("userpwd", "password-error");

  if (isValidUserEmail && isValidUserName && isValidUserPwd) {
    const phone = $("#useremail").val();
    const name = $("#username").val();
    const password = $("#userpwd").val();
    const role = $("#role").val();
    try {
      console.log(role);
      const response = await APIService.register(phone, name, password, role);
      if (response.status == 201) {
        $(".toast-body").text("Register sucess");
        $(".toast").toast("show");
      }
    } catch (err) {
      console.log(err.message);
      $(".toast-body").text("Register Fail");
      $(".toast").toast("show");
    }
  }
});

$("#useremail").on("input propertychange", function (e) {
  e.preventDefault();
  validateStringField("useremail", "email-error", 7, 15);
});

$("#username").on("input propertychange", function (e) {
  e.preventDefault();
  validateUserName("username", "name-error");
});

$("#userpwd").on("input propertychange", function (e) {
  e.preventDefault();
  validateUserPassword("userpwd", "password-error");
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
