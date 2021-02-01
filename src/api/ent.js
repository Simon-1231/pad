import request from "@/utils/request";
// import common from "@/common/common";

// 根据企业id查询企业信息
export function getEntById(params) {
  return request({
    url: "/ent/api/v2/pad/getEntById",
    method: "GET",
    params
  });
}

// 通过企业ID和职位名称查找职位列表
export function getPostList(params) {
  return request({
    url: "/ent/api/v2/pad/company/post",
    method: "GET",
    params
  });
}

// 职位更新
export function updatePosition(data) {
  return request({
    url: "/ent/api/v2/pad/updatePosition",
    method: "POST",
    data
  });
}

// 简介更新
export function updateIntroduction(params) {
  return request({
    url: "/ent/api/v2/pad/updateIntroduction",
    method: "GET",
    params
  });
}

// 查看简历
export function getResume(params) {
  return request({
    url: "/person/api/v2/pad/resume",
    method: "GET",
    params
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
 * 区域查询，根据登录用户类型及所属区域返回，默认返回国家，根据父级code查询下级
 * @param id
 * */
export function findUserRegionByCode(id) {
  return request({
    url: `/person/api/v2/rasicRegion/findByCode/${id}`,
    method: "get"
  });
}

// 分屏首页
export function screenIndex(params) {
  return request({
    url: "/info/api/v2/pad/screenIndex",
    method: "GET",
    params
  });
}

// 根据姓名+身份证+手机号查询/新增简历
export function addOrGetResume(params) {
  return request({
    url: "/person/api/v2/pad/addOrGetResume",
    method: "GET",
    params
  });
}

// 企业对个人的意向(意向 1：拒绝 2：待定/有意向 3：同意)
export function entIntentionPerson(params) {
  return request({
    url: "/ent/api/v2/pad/entIntentionPerson",
    method: "GET",
    params
  });
}

// 获取字典
export function auth(params) {
  return request({
    url: "/person/api/v2/dictionary/no/auth",
    method: "GET",
    params
  });
}
