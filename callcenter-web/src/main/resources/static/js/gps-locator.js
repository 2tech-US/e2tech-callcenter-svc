import pageConfig from "./utils/data_table.js";
import APIService from "./utils/api_service.js";

let emptyAddress = {
  city: "",
  district: "",
  ward: "",
  street: "",
  home: "",
  location: {
    latitude: "",
    longitude: "",
  },
};
let locateEventVariable = {};
const tableButtonEvent = {
  edit: (self) => {
    if (Object.entries(locateEventVariable).length !== 0) {
      return;
    }
    const id = $(self).data("id");
    console.log(id);
    const currentItem = pageConfig.items.find((e) => e.id == id);
    locateEventVariable.progress = 0;
    locateEventVariable.pickingAddress = currentItem.pickingAddress;
    locateEventVariable.arrivingAddress = currentItem.arrivingAddress;

    renderSelectRequest("#picking .select", locateEventVariable.pickingAddress);
    renderSelectRequest(
      "#arriving .select",
      locateEventVariable.arrivingAddress
    );

    $(self).parent().find(".process").attr("hidden", true);
    $(self).parent().find(".inprogess").attr("hidden", false);
  },
  cancel: (self) => {
    $(self).parent().find(".inprogess").attr("hidden", true);
    $(self).parent().find(".process").attr("hidden", false);

    renderSelectRequest("#picking .select", emptyAddress);
    renderSelectRequest("#arriving .select", emptyAddress);
    locateEventVariable = {};
  },
  save: async (self) => {
    try {
      await APIService.updateAddress(
        locateEventVariable.pickingAddress,
        locateEventVariable.pickingAddress.location
      );
      await APIService.updateAddress(
        locateEventVariable.arrivingAddress,
        locateEventVariable.arrivingAddress.location
      );

      $(self).parent().find(".inprogess").attr("hidden", true);
      $(self).parent().find(".process").attr("hidden", false);
      renderSelectRequest("#picking .select", emptyAddress);
      renderSelectRequest("#arriving .select", emptyAddress);
      locateEventVariable = {};

      $(".table-load-trigger").trigger("click");
    } catch (err) {
      console.log(err);
    }
  },
};

pageConfig.getItemsMethods = async () => {
  return await APIService.fetchRequests({
    limit: pageConfig.limit,
    page: pageConfig.page,
  });
};
pageConfig.tableName = "Customer Requests";
pageConfig.limit = 3;

pageConfig.displayPage = 3;

pageConfig.tableHead = `<tr>
    <th scope="col">Phone</th>
    <th scope="col">Created At</th>
    <th scope="col">Picking Address</th>
    <th scope="col">Arriving Address</th>
    <th scope="col">&nbsp;</th>
    </tr>
    `;

pageConfig.renderTableRow = (item) => {
  console.log(item);
  return `<tr>
    <td class="align-middle">${item.phone}</td>
    <td class="align-middle">${new Date(
      item.createAt["seconds"] * 1000
    ).toLocaleString()}</td>
    <td class="align-middle">${addressToString(item.pickingAddress)}</td>
    <td class="align-middle">${addressToString(item.arrivingAddress)}</td>
    <td class="align-middle">
        <button class="table-btn manage-btn-edit process" data-click="edit"  data-id='${
          item.id
        }'>Edit</button>
        <button class="table-btn manage-btn-send process" data-click="send" data-id='${
          item.id
        }'>Send</button>

        <button hidden class="table-btn manage-btn-save inprogess" data-click="save" data-id='${
          item.id
        }'>Save</button>
        <button hidden class="table-btn manage-btn-cancel inprogess" data-click="cancel"  data-id='${
          item.id
        }'>Cancel</button>
    </td>
  </tr>
  `;
};

pageConfig.bindRowAction = () => {
  $(".table-btn").click(async function (e) {
    let event = $(this).data("click");
    await tableButtonEvent[event](this);
  });
};

pageConfig.renderStaticTable();
await pageConfig.run();

const map = L.map("map").setView([16.0669077, 108.2137987], 19);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

map.on("click", function (e) {
  if (Object.entries(locateEventVariable).length === 0) {
    return;
  }
  let location = {};
  if (locateEventVariable.progress == 0) {
    location.latitude = e.latlng.lat;
    location.longitude = e.latlng.lng;
    locateEventVariable.pickingAddress.location = location;
    $(`#picking .select-lat`).text(e.latlng.lat);
    $(`#picking .select-lng`).text(e.latlng.lng);
    locateEventVariable.progress++;
  } else if (locateEventVariable.progress == 1) {
    location.latitude = e.latlng.lat;
    location.longitude = e.latlng.lng;
    locateEventVariable.arrivingAddress.location = location;
    locateEventVariable.progress = 0;
    $(`#arriving .select-lat`).text(e.latlng.lat);
    $(`#arriving .select-lng`).text(e.latlng.lng);
  }
});

function addressToString(address) {
  return `${address.home}, ${address.street}, ${address.ward}, ${address.district}, ${address.city}`;
}
function renderSelectRequest(idPart, address) {
  $(`${idPart}-city`).text(address.city);
  $(`${idPart}-district`).text(address.district);
  $(`${idPart}-ward`).text(address.ward);
  $(`${idPart}-street`).text(address.street);
  $(`${idPart}-home`).text(address.home);
  if (address.location) {
    $(`${idPart}-lat`).text(address.location.latitude);
    $(`${idPart}-lng`).text(address.location.longitude);
  }
}
