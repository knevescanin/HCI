# Dynamic Routes/Data Fetching

## Overview

This assignment involves implementing dynamic routes and data fetching in our Next.js application. We created a simple application which displays a list of products by using the JSON Placeholder API. Our [database](../../db.json) is stored in a JSON file in the root folder. Fetched products are used for the template and will be replaced with real data in the future.

Our application does not yet have any need for dynamic routes, instead we used an extension of dynamic routes called catch-all segment. This allows us to create a single page that can handle multiple dynamic routes. It is implemented inside of [docs page](../../hci-course/src/app/(navbar)/docs) and is used with CMS to display our documentation.

Current version of search page is just a simple, non-functional template, we focused more on integrating CMS with our application so that we can keep track of our documentation.

One idea of implementing dynamic routes in the future is to create a product page for each product. This would allow us to display more detailed information about each product, but that idea is not set in stone because we are still trying to figure out the purpose of application.

We hope you enjoy our application! 😊
