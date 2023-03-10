import { configureStore } from '@reduxjs/toolkit';

import { serverApi } from './services/api.service';

export const store = configureStore({ reducer: {
    [serverApi.reducerPath]: serverApi.reducer
} })