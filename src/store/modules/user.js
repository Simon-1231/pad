import { login, logout, getInfo } from "@/api/user";
import {
  getToken,
  setToken,
  removeToken,
  getUserName,
  setUserName
} from "@/utils/auth";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: [],
  username: "",
  mobile: "",
  email: "",
  state: "",
  id: "",
  userType: "",
  rolesId: [],
  resource: [],
  organization: "",
  entInfo: {},
  exInfo: {}
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_USERNAME: (state, username) => {
    state.username = username;
  },
  SET_ID: (state, id) => {
    state.id = id;
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile;
  },
  SET_EMAIL: (state, email) => {
    state.email = email;
  },
  SET_USERTYPE: (state, userType) => {
    state.userType = userType;
  },
  SET_ROLESID: (state, rolesId) => {
    state.rolesId = rolesId;
  },
  SET_RESOURSE: (state, sourse) => {
    state.resource = sourse;
  },
  SET_ORGAN: (state, organ) => {
    state.organization = organ;
  },
  set_entInfo: (state, entInfo) => {
    state.entInfo = entInfo;
  },
  SET_exInfo: (state, exInfo) => {
    state.exInfo = exInfo;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username } = userInfo;
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(response => {
          // const { data } = response;
          // console.log("response", response);
          // commit("SET_TOKEN", data.accessToken);
          commit("SET_USERNAME", username);
          commit("set_entInfo", response.data);
          // sessionStorage.setItem("token", data.accessToken);
          // setToken(data.accessToken);
          // setUserType(data.userType);
          setUserName(username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo(getUserName())
        .then(response => {
          console.log("response getInfo", response);
          const data = response.data;
          if (!data) {
            reject("Verification failed, please Login again.");
          }

          var roles = data.resources;
          const name = data.name;
          const avatar = data.headimgUrl;
          const introduction = data.name;
          const username = data.username;
          const mobile = data.mobile;
          const email = data.email;
          const id = data.id;
          const userType = data.userType;
          const rolesId = data.roles;
          const organization = data.organization;
          console.log("roles", roles, "name", name, "avatar", avatar);
          // roles must be a non-empty array
          // if (!roles || roles.length <= 0) {
          //   reject('getInfo: roles must be a non-null array!')
          // }
          console.log("getInfo", roles);

          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);
          commit("SET_USERNAME", username);
          commit("SET_ID", id);
          commit("SET_MOBILE", mobile);
          commit("SET_EMAIL", email);
          commit("SET_USERTYPE", userType);
          commit("SET_ROLESID", rolesId);
          commit("SET_ORGAN", organization);
          resolve(data);
        })
        .catch(error => {
          console.log("getInfo error", error);
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    console.log(" logout state", state);
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(response => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          setToken("");
          removeToken();
          sessionStorage.clear();
          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch("tagsView/delAllViews", null, { root: true });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      sessionStorage.clear();
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(resolve => {
      const token = role + "-token";

      commit("SET_TOKEN", token);
      setToken(token);
      // reset visited views and cached views
      dispatch("tagsView/delAllViews", null, { root: true });

      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
