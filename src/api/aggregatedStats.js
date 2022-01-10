import { createFilterparameters } from '../poll-api/pollTools.js';
import { DISPLAYMODE_OTHER } from '../reducers/layers.js';

export const getAggregatedStats = async (token, key, options) => {
  // Example URL: `https://api.deelfietsdashboard.nl/dashboard-api/aggregated_stats/${key}?start_time=${options.startTime}&end_time=${options.endTime}&operators=${options.operators}&zone_ids=${options.zoneIds}&aggregation_level=${options.aggregationLevel}`;
  let url = `https://api.deelfietsdashboard.nl/dashboard-api/aggregated_stats/${key}?aggregation_level=${options.aggregationLevel}`;

  let filterParams = createFilterparameters(DISPLAYMODE_OTHER, options.filter, options.metadata);
  if(filterParams.length>0) url += "&" + filterParams.join("&");
  console.log('url', url)

  let fetchOptions = {
    headers: {
      "authorization": `Bearer ${token}`
    }
  }
  
  const response = await fetch(url, fetchOptions);
  const responseJson = await response.json();

  return responseJson;
}


export const getAggregatedParkingDuration = async (token, key, options) => {
  // Example URL: `https://api.deelfietsdashboard.nl/dashboard-api/stats/available_bikes?start_time=2021-12-27T14:00:00Z&end_time=2022-01-10T14:00:00Z&operators=deelfietsnederland`;
  // let url = `https://api.deelfietsdashboard.nl/dashboard-api/aggregated_stats/${key}?aggregation_level=${options.aggregationLevel}`;

  // let filterParams = createFilterparameters(DISPLAYMODE_OTHER, options.filter, options.metadata);
  // if(filterParams.length>0) url += "&" + filterParams.join("&");
  // console.log('url', url)

  // let fetchOptions = {
  //   headers: {
  //     "authorization": `Bearer ${token}`
  //   }
  // }
  
  // const response = await fetch(url, fetchOptions);
  // const responseJson = await response.json();

  // return responseJson;
}

