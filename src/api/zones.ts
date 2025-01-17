import { createFilterparameters } from '../poll-api/pollTools.js';
import { DISPLAYMODE_PARK } from '../reducers/layers.js';
const didFetchSucceed = (response) => response.status >= 200 && response.status <= 299;

const getFetchOptions = (token) => {
  if(token) {
    return {
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "charset": "utf-8"
      }
    }
  }
  return {
    headers: {
      "Content-Type": "application/json",
      "charset": "utf-8"
    }
  }
}

export const getAdminZones = async (token, filter) => {
  if(! filter) return [];
  if(! filter.municipality) return [];

  let filterParams = `municipality=${filter.municipality}&geography_types=no_parking&geography_types=stop&geography_types=monitoring`;
  const url = `https://mds.dashboarddeelmobiliteit.nl/admin/zones?${filterParams}`;
  const response = await fetch(url, getFetchOptions(token));
  if (! didFetchSucceed(response)) return;
  return await response.json();
}

export const getPublicZones = async (filter) => {
  let filterParams = (filter && filter.municipality) ? `municipality=${filter.municipality}&` : '';
  filterParams += `geography_types=no_parking&geography_types=stop`;
  const url = `https://mds.dashboarddeelmobiliteit.nl/public/zones?${filterParams}`;
  const response = await fetch(url, getFetchOptions());
  if (! didFetchSucceed(response)) return;
  return await response.json();
}

export const postZone = async (token, data) => {
  const url = `https://mds.dashboarddeelmobiliteit.nl/admin/zone`;
  const response = await fetch(url, Object.assign({}, getFetchOptions(token), {
    method: 'POST',
    body: JSON.stringify(data)
  }));
  if (! didFetchSucceed(response)) return;
  return await response.json();
}

export const putZone = async (token, data) => {
  const url = `https://mds.dashboarddeelmobiliteit.nl/admin/zone`;
  const response = await fetch(url, Object.assign({}, getFetchOptions(token), {
    method: 'PUT',
    body: JSON.stringify(data)
  }));
  if (! didFetchSucceed(response)) return;
  return await response.json();
}

export const deleteZone = async (token, geography_id) => {
  const url = `https://mds.dashboarddeelmobiliteit.nl/admin/zone/${geography_id}`;
  const response = await fetch(url, Object.assign({}, getFetchOptions(token), {
    method: 'DELETE'
  }));
  if (! didFetchSucceed(response)) return;
  return response;
}
