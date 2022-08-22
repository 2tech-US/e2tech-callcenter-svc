const pageConfig = {
  limit: 10,
  page: 1,
  totalPage: undefined,
  displayPage: 1,
  items: [],
  renderTableRow: undefined,
  bindRowAction: undefined,
  getItemsMethods: undefined,
  tableHead: undefined,
  tableName: undefined,
  tableQuery: undefined,
  run: async function () {
    await initialLoading();
  },
  renderStaticTable: function() {
    renderHead();
  }
};

function renderTable() {
  $(".table-fields tbody").html("");
  for (let row = 0; row < pageConfig.items.length; row++) {
    const item = pageConfig.items[row];
    $(".table-fields tbody:last-child").append(
      pageConfig.renderTableRow(item, row)
    );
  }
  if (pageConfig.bindRowAction) {
    pageConfig.bindRowAction();
  }
}

function renderPagination() {
  const pages = [];
  if (pageConfig.page != 1) {
    pages.push(`<li class="page-item"><a class="page-link">Previous</a></li>`);
  }
  let generated = 0;
  let startAt = pageConfig.page - Math.floor(pageConfig.displayPage / 2);
  let curr = startAt;
  while (generated < pageConfig.displayPage) {
    if (curr > pageConfig.totalPage) {
      startAt--;
      if (startAt < 1) break;
      pages.splice(
        1,
        0,
        `<li class="page-item"><a class="page-link">${startAt}</a></li>`
      );
      generated++;
      continue;
    }
    if (curr > 0) {
      if (curr == pageConfig.page) {
        pages.push(
          `<li class="page-item active"><a class="page-link">${curr}</a></li>`
        );
      } else {
        pages.push(
          `<li class="page-item"><a class="page-link">${curr}</a></li>`
        );
      }
      generated++;
    }
    curr++;
  }

  if (pageConfig.page != pageConfig.totalPage) {
    pages.push(`<li class="page-item"><a class="page-link">Next</a></li>`);
  }
  $(".pagination").html(pages.join("\n"));
  $(".page-item").click(function (e) {
    e.preventDefault();
    const nextPage = $(this).text().trim();
    switchPage(nextPage);
  });
}

async function tableLoadData() {
  $(".table-data").addClass("table-loading");
  $(".table-data").removeClass("table-loaded");
  try {
    let res = await pageConfig.getItemsMethods();
    if(res.status != 200) { throw new Error(res.error);}
    pageConfig.items = [];
    pageConfig.totalPage = Math.ceil(res["total"] / pageConfig.limit);
    if (res.items)
      for (let i = 0; i < res.items.length; i++) {
        pageConfig.items.push(res.items[i]);
      }
    renderTable();
    renderPagination();
  }  catch(err) {
    alert(err.message);
  }
  $(".table-data").removeClass("table-loading");
  $(".table-data").addClass("table-loaded");
}

function renderHead() {
  $(".table-name").text(pageConfig.tableName);
  $(".table-query").html(pageConfig.tableQuery);
  $(".table-fields thead").html(pageConfig.tableHead);
}

async function initialLoading() {
  $(".table-load-trigger").prop("disabled", true);
  $(".table-load-trigger").toggleClass("btn-primary btn-secondary");
  await tableLoadData();
  $(".table-load-trigger").prop("disabled", false);
  $(".table-load-trigger").toggleClass("btn-primary btn-secondary");
}

async function switchPage(nextPage) {
  nextPage = nextPage.trim();
  if (nextPage == "Next") {
    pageConfig.page++;
  } else if (nextPage == "Previous") {
    pageConfig.page--;
  } else {
    pageConfig.page = parseInt(nextPage);
  }
  await tableLoadData();
}

$(".table-load-trigger").click(async function (e) {
  e.preventDefault();
  pageConfig.page = 1;
  $(this).prop("disabled", true);
  $(this).toggleClass("btn-primary btn-secondary");
  $(".table-load-trigger i").toggleClass("fa-spin");
  await tableLoadData();
  $(this).prop("disabled", false);
  $(this).toggleClass("btn-primary btn-secondary");
  $(".table-load-trigger i").toggleClass("fa-spin");
});

export default pageConfig;
