function formatPathUserId() {
  return `user-id`;
}

function formatPathUserRole() {
  return `role`;
}

const UserinfoService = {
  id: {
    get: () => {
      const key = formatPathUserId();
      return localStorage.getItem(key);
    },
    set: (token) => {
      const key = formatPathUserId();
      localStorage.setItem(key, token);
    },
    del: () => {
      const key = formatPathUserId();
      localStorage.removeItem(key);
    },
  },

  role: {
    get: () => {
      const key = formatPathUserRole();
      return localStorage.getItem(key);
    },
    set: (token) => {
      const key = formatPathUserRole();
      localStorage.setItem(key, token);
    },
    del: () => {
      const key = formatPathUserRole();
      localStorage.removeItem(key);
    },
  },
  accessCreatorSitePermission: () => {
    if(!["callcenter_creator", "admin"].includes(UserinfoService.role.get())){
      alert("You Don't have permission to access this site");
      window.location.href = "/home";
    }
  },
  accessLocatorPermission: () => {
    if(!["callcenter_locator", "admin"].includes(UserinfoService.role.get())){
      alert("You Don't have permission to access this site");
      window.location.href = "/home";
    }
  },
  accessManagerSitePermission: () => {
    if(!["callcenter_manager", "admin"].includes(UserinfoService.role.get())){
      alert("You Don't have permission to access this site");
      window.location.href = "/home";
    }
  },
  checkAdminRole: () => {
    if(UserinfoService.role.get() != "admin"){
      alert("You Don't have permission to access this site");
      window.location.href = "/home";
    }
  },
};

export default UserinfoService;
