import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const serverApi = createApi({
    reducerPath: "serverApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001"}),
    endpoints: builder => ({
        getFilteredProducts: builder.mutation({
          query: post => ({
            url: `/`,
            method: 'GET'
          })
        })
      })
});

export const { useGetFilteredProductsMutation } = serverApi;