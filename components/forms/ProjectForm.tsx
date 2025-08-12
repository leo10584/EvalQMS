"use client"

import { useFormik } from "formik"
import * as Yup from "yup"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
  Chip,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

interface ProjectFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: any) => void
}

const validationSchema = Yup.object({
  name: Yup.string().required("Project name is required").min(3, "Name must be at least 3 characters"),
  description: Yup.string().required("Description is required"),
  therapeuticArea: Yup.string().required("Therapeutic area is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required").min(Yup.ref("startDate"), "End date must be after start date"),
  priority: Yup.string().required("Priority is required"),
  teamMembers: Yup.array().min(1, "At least one team member is required"),
})

const therapeuticAreas = [
  "Oncology",
  "Cardiology",
  "Neurology",
  "Respiratory",
  "Infectious Diseases",
  "Endocrinology",
  "Gastroenterology",
]

const teamMemberOptions = [
  { id: "1", name: "Dr. Sarah Johnson", role: "Medical Writer" },
  { id: "2", name: "Dr. Michael Chen", role: "Clinical Reviewer" },
  { id: "3", name: "Jane Smith", role: "Quality Reviewer" },
  { id: "4", name: "Robert Brown", role: "Regulatory Specialist" },
]

export default function ProjectForm({ open, onClose, onSubmit }: ProjectFormProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      therapeuticArea: "",
      startDate: null,
      endDate: null,
      priority: "",
      teamMembers: [],
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values)
      formik.resetForm()
      onClose()
    },
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Project Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={formik.touched.therapeuticArea && Boolean(formik.errors.therapeuticArea)}>
                  <InputLabel>Therapeutic Area</InputLabel>
                  <Select
                    name="therapeuticArea"
                    value={formik.values.therapeuticArea}
                    onChange={formik.handleChange}
                    label="Therapeutic Area"
                  >
                    {therapeuticAreas.map((area) => (
                      <MenuItem key={area} value={area}>
                        {area}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.therapeuticArea && formik.errors.therapeuticArea && (
                    <FormHelperText>{formik.errors.therapeuticArea}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={formik.touched.priority && Boolean(formik.errors.priority)}>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    name="priority"
                    value={formik.values.priority}
                    onChange={formik.handleChange}
                    label="Priority"
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Critical">Critical</MenuItem>
                  </Select>
                  {formik.touched.priority && formik.errors.priority && (
                    <FormHelperText>{formik.errors.priority}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Start Date"
                  value={formik.values.startDate}
                  onChange={(value) => formik.setFieldValue("startDate", value)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: formik.touched.startDate && Boolean(formik.errors.startDate),
                      helperText: formik.touched.startDate && formik.errors.startDate,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="End Date"
                  value={formik.values.endDate}
                  onChange={(value) => formik.setFieldValue("endDate", value)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: formik.touched.endDate && Boolean(formik.errors.endDate),
                      helperText: formik.touched.endDate && formik.errors.endDate,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={teamMemberOptions}
                  getOptionLabel={(option) => `${option.name} (${option.role})`}
                  value={formik.values.teamMembers}
                  onChange={(event, value) => formik.setFieldValue("teamMembers", value)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant="outlined" label={option.name} {...getTagProps({ index })} key={option.id} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Team Members"
                      error={formik.touched.teamMembers && Boolean(formik.errors.teamMembers)}
                      helperText={formik.touched.teamMembers && formik.errors.teamMembers}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Create Project
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  )
}
