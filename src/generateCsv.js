const generateCsv = (array) => {
  // Doc: https://github.com/area17/a17-behaviors/wiki/generateCsv
  
  const replacer = (key, value) => value === null ? '' : value;
  const header = Object.keys(array[0]);
  const csv = [
    header.join(','),
    ...array.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer).replace(/\\"/g, '""')).join(','))
  ].join('\r\n');
  return csv;
};

export default generateCsv;
