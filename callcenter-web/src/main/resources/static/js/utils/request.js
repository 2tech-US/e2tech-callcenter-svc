import TokenService from "./token_service.js";

axios.defaults.baseURL = "http://localhost:3000";

function headerAuthFormat(token) {
  const header = { authorization: `Bearer ${token}` };
  return header;
}

async function tokenReset() {
  try {
    const refreshToken = TokenService.refreshToken.get();
    const res = await axios.get("/api/v1/auth/token", {
      headers: headerAuthFormat(refreshToken),
    });
    const tokens = res.data;
    const newAccessToken = tokens.accessToken;
    const newRefreshToken = tokens.refreshToken;
    TokenService.accessToken.set(newAccessToken);
    TokenService.refreshToken.set(newRefreshToken);
  } catch (err) {
    throw new Error("invalid refresh-token");
  }
}

async function request(url, params, body, headers, method, useToken, token) {
  let reqHeaders;
  if (useToken) {
    let reqToken = TokenService.accessToken.get();
    if (token) {
      reqToken = token;
    }
    reqHeaders = { ...headers, ...headerAuthFormat(reqToken) };
  }
  const request = {
    method: method,
    headers: reqHeaders,
    data: body,
    url: url,
    params: params,
  };
  try {
    const res = await axios(request);
    return res;
  } catch (err) {
    const statusCode = err.response.status;
    let errMsg;
    try {
      errMsg = err.response.data['error'];
    } catch (err) {
      errMsg = "something went wrong";
    }
    if(statusCode == 401) {
      throw Error("unauthorized");
    }
    if (!useToken || statusCode != 401) {
      throw new Error(errMsg);
    }

    // await tokenReset();
    // let reqToken = TokenService.accessToken.get();
    // if (token) {
    //   reqToken = token;
    // }
    // reqHeaders = { ...headers, ...headerAuthFormat(reqToken) };
    // request.headers = reqHeaders;
    // const res = await axios(request);
    // return res;
  }
}

const Request = {
  get: async ({
    url,
    params = {},
    body = {},
    headers = {},
    useToken = false,
    token = null,
  } = {}) => {
    return await request(url, params, body, headers, "get", useToken, token);
  },
  put: async ({
    url,
    params = {},
    body = {},
    headers = {},
    useToken = false,
    token = null,
  } = {}) => {
    return await request(url, params, body, headers, "put", useToken, token);
  },
  post: async ({
    url,
    params = {},
    body = {},
    headers = {},
    useToken = false,
    token = null,
  } = {}) => {
    return await request(url, params, body, headers, "post", useToken, token);
  },
  delete: async ({
    url,
    params = {},
    body = {},
    headers = {},
    useToken = false,
    token = null,
  } = {}) => {
    return await request(url, params, body, headers, "delete", useToken, token);
  },
  patch: async ({
    url,
    params = {},
    body = {},
    headers = {},
    useToken = false,
    token = null,
  } = {}) => {
    return await request(url, params, body, headers, "patch", useToken, token);
  },
};

export default Request;
