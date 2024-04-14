import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article"; // import articleApi from we created...

// create a store so we can use this article Api in our app
export const store = configureStore({
    // In the provided code, articleApi.reducer and articleApi.middleware are properties of the articleApi object...
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(articleApi.middleware)
})
// both articleApi.reducer and articleApi.middleware are properties of the articleApi object, 
// which is created using createApi. The reducer is responsible for managing API-related state in the Redux store, 
// while the middleware handles API request lifecycle and updates the store accordingly.
// It(middleware) handles actions dispatched by the generated query hooks (e.g., useLazyGetSummaryQuery) 
// and updates the Redux store accordingly based on the request status (loading, success, error).