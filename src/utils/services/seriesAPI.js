import { BASE_URL, SERIES_BASE_URL, API_KEY,PRIVATE_API_KEY } from '../helper';
var CryptoJS = require("crypto-js");
let ts=Date.now();
function hashgen(apiKey,privateApiKey){
  let cs = ts+privateApiKey+apiKey;
  var md5Hash = CryptoJS.MD5(cs);
  var hash = md5Hash.toString(CryptoJS.enc.Hex);
  return hash;
}
const getAllSeriesAPI = (offset, success) => {

  let url =
    `${BASE_URL}/${SERIES_BASE_URL}?apikey=${API_KEY}&limit=40&offset=${offset}&hash=${hashgen(API_KEY,PRIVATE_API_KEY)}&ts=${ts}`;
  return fetch(url)
    .then(res => res.json())
    .then((resObj) => {
      try {
        if (resObj.code === 200) {
          return success(resObj);
        } else {
          throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
        }
      } catch (err) {
        console.error(err);
        return {
          data: {}
        };
      }
    });
}

const getSeriesDetailsAPI = (seriesId, success) => {

  let url =
    `${BASE_URL}/${SERIES_BASE_URL}/${seriesId}?apikey=${API_KEY}&hash=${hashgen(API_KEY,PRIVATE_API_KEY)}&ts=${ts}`;
  return fetch(url)
    .then(res => res.json())
    .then((resObj) => {
      try {
        if (resObj.code === 200) {
          return success(resObj);
        } else {
          throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
        }
      } catch (err) {
        console.error(err);
        return {
          data: {}
        };
      }
    });
}

export {
  getAllSeriesAPI,
  getSeriesDetailsAPI,
};
  