import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface QualityGate {
  id: string
  stage: "Initial" | "Manuscript" | "Final"
  status: "Not Started" | "In Progress" | "Completed" | "Failed"
  score: number
  completedItems: number
  totalItems: number
}

interface QualityIssue {
  id: string
  projectId: string
  description: string
  severity: "Critical" | "Major" | "Minor"
  status: "Open" | "Resolved"
  createdAt: string
}

interface QualityState {
  gates: QualityGate[]
  issues: QualityIssue[]
  loading: boolean
}

const initialState: QualityState = {
  gates: [],
  issues: [],
  loading: false,
}

const qualitySlice = createSlice({
  name: "quality",
  initialState,
  reducers: {
    setGates: (state, action: PayloadAction<QualityGate[]>) => {
      state.gates = action.payload
    },
    updateGate: (state, action: PayloadAction<QualityGate>) => {
      const index = state.gates.findIndex((g) => g.id === action.payload.id)
      if (index !== -1) {
        state.gates[index] = action.payload
      }
    },
    setIssues: (state, action: PayloadAction<QualityIssue[]>) => {
      state.issues = action.payload
    },
    addIssue: (state, action: PayloadAction<QualityIssue>) => {
      state.issues.push(action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setGates, updateGate, setIssues, addIssue, setLoading } = qualitySlice.actions
export default qualitySlice.reducer
