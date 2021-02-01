export function checkId(idcard) {
  // 只验证18位，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  if (!/^\d{17}([0-9]|X)$/.test(idcard)) {
    return false;
  }
  return true;
}

// 检查手机号码(参数：输入的手机号)
export function checkPhoneNum(s) {
  // let reg=/^(0|86|17951)?1(3[0-9]|4[579]|5[012356789]|6[6]|7[35678]|8[0-9]|9[89])\d{8}$/
  // 由于手机号正则规律较常变化，固只验证是否11位数字
  const reg = /^[0-9]{11}$/;
  return reg.test(s);
}
