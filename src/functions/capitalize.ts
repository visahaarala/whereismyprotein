export default (str: string, upperToSpace?: boolean) => {
  if (str.length === 0) return '';

  let rs = '';
  if (upperToSpace) {
    for (const c of str) {
      if (c === c.toLowerCase()) rs += c;
      else rs += ' ' + c;
    }
  } else {
    rs = str.toLowerCase();
  }

  rs = rs.charAt(0).toUpperCase() + rs.slice(1);

  rs = rs.replace('_', ' ');
  return rs;
};
