# Deploying Static Website

My goal was to deploy the application as a static website to a custom subdomain. I
own the `segarciat.com` domain, and I wanted the application to be reached at
`memory-cards.segarciat.com`. This document describes the steps I took.

## Build App

First, I built the app with:

```bash
npm run build
```

The result was a `dist` directory containing the build output. To test the production
build with a local static web server, I ran;

```bash
npm run preview
```

I removed `dist` from `.gitignore`, tracked it with `git add`, and pushed to my repository.

## Enabling GitHub Pages

To host the application using GitHub Pages, I navigated to `Settings -> Pages`. In the
`Build and deployment` section, I set `Source` to `GitHub Pages`. I then selected
the suggested workflow named `Static HTML`. This created a file at `.github/workflows/static.yml`
configuring the sample workflow. I modified the `path` key of the `Upload artifact` job to have
a value of `./dist`, which is the path to the build assets in the repository. Finally, I clicked
`Commit` and waited for the site to deploy.

## Configuring a Custom Subdomain

To enable a custom subdomain, I navigated to my hosting provider's DNS management panel.
I created a `CNAME` record with `Host` set to `memory-cards`, and `Value` set to
`segarciat.github.io`. Then, back in the repository page, I navigated to `Settings -> Pages`.
In the `Custom Domain` section, I entered `memory-cards.segarciat.com` and clicked `Save`.
This initiated the DNS check. Initially the website was available under
`http://memory-cards.segarciat.com`. I had to allow up to 24 hours for the TLS certificate
to provisioned so that I could leveraged `https`. After the provisioning was done,
I also selected the `Enforce HTTPS` checkbox.

## References

- [Vue - Production Deployment: With Build Tools](https://vuejs.org/guide/best-practices/production-deployment.html#with-build-tools)
- [Vite - Deploying a Static Site](https://vite.dev/guide/static-deploy.html)
- [Github Pages - Configuring a subdomain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain)
- [Namecheap - Creating a CNAME Record](https://www.namecheap.com/support/knowledgebase/article.aspx/9646/2237/how-to-create-a-cname-record-for-your-domain/)