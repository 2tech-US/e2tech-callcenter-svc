import pageConfig from './utils/data_table.js';

// PAGE DATA TABLE CONFIG
pageConfig.tableName = 'Customer Requests';
pageConfig.limit = 5;
pageConfig.displayPage = 5;
pageConfig.tableHead = 
  `<tr>
  <th scope="col">Phone</th>
  <th scope="col">Name</th>
  <th scope="col">Picking Address</th>
  <th scope="col">Arriving Address</th>
  <th scope="col">status</th>
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
      <button class="manage-btn-edit"  data-id='${item.id}'>Edit</button>
      <button hidden class="manage-btn-save inprogess"  data-id='${item.id}'>Save</button>
      <button hidden class="manage-btn-cancel inprogess"  data-id='${item.id}'>Cancel</button>
  </td>
</tr>
`;
};

await pageConfig.run();  