import APIService from "./utils/api_service.js";
import UserService from "./utils/user_info_service.js";
import { validateUserEmail, validateStringField } from "./utils/validate.js";

UserService.accessCreatorSitePermission();

const limit = 10;
const offset = 1;
let lastRequestResponse;

let next_click = document.querySelectorAll(".next_button");
let main_form = document.querySelectorAll(".main");
let step_list = document.querySelectorAll(".progress-bar li");
let num = document.querySelector(".step-number");
let formnumber = 0;

next_click.forEach(function (next_click_form) {
  next_click_form.addEventListener("click", function () {
    if (!validateform()) {
      return false;
    }
    formnumber++;
    updateform();
    progress_forward();
    contentchange();
  });
});

let back_click = document.querySelectorAll(".back_button");
back_click.forEach(function (back_click_form) {
  back_click_form.addEventListener("click", function () {
    formnumber--;
    updateform();
    progress_backward();
    contentchange();
  });
});

let username = document.querySelector("#user_name");
let shownname = document.querySelector(".shown_name");

let submit_click = document.querySelectorAll(".submit_button");
submit_click.forEach(function (submit_click_form) {
  submit_click_form.addEventListener("click", function () {
    shownname.innerHTML = personalInfo.name;
    formnumber++;
    updateform();
  });
});

function updateform() {
  main_form.forEach(function (mainform_number) {
    mainform_number.classList.remove("active");
  });
  main_form[formnumber].classList.add("active");
}

function progress_forward() {
  // step_list.forEach(list => {

  //     list.classList.remove('active');

  // });
  getInfoProcess[formnumber - 1](infos[formnumber - 1]);
  num.innerHTML = formnumber + 1;
  step_list[formnumber].classList.add("active");
}

function progress_backward() {
  resetInputField(infos[formnumber + 1]);
  let form_num = formnumber + 1;
  step_list[form_num].classList.remove("active");
  num.innerHTML = form_num;
}

let step_num_content = document.querySelectorAll(".step-number-content");

function contentchange() {
  step_num_content.forEach(function (content) {
    content.classList.remove("active");
    content.classList.add("d-none");
  });
  step_num_content[formnumber].classList.add("active");
}

function validateform() {
  let validate = true;
  let validate_inputs = document.querySelectorAll(".main.active input");
  validate_inputs.forEach(function (vaildate_input) {
    vaildate_input.classList.remove("warning");
    if (vaildate_input.hasAttribute("require")) {
      if (vaildate_input.value.length == 0) {
        validate = false;
        vaildate_input.classList.add("warning");
      }
    }
  });
  return validate;
}

let personalInfo = {
  name: "",
  phone: "",
};
let pickingAddress = {
  city: "",
  district: "",
  ward: "",
  street: "",
  home: "",
};
let arrivingAddress = {
  city: "",
  district: "",
  ward: "",
  street: "",
  home: "",
};

let infos = [personalInfo, pickingAddress, arrivingAddress];

function addressToString(address) {
  return `${address.city}, ${address.district}, ${address.ward},${address.street}, ${address.home}`;
}

function resetInputField(fields) {
  if (fields) Object.keys(fields).forEach((field) => (fields[field] = ""));
}

const getInfoProcess = [
  (personalInfo) => {
    personalInfo.name = $("#input_name").val();
    personalInfo.phone = $("#input_phone").val();
  },
  (pickingAddress) => {
    pickingAddress.city = $("#input_p_city").val();
    pickingAddress.district = $("#input_p_district").val();
    pickingAddress.ward = $("#input_p_ward").val();
    pickingAddress.street = $("#input_p_street").val();
    pickingAddress.home = $("#input_p_home").val();
  },
  (address) => {
    address.city = $("#input_a_city").val();
    address.district = $("#input_a_district").val();
    address.ward = $("#input_a_ward").val();
    address.street = $("#input_a_street").val();
    address.home = $("#input_a_home").val();
  },
];

$(".fetch-address").click(async function () {
  let fetchInfo = handleSearch();
  try {
    const data = await APIService.searchAddress({
      page: 1,
      limit: 20,
      search: fetchInfo.search,
    });
    if(data.status != 200) {
      throw new Error(data.error);
    }
    appendDataList(data.items, fetchInfo.datalist);
  } catch (err) {
    console.log(err);
  }
});

$(".fetch-phone").click(async function () {
  try {
    const data = await APIService.getRecentPhone(offset,limit);

    if(data.status != 200) {
      throw new Error(data.error);
    }
    if(!data.items)  return;
    let phones = data.items;
    phones = phones.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
    appendDataList(phones, "#phones");
  } catch (err) {
    alert(err.message);
  }
});

function appendDataList(options, datalistId) {
  console.log(options);
  $(datalistId).empty();
  if (options.length)
    options.forEach((option) => {
      $(datalistId).append("<option value='" + option + "'>");
    });
}

function handleSearch() {
  let id;
  if (formnumber == 1) {
    id = "#input_p";
  } else if (formnumber == 2) {
    id = "#input_a";
  }

  let result = {
    search: "",
    datalist: "",
  };

  let city = $(`${id}_city`).val();
  if (!city) {
    return result;
  }
  result.search += `${city}`;
  result.datalist = "#districts";

  let district = $(`${id}_district`).val();
  if (!district) {
    return result;
  }
  result.search += `,${district}`;
  result.datalist = "#wards";

  let ward = $(`${id}_ward`).val();
  if (!ward) {
    return result;
  }
  result.search += `,${ward}`;
  result.datalist = "#streets";

  let street = $(`${id}_street`).val();
  if (!street) {
    return result;
  }
  result.search += `,${street}`;
  result.datalist = "#homes";

  return result;
}

$("#show_result_button").click(function () {
  $("#result_phone").text(personalInfo.phone);
  $("#result_name_2").text(personalInfo.name);
  $("#result_name").text(personalInfo.name);
  $("#result_car").text($("input_car").val());
  $("#result_picking").text(addressToString(pickingAddress));
  $("#result_arriving").text(addressToString(arrivingAddress));
});


$("#create_request_button").click(async function () {
  try {
    const data = await APIService.createRequest(
      personalInfo.phone,
      $("#input_car").val(),
      "someguy",
      pickingAddress,
      arrivingAddress
    );
    lastRequestResponse = data.item;
    if(data.status != 200) {
      throw new Error(data.error);
    }
  } catch (err) {
    alert(err.message);
  }
});


$("#send_request_button").click(async function () {
  if(!lastRequestResponse.arrivingAddress.location || !lastRequestResponse.pickingAddress.location) {
    alert("Request not located");
    return;
  }
  try {
    const res = await APIService.sendRequest(lastRequestResponse.id);
    if(res.status != 200) {
      throw new Error(res.error);
    }
    alert("Sucess");
  } catch (err) {
    alert(err.message);
  }
});


$("#reset_button").click(function () {
  formnumber = 0;
  lastRequestResponse = null;
  $("#input_name").val("");
  $("#input_phone").val("");
  $("#input_p_city").val("");
  $("#input_p_district").val("");
  $("#input_p_ward").val("");
  $("#input_p_street").val("");
  $("#input_p_home").val("");
  $("#input_a_city").val("");
  $("#input_a_district").val("");
  $("#input_a_ward").val("");
  $("#input_a_street").val("");
  $("#input_a_home").val("");
  updateform();
  contentchange();
});


