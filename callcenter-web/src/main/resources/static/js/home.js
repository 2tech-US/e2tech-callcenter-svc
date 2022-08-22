import APIService from "./utils/api_service.js";
import { validateStringField, validateDate } from "./utils/validate.js";

await initData();

async function initData() {
  try {
    const data = await APIService.getUserInfo();
    if (data.status != 200) {
      throw new Error(data.error);
    }
    updateContentPage(data.item);
  } catch (err) {
    alert(err.message);
    APIService.logout();
  }
}

function updateContentPage(info) {
  if (!info) return;
  $(".show_name").text(info.name);
  $(".show_phone").text(info.phone);
  $(".show_role").text(info.role);

  $("#input_name").val(info.name);
  $("#input_dob").val(info.dateOfBirth);
}

$("#update_profile").click(async () => {
  const name = validateStringField("input_name", "name_error", 3, 15);
  const dob = validateDate("input_dob", "dob_error");
  if (!name || !dob) {
    return;
  }
  try {
    const data = await APIService.updateUserInfo(name,null,dob);
    if(data.status != 200) {
      throw new Error(data.error);
    }
    updateContentPage(data.item);
  } catch (err) {
    alert(err.message);
    APIService.logout();
  }
});

$("#input_name").on("input propertychange", function (e) {
  e.preventDefault();
  validateStringField("input_name", "name_error", 3, 15);
});

$("#input_dob").on("input propertychange", function (e) {
  e.preventDefault();
  validateDate("input_dob", "dob_error");
});
