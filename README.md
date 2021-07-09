# ks-redirect

A simple project that fires the facebook tracking pixel and then redirects to Kickstarter.

This is meant to be a minimal project that only usese `@hapi/hapi` and `dotenv`

Be sure to configure the following environment variables.

- `PROJECT_URL`: Your KS URL, be sure to include trailing `/` Example: `https://www.kickstarter.com/projects/MY-KS-USERNAME/MY-COOL-PROJECT/`
- `SERVER_PORT`: Port number the server should run on. Example: `8080`
- `REDIRECT_TIME`: Number of seconds the redirect page should appear for. Example: `3`
- `FB_PIXEL_ID`: Pixel ID.  Example: `32432458364877589`
