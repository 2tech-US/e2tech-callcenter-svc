import pageConfig from './utils/data_table.js';
import APIService from "./utils/api_service.js";

pageConfig.getItemsMethods =  async () => {
  return await APIService.fetchRequests({ limit: pageConfig.limit, page: pageConfig.page });
};
pageConfig.tableName = 'Customer Requests';
pageConfig.limit = 10;

pageConfig.displayPage = 3;


pageConfig.tableHead = 
  `<tr>
  <th scope="col">Phone</th>
  <th scope="col">Created At</th>
  <th scope="col">Picking Address</th>
  <th scope="col">Arriving Address</th>
  <th scope="col">State;</th>
  </tr>
  `;


pageConfig.renderTableRow = (item) => {
  return `<tr>
  <td class="align-middle">${item.phone}</td>
  <td class="align-middle">${new Date(item.createAt['seconds'] * 1000).toLocaleString()}</td>
  <td class="align-middle">${addressToString(item.pickingAddress)}</td>
  <td class="align-middle">${addressToString(item.arrivingAddress)}</td>
  <td class="align-middle">
      ${item.type}
  </td>
</tr>
`;
};

function addressToString(address) {
  return `${address.home}, ${address.street}, ${address.ward}, ${address.district}, ${address.city}`;
}


await pageConfig.run();  


