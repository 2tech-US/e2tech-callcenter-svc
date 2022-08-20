import Request from "./request.js";
import TokenService from "./token_service.js";

async function urlToFile(url) {
  const res = await fetch(url, { mode: "cors" });
  const blob = await res.blob();
  const file = new File([blob], "file-name", { type: "image/jpeg" });
  return file;
}

function queryAllParamsFormat(
  page,
  limit,
  sort = "createdAt",
  order_by = "desc",
  range_field,
  min,
  max,
  query
) {
  const searchParams = new URLSearchParams();
  // searchParams.set("sort", sort);
  // searchParams.set("order_by", order_by);
  if (page) {
    searchParams.set("offset", page);
  }
  if (limit) {
    searchParams.set("limit", limit);
  }
  if (range_field) {
    searchParams.set("range_field", range_field);
  }
  if (min) {
    searchParams.set("min", min);
  }
  if (max) {
    searchParams.set("max", max);
  }
  if (query) {
    searchParams.set("query", query);
  }
  return searchParams;
}

const APIService = {
  login: async (phone, password) => {
    const url = "/auth/login/callcenter";
    const body = {
      phone: phone,
      password: password,
    };
    const res = await Request.post({
      url: url,
      body: body,
    });
    if (
      res.data.role != "callcenter_locator" &&
      res.data.role != "callcenter_creator" &&
      res.data.role != "callcenter_manager" &&
      res.data.role != "admin"
    ) {
      throw new Error("you don't have enough right to access this site!");
    }
    const accessToken = res.data.token;
    // const refreshToken = res.data.refreshToken;
    TokenService.accessToken.set(accessToken);
    // TokenService.refreshToken.set(refreshToken);
  },

  register: async (phone, name, password, role) => {
    const url = "/auth/register";
    const body = {
      phone: phone,
      name: name,
      password: password,
      role: role,
    };
    const res = await Request.post({
      url: url,
      body: body,
    });
    return res.data;
  },

  logout: async () => {
    TokenService.accessToken.del();
    TokenService.refreshToken.del();
  },

  getAddress: async (city, district, ward, street, home) => {
    const body = {
      city: city,
      district: district,
      ward: ward,
      street: street,
      home: home,
    };
    const url = "/callcenter/address";
    const res = await Request.post({ url: url, body: body, useToken: false });
    return res.data;
  },

  updateAddress: async (address, location) => {
    const body = {
      address: address,
      location: location,
    };
    const url = "/callcenter/address";
    const res = await Request.put({ url: url, body: body, useToken: false });
    return res.data;
  },

  searchAddress: async ({ page, limit, search } = {}) => {
    const searchParams = queryAllParamsFormat(
      page,
      limit,
      null,
      null,
      null,
      null,
      null,
      null
    );
    if (search) {
      searchParams.set("search", search);
    }
    const url = "/callcenter/address/search";
    const res = await Request.get({
      url: url,
      params: searchParams,
      useToken: false,
    });
    return res.data;
  },

  fetchRequest: async (id) => {
    const url = `/callcenter/request/${id}`;
    const res = await Request.get({ url: url, useToken: false });
    return res.data;
  },

  fetchRequests: async ({ page, limit, phone,state } = {}) => {
    const searchParams = queryAllParamsFormat(
      page,
      limit,
      null,
      null,
      null,
      null,
      null,
      null
    );
    if (phone) {
      searchParams.set("phone", phone);
    }
    if (state) {
      searchParams.set("state", state);
    }
    const url = "/callcenter/request";
    const res = await Request.get({
      url: url,
      params: searchParams,
      useToken: false,
    });
    return res.data;
  },

  createRequest: async (phone, type, employeeId, arriving, picking) => {
    const body = {
      phone: phone,
      type: type,
      employeeId: employeeId,
      arriving: arriving,
      picking: picking,
    };
    const url = "/callcenter/request";
    const res = await Request.post({ url: url, body: body, useToken: false });
    return res.data;
  },
};

export default APIService;
