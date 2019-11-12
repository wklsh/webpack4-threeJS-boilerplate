# Webpack 4 ThreeJS Boilerplate

HTML boilerplate forked from [webpack4-html-static](https://github.com/wklsh/webpack4-html-static).

## Start DEV environment

```javascript
npm run start
```

## Build Production Version

```javascript
npm run build
```

## Deploy Staging Build to S3
```javascript
npm run deploy-staging
```

## Deploy Production Build to S3
```javascript
npm run deploy-production
```

## Project Structure

`src` - Where the working files are

`build` - Contains production & deployment build assets, gets cleaned up on every build/deploy command **do not edit the files here**

## Webpack config structure

`webpack.common.js` - Contains all core essential configurations that are needed in both **dev** and **prod** environments

`webpack.dev.js` - Merges with `webpack.common.js`, contains **dev** environment configuration

`webpack.prod.js` - Merges with `webpack.common.js`, contains **production** environment configuration

`webpack.deploy.js` - Merges with `webpack.prod.js`, contains only **deployment**(both staging & production) configuration
