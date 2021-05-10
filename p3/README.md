

# Project 3

By: Noah Peart
Production URL: <http://e28p3.nverno.me>


# Outside Resources

-   Xpath is run via [xpath](https://preview.npmjs.com/package/xpath) (some basic examples can be found there).
-   Fontawesome icons


# Notes for instructor

-   CORS requests are forwarded from simple proxy at
    <https://e28-proxy.herokuapp.com/> ([source](https://github.com/nverno/e28-proxy)).  \*On first request it may take a

little longer while the proxy starts up.\*


# How is authentication being used in your application?

Each user only has access to lists they created, and user's must be logged in to
create lists.  This is enforced by resource permission levels and Vue router
guards.  Only lists created by a given user are stored by Vuex during an
authenticated session.


# What data entities of your application are being managed via Vuex?

All data associated with lists and users is managed by Vuex ('@/common/store.js').


# E2E Testing screenshot

[P3 - Xpath Todos, passing E2E tests](https://raw.githubusercontent.com/nverno/e28/main/p3/tests/e2e-tests.png)

