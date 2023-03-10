import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const serverApi = createApi({
    reducerPath: "serverApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001"}),
    endpoints: (builder) => ({
        getData: builder.mutation({
            query: (data) => ({
                url: data?.item ? `?search=${data.item}` : "/",
            }),
        }),
        setData: builder.mutation({
            query: (data) => ({
                url: "/",
                method: "POST",
                body: data.body,
            }),
        }),
        getExternalData: builder.mutation({
            query: () => ({
                url: "/jsonplaceholder-data",
            }),
        }),
    }),
});

export const {
    useGetDataMutation,
    useSetDataMutation,
    useGetExternalDataMutation,
} = serverApi;
