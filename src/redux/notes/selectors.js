export const selectNotes = (state) => state.notes.data
export const selectCount = (state) => state.notes.count
export const selectNotesLoading = (state) => state.notes.loading
export const selectPagNotes = (state) => state.notes.pagData
export const selectNotesError = (state) => state.notes?.errors