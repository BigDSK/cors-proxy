const request = require('request-promise');
const URL = require('url');

/**
 * Use this command to launch the handler from console:
 *
 * node_modules/.bin/serverless invoke local -f lambda -d '{"httpMethod":"GET","queryStringParameters":{"url":"http://github.com"}}'
 *
 *  or from browser
 *
 * http://localhost:3000/?url=https://github.com
 */
module.exports.corsProxy = async (event, context, callback) => {
  let params = event.queryStringParameters;

  console.log(event);
  console.log(`Got request with params:`, params);

  if (!params.url) {
    const errorResponse = {
      statusCode: 400,
      body: 'Unable get url from \'url\' query parameter',
    };

    callback(null, errorResponse);

    return;
  }

  const url = decodeURIComponent(params.url);

  const parsed = URL.parse(url);

  const headers = {
    'host': parsed.host,
  };

  console.log(`Proxying request to ${url} with headers ${JSON.stringify(headers)}`);

  try {
    const response = await request({
      url,
      method: event.httpMethod,
      timeout: 115000,
      headers,
      resolveWithFullResponse: true,
    });

    console.log(`Got response from ${params.url} ---> {statusCode: ${response.statusCode}}`);

    const proxyResponse = {
      statusCode: response.statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        "content-type": response.headers['content-type'],
      },
      body: response.body,
    };

    callback(null, proxyResponse);
  } catch (err) {
    console.log(`Got error`, err);

    callback(err);
  }
};
