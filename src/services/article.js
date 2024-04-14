import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define your RapidAPI key directly
const rapidApiKey = '9a022c2a1cmshc0a05106177166cp1b4960jsn05e61865a873';

// Log the API key to ensure it's correctly assigned
console.log(rapidApiKey);

// Create the articleApi using createApi function
export const articleApi = createApi({
    // this is create a API client named articleApi using createApi function of redux tool kit
    reducerPath: "articleApi", // This specifies the name under which the API slice's reducer will be mounted in the Redux store.
    baseQuery: fetchBaseQuery({
        //  It defines the base URL and prepares headers, including setting the RapidAPI key.
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers, { getState }) => {
            // prepareHeaders and Api key
            headers.set('X-RapidAPI-Key', rapidApiKey); // Use the assigned API key
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
            return headers; // and return headers to the user
        }
    }),
    
// In this below provided code, endpoints is a function that takes a builder parameter.
    endpoints: (builder) => ({
        getSummary: builder.query({
            // The query property of a builder parametre is a function that defines the query to be executed when this endpoint is called.
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=5` // length=3..it suggests the length of the summary
            // params.articleUrl is a url of the article for which summary is requested..so this url is appended to the endpoint URL as a query parameter using URL encoding (encodeURIComponent(params.articleUrl)).
            // as we can see in the documentation of rapid api that we should pass length and url => which we want to summarize that should
            // pass as a query
        })
    })
});

// Export useLazyGetSummaryQuery hook for using in components
export const { useLazyGetSummaryQuery } = articleApi; //  we can put whatever name we would like..

