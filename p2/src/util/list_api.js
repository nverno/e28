import { axios } from '../common/app';
const { DOMParser } = require('xmldom');
const xpath = require('xpath');

var fetch;
if (typeof window === 'undefined') fetch = require('node-fetch');
else fetch = window.fetch;

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
  const res = await fetch(createUrl({ url }));
  if (!res.ok) throw new Error(`API Error: ${res.status}`);

  const data = await res.json();
  try {
    return new DOMParser().parseFromString(data);
  } catch (err) {
    // console.error(err.message);
    throw new Error(`DOM conversion: ${err.message}`);
  }
};

export const runQuery = (str, p) => {
  var doc = new DOMParser().parseFromString(str),
      nodes = xpath.select(p, doc);

  return nodes;
};

export const postList = (list, callback) => {
  return axios.post('tasklist', list)
    .then((resp) => callback(resp));
};

export const fetchLists = (callback) => {
  return axios.get('tasklist')
    .then((resp) => callback(resp.data.tasklist));
};

export const fetchList = async (id) => {
  const lists = await axios.get('tasklist');
  return lists.data.tasklist.filter(lst => id == lst.id);
};

export const fetchItems = (callback) => {
  return axios.get('task')
    .then(resp => callback(resp.data.task));
};
