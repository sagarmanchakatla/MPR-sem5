import { useState } from "react";
import dayjs from "dayjs";
import { Box, TextField, Typography, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Navbar from "../Component/Navbar";

const Schedule = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateValue, setDateValue] = useState(dayjs("2022-04-17"));
  const [timeValue, setTimeValue] = useState(dayjs());

  return (
    <>
      <Navbar />
      <Box
        sx={{
          p: 3,
          maxWidth: 500,
          mx: "auto",
          mt: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Schedule Meeting
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={dateValue}
            onChange={(newValue) => setDateValue(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth sx={{ mb: 2 }} />
            )}
          />
          <TimePicker
            label="Select Time"
            value={timeValue}
            onChange={(newValue) => setTimeValue(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth sx={{ mb: 2 }} />
            )}
          />
        </LocalizationProvider>
        <Button variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default Schedule;
