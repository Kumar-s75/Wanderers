// src/store/slices/tourSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { prisma } from '@/lib/prisma'

interface Tour {
  id: string
  title: string
  description: string
  price: number
  duration: number
  location: string
  images: { url: string }[]
}

interface TourState {
  tours: Tour[]
  selectedTour: Tour | null
  loading: boolean
  error: string | null
}

const initialState: TourState = {
  tours: [],
  selectedTour: null,
  loading: false,
  error: null,
}

// Async thunks
export const fetchTours = createAsyncThunk(
  'tours/fetchTours',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/tours')
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchTourById = createAsyncThunk(
  'tours/fetchTourById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/tours/${id}`)
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const tourSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    setSelectedTour: (state, action) => {
      state.selectedTour = action.payload
    },
    clearSelectedTour: (state) => {
      state.selectedTour = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tours
      .addCase(fetchTours.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.loading = false
        state.tours = action.payload
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch Tour by ID
      .addCase(fetchTourById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTourById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedTour = action.payload
      })
      .addCase(fetchTourById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setSelectedTour, clearSelectedTour } = tourSlice.actions
export default tourSlice.reducer