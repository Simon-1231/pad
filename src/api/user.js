import request from "@/utils/request";
// import common from "@/common/common";

// 账号登录
export function login(params) {
  return request({
    url: "/user/api/v2/pad/loginIn",
    method: "post",
    params
  });
}

// 证件扫描登录
export function cardLogin(params) {
  return request({
    url: "/user/api/v2/pad/loginBysnAndSfzh",
    method: "GET",
    params
  });
}

export function getInfo() {
  return request({
    url: "/user/api/v2/users/info/authority",
    method: "get"
  });
}

export function logout(token) {
  return request({
    url: "/user/api/v2/logout",
    method: "post",
    data: {
      token: token
    }
  });
}

export function refresh() {
  return request({
    url: "api-auth/authToken/refresh",
    method: "post"
  });
}
/**
 * 获取字典
 * @param type
 */
export function getDictionary(type) {
  return request({
    url: `/person/api/v2/dictionary?type=${type}`,
    method: "get"
  });
}
/**
 * 获取职位
 * @param code
 */
export function getPositionType(page, size, code) {
  return request({
    url: `/person/api/v2/dictionary/position?page=${page}&size=${size}&code=${code}`,
    method: "get"
  });
}
/**
 * 区域查询，默认返回国家，根据父级id查询下级, 入参 100000，是查全国的
 * @param id
 */
export function getArea(id) {
  return request({
    url: `/person/api/v2/rasicRegion/findByCode/${id}`,
    method: "get"
  });
}

/**
 * 修改密码
 * @param username
 * @param data
 */
export function changePassword(id, data) {
  return request({
    url: `/user/api/v2/users/password/${id}`,
    method: "put",
    data: {
      newPassword: data.newPassword,
      oldPassword: data.oldPassword
    }
  });
}
/**
 * 获取用户列表
 * @param page
 * @param size
 */
export function getUserList(page, size, userType, name, username, mobile) {
  return request({
    url: `/user/api/v2/users?page=${page}&size=${size}&userType=${userType}&name=${name}&username=${username}&mobile=${mobile}`,
    method: "get"
  });
}
/**
 * 保存用户/添加用户
 *
 * */
export function addUser(data) {
  return request({
    url: "/user/api/v2/users",
    method: "post",
    data
  });
}

/**
 * 修改用户
 * @param id
 * @param data
 */
export function uploadUser(id, data) {
  return request({
    url: `/user/api/v2/users/${id}`,
    method: "put",
    data
  });
}

/**
 * 删除用户id获取用户
 * @param id  用户id
 */
export function deleteUser(id) {
  return request({
    url: `/user/api/v2/users/${id}`,
    method: "delete"
  });
}

/**
 * 删除用户id获取用户
 * @param id  用户id
 */
export function getUserResById(id) {
  return request({
    url: `/user/api/v2/users/${id}`,
    method: "GET"
  });
}

/**
 * 企业用户 绑定过的微信列表
 * */
export function getOpenIdList() {
  return request({
    url: "/user/api/v2/users/openid",
    method: "get"
  });
}

/**
 * 企业用户 解绑微信用户
 * */
export function unbindOpenId(id) {
  return request({
    url: `/user/api/v2/users/openid/${id}`,
    method: "delete"
  });
}

/**
 * 重置密码
 * @param id  用户id
 */
export function handleReset(id) {
  return request({
    url: `/user/api/v2/users/password/reset/${id}`,
    method: "put"
  });
}

/**
 * 获取验证码
 * @param id  用户id
 */
export function verCode(data) {
  return request({
    url: `/user/api/v2/wechat/miniapp/verCode`,
    method: "POST",
    data
  });
}

// 验证码登录
export function loginByPhone(params) {
  return request({
    url: `/user/api/v2/pad/loginByPhone`,
    method: "GET",
    params
  });
}

/**
 * 根据mac地址获取SN号
 * @param {mac} mac
 */
export function padMac(mac) {
  return request({
    url: `/info/api/v2/pad/mac?mac=${mac}`,
    method: "GET"
  });
}
