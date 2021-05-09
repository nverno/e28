const axios = require('axios');
const { DOMParser } = require('xmldom');
const xpath = require('xpath');

// var fetch = window.fetch;
// if (typeof window === 'undefined') fetch = require('node-fetch');
// else fetch = window.fetch;

const BASE_URL = 'https://e28-proxy.herokuapp.com/api/xpath';

const createUrl = (params) => {
  return (
    BASE_URL + '?' +
      Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&')
  );
};

export const fetchPageSource = async (url) => {
  // const res = await fetch(createUrl({ url }));
  // if (!res.ok) throw new Error(`API Error: ${res.status}`);
  // const data = await res.json();

  try {
    const res = await axios.get(createUrl({ url }));
    return new DOMParser().parseFromString(res.data);
  } catch (err) {
    // console.error(err.message);
    throw new Error(`DOM conversion: ${err.message}`);
  }
};

export const runQuery = async (url, p) => {
  try {
    const doc = await fetchPageSource(url);

    return xpath.select(p, doc);
  } catch (err) {
    throw new Error(`Xpath: ${err.message}`);
  }
  // var doc = new DOMParser().parseFromString(str),
  //     nodes = xpath.select(p, doc);
  // return nodes;
};

window.addEventListener('DOMContentLoaded', () => {
  window.axios = axios;
});
