
import pageConfig from './utils/data_table.js';

pageConfig.getItemsMethods =  async () => {
    // return await APIService.fetchAllCategory({ limit: pageConfig.limit, page: pageConfig.page });
    let pickingAddress = {
      city: "Tp.HCM",
      district: "Quan 1",
      ward: "Phuong Cau Ong Lanh",
      street: "Duong Tran Hung Dao",
      home: "135B"
  };
  let arrivingAddress = {
    city: "Tp.HCM",
    district: "Quan 1",
    ward: "Phuong Cau Ong Lanh",
    street: "Duong Tran Hung Dao",
    home: "135B",
  };

    const testItems = {
      'total-pages': 3,
      'current-page': 1,
      'items': [
        {   id:"1",
            phone: "0908080572",
            name: "John Smith",
            pickingAddress: pickingAddress,
            arrivingAddress: arrivingAddress
        },
        {
            id: "2",
            phone: "0908080571",
            name: "John Smith2",
            pickingAddress: pickingAddress,
            arrivingAddress: arrivingAddress
        },
        {
            id: "3",
            phone: "0908080573",
            name: "John Smith3",
            pickingAddress: pickingAddress,
            arrivingAddress: arrivingAddress
        }
    ],
    };
    return  testItems;
  };
  pageConfig.tableName = 'Customer Requests';
  pageConfig.limit = 5;
  
  pageConfig.displayPage = 5;
  
  
  pageConfig.tableHead = 
    `<tr>
    <th scope="col">Phone</th>
    <th scope="col">Name</th>
    <th scope="col">Picking Address</th>
    <th scope="col">Arriving Address</th>
    <th scope="col">&nbsp;</th>
    </tr>
    `;
  
  
  pageConfig.renderTableRow = (item) => {
    return `<tr>
    <td class="align-middle">${item.phone}</td>
    <td class="align-middle">${item.name}</td>
    <td class="align-middle">${addressToString(item.pickingAddress)}</td>
    <td class="align-middle">${addressToString(item.arrivingAddress)}</td>
    <td class="align-middle">
        <button class="manage-btn-edit progess"  data-id='${item.id}'>Edit</button>
        <button class="manage-btn-send progess"  data-id='${item.id}'>Send</button>

        <button hidden class="manage-btn-save inprogess"  data-id='${item.id}'>Save</button>
        <button hidden class="manage-btn-cancel inprogess"  data-id='${item.id}'>Cancel</button>
    </td>
  </tr>
  `;
  };

await pageConfig.run();  

const map = L.map('map').setView([16.0669077,108.2137987], 19);

const attribution =
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

let locateEventVariable = {};
$(".manage-btn-edit").click(function(){
  console.log("click");
  if(Object.entries(locateEventVariable).length!==0) {
    return;
  } 
  const id = $(this).data("id");
  const currentItem= pageConfig.items.find(e => e.id == id);

  locateEventVariable.progress = 0;
  locateEventVariable.pickingAddress = currentItem.pickingAddress;
  locateEventVariable.arrivingAddress = currentItem.arrivingAddress;

  renderSelectRequest("#picking .select",locateEventVariable.pickingAddress);
  renderSelectRequest("#arriving .select", locateEventVariable.arrivingAddress);
  
  $(this).parrent().find(".process").attr("hidden",true);
  $(this).parent().find(".inprogess").attr("hidden",false);
})


$(".manage-btn-cancel").click(function () {
  locateEventVariable = {};
  $(this).parent().find(".inprogess").attr("hidden",true);
  $(this).parent().find(".process").attr("hidden",false);
})


map.on('click', function(e) {
  if(Object.entries(locateEventVariable).length === 0) {
    return;
  } 
  if(locateEventVariable.progress==0) {
    locateEventVariable.pickingAddress.latitude = e.latlng.lat;
    locateEventVariable.pickingAddress.longitude = e.latlng.lng;
    $(`#picking .select-lat`).text(e.latlng.lat);
    $(`#picking .select-lng`).text(e.latlng.lng);
    locateEventVariable.progress++;
  } else if (locateEventVariable.progress==1) {
    locateEventVariable.arrivingAddress.latitude = e.latlng.lat;
    locateEventVariable.arrivingAddress.longitude = e.latlng.lng;
    locateEventVariable.progress=0;
    $(`#arriving .select-lat`).text(e.latlng.lat);
    $(`#arriving .select-lng`).text(e.latlng.lng);
  }
});



function addressToString(address) {
  return `${address.home}, ${address.street}, ${address.ward}, ${address.district}, ${address.city}`;
}
function renderSelectRequest(idPart,address){
  $(`${idPart}-city`).text(address.city);
  $(`${idPart}-district`).text(address.district);
  $(`${idPart}-ward`).text(address.ward);
  $(`${idPart}-street`).text(address.street);
  $(`${idPart}-home`).text(address.home);
  $(`${idPart}-lat`).text(address.latitude);
  $(`${idPart}-lng`).text(address.longitude);
}
