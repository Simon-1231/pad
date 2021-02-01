const state = {
  postDetail: {}, // 岗位详情
  entType: "1",
  resumeInfo: {}, // 简历信息
  isChosePost: 1 // 查看简历前是否选择了岗位
};

const mutations = {
  set_postDetail: (state, postDetail) => {
    state.postDetail = postDetail;
  },
  set_entType: (state, entType) => {
    state.entType = entType;
  },
  set_resume: (state, resumeInfo) => {
    state.resumeInfo = resumeInfo;
  },
  set_isChosePost: (state, isChosePost) => {
    state.isChosePost = isChosePost;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
