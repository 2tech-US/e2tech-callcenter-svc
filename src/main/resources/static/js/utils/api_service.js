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
  login: async (email, password, role) => {
    const url = "/api/v1/auth/login";
    const body = {
      email: email,
      password: password,
    };
    const res = await Request.post({
      url: url,
      body: body,
    });
    if (res.data.role != role && res.data.role != "admin") {
      throw new Error("you don't have enough right to access this site!");
    }
    const accessToken = res.data.accessToken;
    const refreshToken = res.data.refreshToken;
    TokenService.accessToken.set(accessToken);
    TokenService.refreshToken.set(refreshToken);
  },
  logout: async () => {
    const url = "/api/v1/auth/logout";
    try {
      await Request.get({
        useToken: true,
        url: url,
        token: TokenService.refreshToken.get(),
      });
    } catch (e) {
      console.log(e);
    } finally {
      TokenService.accessToken.del();
      TokenService.refreshToken.del();
    }
  },
  
  getAddress: async(city, district, ward, street, home) => {
    const body = {
      city: city,
      district: district,
      ward: ward, 
      street: street,
      home: home,
    }
    const url =  "/location/address" ;
    const res =  await Request.post({url: url , body: body, useToken: false});
    return res.data;
  },

  updateAddress: async(address, location) => {
    const body = {
      address: address,
      location: location,
    }
    const url =  "/location/address" ;
    const res =  await Request.put({url: url , body: body, useToken: false});
    return res.data;
  },

  searchAddress: async({page, limit,search} = {}) => {
    const searchParams = queryAllParamsFormat(page, limit, null, null, null, null, null, null);
    if(search) {
      searchParams.set("search",search);
    }
    const url =  "/location/address/search" ;
    const res =  await Request.get({url: url , params: searchParams, useToken: false});
    return res.data;
  },


  fetchRequest: async(id) => {
    const url =  `/location/request/${id}` ;
    const res =  await Request.get({url: url ,useToken: false});
    return res.data;
  },

  fetchRequests: async({page, limit,phone} = {}) => {
    const searchParams = queryAllParamsFormat(page, limit, null, null, null, null, null, null);
    if(phone) {
      searchParams.set("phone",phone)
    }
    const url =  "/location/request" ;
    const res =  await Request.get({url: url , params: searchParams, useToken: false});
    return res.data;
  },

  createRequest: async(phone, type ,employeeId,arriving, picking) => {
    const body = {
      phone:phone, 
      type: type,
      employeeId: employeeId,
      arriving: arriving,
      picking: picking,
    };
    const url = "/location/request";
    const res = await Request.post({url:url , body: body,useToken: false });
    return res.data;
  },
};

export default APIService;
