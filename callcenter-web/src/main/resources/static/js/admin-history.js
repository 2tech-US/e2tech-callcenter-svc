import pageConfig from "./utils/data_table.js";
import APIService from "./utils/api_service.js";
import UserService from "./utils/user_info_service.js";
import { validateDateWithCustomFormat } from "./utils/validate.js";

UserService.accessAdminSitePermission();


pageConfig.getItemsMethods = async () => {
  const  data = await APIService.getHistory({
    limit: pageConfig.limit,
    offset: (pageConfig.limit) * (pageConfig.page -1),
    phone: pageConfig.phone,
    role: pageConfig.role,
    endDate: pageConfig.endDate,
    startDate: pageConfig.startDate
  });
  data.items = data.history;
  data.total = 200;
  return data;
};
pageConfig.tableName = "Request History";
pageConfig.limit = 5;
pageConfig.page = 1;
pageConfig.role = "driver";
pageConfig.startDate = "2022/08/20";
pageConfig.endDate = new Date().toLocaleString('af-ZA').slice(0,10).replace(/-/g, '/');
pageConfig.displayPage = 3;
pageConfig.tableHead = `<tr>
  <th scope="col">Type</th>
  <th scope="col">Customer Phone</th>
  <th scope="col">Driver Phone</th>
  <th scope="col">Pickup Location</th>
  <th scope="col">Dropoff Location</th>
  <th scope="col">Created At</th>
  <th scope="col">End at</th>
  <th scope="col">Price</th>
  </tr>
  `;

pageConfig.tableQuery = `
<div class="col-2">
<label for="role">Type:</label>
<select name="role" id="role">
    <option value="driver">Driver</option>
    <option value="passenger">Passenger</option>
</select>
</div>
<div class="col-1">
<label for="index">item: </label>
<select name="index" id="limit">
    <option value="2">2</option>
    <option value="4">4</option>
    <option value="10">10</option>
</select>
</div>
<div class="col-3">
<label for="phone">Phone Number: </label>
<input id="phone" name="search" type="text" placeholder="...">
</div>
<div class="col-3">
<label for="start_date">Start Date: </label>
<input id="start_date" name="search" type="text" placeholder="yyyy/mm/dd">
</div>
<div class="col-3">
<label for="end_date">End Date: </label>
<input id="end_date" name="search" type="text" placeholder="yyyy/mm/dd">
</div>`;

pageConfig.renderTableRow = (item) => {
  return`<tr>
    <td class="align-middle">${item.type}</td>
    <td class="align-middle">${item.passenger_phone}</td>
    <td class="align-middle">${item.driver_phone}</td>
    <td class="align-middle">${item.pick_up_location.latitude}, ${item.pick_up_location.longitude}</td>
    <td class="align-middle">${item.drop_off_location.latitude}, ${item.drop_off_location.longitude}</td>
    <td class="align-middle">${item.created_at}</td>
    <td class="align-middle">${item.done_at}</td>
</tr>`;
};

pageConfig.renderStaticTable();
await pageConfig.run();

$("#limit").change(async function (e) {
  e.preventDefault();
  pageConfig.limit = $(this).val();
  await pageConfig.run();
});

$("#role").change(async function (e) {
  e.preventDefault();
  pageConfig.role = $(this).val();
  await pageConfig.run();
});

$("#phone").change(async function (e) {
  e.preventDefault();
  pageConfig.phone = $(this).val();
});

$("#start_date").change(async function (e) {
  e.preventDefault();
  if(validateDateWithCustomFormat("start_date",null,"YYYY/MM/DD"));
    pageConfig.startDate = $(this).val();
});

$("#end_date").change(async function (e) {
  e.preventDefault();
  if(validateDateWithCustomFormat("end_date",null,"YYYY/MM/DD"));
    pageConfig.endDate = $(this).val();
});

