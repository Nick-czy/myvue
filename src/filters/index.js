//全局过滤时间
export const subString = (value) => {
  if (value != "" && value.length > 10) {
    return value.substr(0, 10);
  } else {
    return value;
  }
}
