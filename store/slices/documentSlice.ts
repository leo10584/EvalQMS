import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Document {
  id: string
  projectId: string
  title: string
  content: string
  version: number
  status: "Draft" | "Review" | "Approved"
  lastModified: string
}

interface DocumentState {
  documents: Document[]
  currentDocument: Document | null
  loading: boolean
}

const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
  loading: false,
}

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload
    },
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload)
    },
    updateDocument: (state, action: PayloadAction<Document>) => {
      const index = state.documents.findIndex((d) => d.id === action.payload.id)
      if (index !== -1) {
        state.documents[index] = action.payload
      }
    },
    setCurrentDocument: (state, action: PayloadAction<Document | null>) => {
      state.currentDocument = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setDocuments, addDocument, updateDocument, setCurrentDocument, setLoading } = documentSlice.actions
export default documentSlice.reducer
