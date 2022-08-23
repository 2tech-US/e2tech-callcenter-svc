import Request from "./request.js";
import TokenService from "./token_service.js";
import UserService from "./user_info_service.js";

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
  login: async (phone, password,role) => {
    const url = `/auth/login/${role}`;
    const body = {
      phone: phone,
      password: password,
      device_token: "null",
    };
    const res = await Request.post({
      url: url,
      body: body,
    });
    const accessToken = res.data.token;
    // const refreshToken = res.data.refreshToken;
    TokenService.accessToken.set(accessToken);
    // TokenService.refreshToken.set(refreshToken);
    UserService.id.set(phone);
    return res.data;
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

  logout:  () => {
    TokenService.accessToken.del();
    TokenService.refreshToken.del();
    UserService.id.del();
    UserService.role.del();
    window.location.href = "/login";
  },
  getUserInfo: async () => {
    const phone = UserService.id.get();
    const url = `/callcenter/${phone}`;
    const res = await Request.get({
      url: url,
      useToken: true
    });
    const data = res.data;
    UserService.role.set(data.item.role);
    return data;
  },
  updateUserInfo: async (name, url_image, date_of_birth) => {
    const phone = UserService.id.get();
    const url = `/callcenter/${phone}`;
    const body = {
      name: name,
      url_iamge: url_image,
      date_of_birth: date_of_birth
    }
    const res = await Request.put({
      url: url,
      useToken: true,
      body: body,
    });
    return res.data;
  },
  getRecentPhone: async (offset,limit) => {
    const url = "/callcenter/request/phone";
    const params = queryAllParamsFormat(
      offset,
      limit,
      null,
      null,
      null,
      null,
      null,
      null
    );
    const res = await Request.get({
      url: url,
      params:params,
      useToken: true,
    });
    return res.data;
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
    const res = await Request.post({ url: url, body: body, useToken: true });
    return res.data;
  },

  updateAddress: async (address, location) => {
    const body = {
      address: address,
      location: location,
    };
    const url = "/callcenter/address";
    const res = await Request.put({ url: url, body: body, useToken: true });
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
      useToken: true,
    });
    return res.data;
  },

  fetchRequest: async (id) => {
    const url = `/callcenter/request/${id}`;
    const res = await Request.get({ url: url, useToken: true });
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
      useToken: true,
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
    const res = await Request.post({ url: url, body: body, useToken: true });
    return res.data;
  },
  sendRequest: async (requestId) => {
    const url = `/callcenter/request/${requestId}`
    const res = await Request.post({ url: url,useToken: true });
    return res.data;
  },
  cancelRequest: async(requestId) => {
    const url = `/callcenter/request/${requestId}`;
    const res = await Request.put({url: url, useToken: true});
    return res.data;
  },
  getHistory: async({role, phone,offset,limit, startDate, endDate}) => {
    const url = `/booking/history`;
    const params = queryAllParamsFormat(
      offset,
      limit,
      null,
      null,
      null,
      null,
      null,
      null
    );
    if (phone) {
      params.set("phone", phone);
    }
    if (role) {
      params.set("role", role);
    }
    if(startDate) {
      params.set("start_date",startDate);
    }
    if(endDate) {
      params.set("end_date",endDate);
    }
    const res = await Request.get({url: url,params:params,useToken:true});
    return res.data;
  }
};

export default APIService;
