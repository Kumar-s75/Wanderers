// src/store/slices/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  isModalOpen: boolean
  modalType: string | null
  toast: {
    message: string
    type: 'success' | 'error' | 'info'
    isVisible: boolean
  }
  sidebarOpen: boolean
}

const initialState: UiState = {
  isModalOpen: false,
  modalType: null,
  toast: {
    message: '',
    type: 'info',
    isVisible: false,
  },
  sidebarOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.isModalOpen = true
      state.modalType = action.payload
    },
    closeModal: (state) => {
      state.isModalOpen = false
      state.modalType = null
    },
    showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) => {
      state.toast = {
        ...action.payload,
        isVisible: true,
      }
    },
    hideToast: (state) => {
      state.toast.isVisible = false
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

export const {
  openModal,
  closeModal,
  showToast,
  hideToast,
  toggleSidebar,
} = uiSlice.actions

export default uiSlice.reducer