import { createSlice, configureStore } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    openModalCreate: false,
    openModalEdit: false,
    openModalDelete: false,
  },
  reducers: {
    setOpenModalCreate: (state, action) => {
      state.openModalCreate = action.payload
    },
    setOpenModalEdit: (state, action) => {
      state.openModalEdit = action.payload
    },
    setOpenModalDelete: (state, action) => {
      state.openModalDelete = action.payload
    },
  }
})

export const { setOpenModalCreate, setOpenModalEdit, setOpenModalDelete } = modalSlice.actions

const store = configureStore({
  reducer: modalSlice.reducer
})

store.subscribe(() => console.log(store.getState()));

export default store