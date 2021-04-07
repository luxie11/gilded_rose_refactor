const fetch = require("node-fetch");

const getInformation = async () => {
  try {
    const response = await fetch("https://yesno.wtf/api");
    if (response.status === 200) {
      try {
        const jsonResult = await response.json();
        return jsonResult;
      } catch(e) {
        return e;
      }
    }
  } catch (e) {
    return e;
  }
}

module.exports = {
  getInformation
}