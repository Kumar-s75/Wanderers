// src/store/slices/bookingSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Booking {
  id: string
  tourId: string
  userId: string
  startDate: string
  numGuests: number
  totalPrice: number
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
}

interface BookingState {
  bookings: Booking[]
  currentBooking: Booking | null
  loading: boolean
  error: string | null
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
}

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData: Partial<Booking>, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/bookings/user')
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false
        state.bookings.push(action.payload)
        state.currentBooking = action.payload
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch User Bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false
        state.bookings = action.payload
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setCurrentBooking, clearCurrentBooking } = bookingSlice.actions
export default bookingSlice.reducer