export default (str: string) => {
  const rs = str.toLowerCase();
  return rs.charAt(0).toUpperCase() + rs.slice(1);
};
