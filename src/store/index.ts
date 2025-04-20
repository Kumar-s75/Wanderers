// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import tourReducer from './slices/tourSlice'
import bookingReducer from './slices/bookingSlice'
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    tours: tourReducer,
    bookings: bookingReducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch