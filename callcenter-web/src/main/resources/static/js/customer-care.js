import pageConfig from "./utils/data_table.js";
import APIService from "./utils/api_service.js";
import UserService from "./utils/user_info_service.js";

UserService.accessManagerSitePermission();


pageConfig.getItemsMethods = async () => {
  return await APIService.fetchRequests({
    limit: pageConfig.limit,
    page: pageConfig.page,
    phone: pageConfig.phone,
    state: pageConfig.state,
  });
};
pageConfig.tableName = "Customer Requests";
pageConfig.limit = 2;
pageConfig.page = 1;
pageConfig.state = "nonlocated";

pageConfig.displayPage = 3;

pageConfig.tableHead = `<tr>
  <th scope="col">Phone</th>
  <th scope="col">Created At</th>
  <th scope="col">Picking Address</th>
  <th scope="col">Arriving Address</th>
  <th scope="col">State</th>
  <th scope="col">action</th>
  </tr>
  `;

pageConfig.tableQuery = `
<div class="col-2">
<label for="state">State:</label>
<select name="state" id="state">
    <option value="nonlocated">Not Locate</option>
    <option value="located">Located</option>
    <option value="sended">sended</option>
</select>
</div>
<div class="col-2">
<label for="index">item: </label>
<select name="index" id="limit">
    <option value="2">2</option>
    <option value="4">4</option>
    <option value="10">10</option>
</select>
</div>
<div class="col-6">
<label for="search">Phone Number: </label>
<input id="phone" name="search" type="text" placeholder="...">
</div>`;

pageConfig.renderTableRow = (item) => {
  return `<tr>
  <td class="align-middle">${item.phone}</td>
  <td class="align-middle">${new Date(
    item.createAt["seconds"] * 1000
  ).toLocaleString()}</td>
  <td class="align-middle">${addressToString(item.pickingAddress)}</td>
  <td class="align-middle">${addressToString(item.arrivingAddress)}</td>
  <td class="align-middle">
      ${stateOfRequest(item)}
  </td>
  <td class="align-middle">
    <button class="table-btn btn btn-danger" data-id=${item.id}>Cancel</button>
  </td>
</tr>
`;
};

pageConfig.bindRowAction = () => {
  $(".table-btn").click(async function (e) {
    if ($("#state").val() === "sended") {
      // TODO: call cancel request in booking svc
    } else {
      try {
        const res = APIService.cancelRequest($(this).data("id"));
        console.log(res.status);
        $(".table-load-trigger").trigger("click");
      } catch (err) {
        $(".table-load-trigger").trigger("click");
      }
    }
  });
};

pageConfig.renderStaticTable();
await pageConfig.run();

$("#limit").change(async function (e) {
  e.preventDefault();
  pageConfig.limit = $(this).val();
  await pageConfig.run();
});

$("#state").change(async function (e) {
  e.preventDefault();
  pageConfig.state = $(this).val();
  await pageConfig.run();
});

$("#phone").change(async function (e) {
  e.preventDefault();
  pageConfig.phone = $(this).val();
});

function addressToString(address) {
  return `${address.home}, ${address.street}, ${address.ward}, ${address.district}, ${address.city}`;
}

function stateOfRequest(request) {
  if (request.pickingAddress.location && request.arrivingAddress.location)
    return "Located";
  else return "Not Located";
}
