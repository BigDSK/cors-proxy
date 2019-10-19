# CORS proxy

Simple AWS Lambda based proxy server for making CORS requests from browser to any HTTP server.

### Run locally

#### 1. Install
```
npm install
```
#### 2. Run
```
sls invoke local -f cors-proxy
```
#### 3. Use
Open your browser and go to `http://localhost:3000/?url=<origin page>`. For example:
```
http://localhost:3000/?url=https://github.com/
```

### Install on AWS

```
DOMAIN_NAME=cors-proxy.goziohealth.com serverless deploy --stage prod
```

#### Use
Open your browser and use `endpoint` field from previous console response as base address. For example:
```
https://cors-proxy.goziohealth.com/prod/?url=https://github.com/
```
