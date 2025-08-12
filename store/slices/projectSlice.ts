import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Project {
  id: string
  name: string
  description: string
  status: "Initiation" | "Writing" | "Review" | "Approved" | "Completed"
  startDate: string
  endDate: string
  qualityScore: number
  teamMembers: string[]
}

interface ProjectState {
  projects: Project[]
  currentProject: Project | null
  loading: boolean
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
}

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload)
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.projects[index] = action.payload
      }
    },
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setProjects, addProject, updateProject, setCurrentProject, setLoading } = projectSlice.actions
export default projectSlice.reducer
