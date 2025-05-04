import React, { useState, useEffect } from "react";
import { getVehicleTypesbyWheel, getVehicleModels, createBooking } from "../api/api";
import { 
  Button, 
  TextField, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Grid,
  Alert
} from "@mui/material";

const steps = ['Personal Info', 'Vehicle Type', 'Vehicle Category', 'Model Selection', 'Booking Dates'];

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    typeId: "",
    modelId: "",
    startDate: "",
    endDate: "",
  });
  const [vehicleTypes, setVehicleTypes] = useState<any[]>([]);
  const [vehicleModels, setVehicleModels] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (step === 2 && form.wheels) {
      const wheelType = form.wheels === "2" ? "TWO_WHEELER" : "FOUR_WHEELER";
      getVehicleTypesbyWheel(wheelType).then(res => {
        setVehicleTypes(Array.isArray(res.data.payload) ? res.data.payload : []);
      });
    }
  }, [step, form.wheels]);

  useEffect(() => {
    if (step === 3 && form.typeId) {
      getVehicleModels(Number(form.typeId)).then(res => {
        setVehicleModels(Array.isArray(res.data.payload) ? res.data.payload : []);
      });
    }
  }, [step, form.typeId]);

  const handleNext = () => {
    if (step === 0 && (!form.firstName || !form.lastName)) {
      setError("Please enter your first and last name.");
      return;
    }
    if (step === 1 && !form.wheels) {
      setError("Please select number of wheels.");
      return;
    }
    if (step === 2 && !form.typeId) {
      setError("Please select a vehicle type.");
      return;
    }
    if (step === 3 && !form.modelId) {
      setError("Please select a model.");
      return;
    }
    if (step === 4 && (!form.startDate || !form.endDate)) {
      setError("Please select start and end dates.");
      return;
    }
    setError("");
    setStep(s => s + 1);
  };

  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    try {
      const startISO = new Date(form.startDate).toISOString();
      const endISO = new Date(form.endDate).toISOString();
      await createBooking({
        firstname: form.firstName,
        lastname: form.lastName,
        modelid: Number(form.modelId),
        starttime: startISO,
        endtime: endISO,
      });
      setSuccess(true);
      setError("");
    } catch (err) {
      setError("Booking failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Vehicle Booking
      </Typography>
      
      <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card>
        <CardContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Booking successful!</Alert>}

          {step === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  value={form.firstName}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  value={form.lastName}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
            </Grid>
          )}

          {step === 1 && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Select Number of Wheels
              </Typography>
              <RadioGroup 
                value={form.wheels} 
                onChange={e => setForm({ ...form, wheels: e.target.value })}
                sx={{ mt: 2 }}
              >
                <FormControlLabel 
                  value="2" 
                  control={<Radio />} 
                  label="2 Wheels" 
                />
                <FormControlLabel 
                  value="4" 
                  control={<Radio />} 
                  label="4 Wheels" 
                />
              </RadioGroup>
            </Box>
          )}

          {step === 2 && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Select Vehicle Type
              </Typography>
              <RadioGroup 
                value={form.typeId} 
                onChange={e => setForm({ ...form, typeId: e.target.value })}
                sx={{ mt: 2 }}
              >
                {vehicleTypes.map(t => (
                  <FormControlLabel 
                    key={t.id} 
                    value={String(t.id)} 
                    control={<Radio />} 
                    label={t.name} 
                  />
                ))}
              </RadioGroup>
            </Box>
          )}

          {step === 3 && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Select Vehicle Model
              </Typography>
              <RadioGroup 
                value={form.modelId} 
                onChange={e => setForm({ ...form, modelId: e.target.value })}
                sx={{ mt: 2 }}
              >
                {vehicleModels.map(m => (
                  <FormControlLabel 
                    key={m.id} 
                    value={String(m.id)} 
                    control={<Radio />} 
                    label={m.modelname} 
                  />
                ))}
              </RadioGroup>
            </Box>
          )}

          {step === 4 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="date"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  value={form.startDate}
                  onChange={e => setForm({ ...form, startDate: e.target.value })}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="date"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  value={form.endDate}
                  onChange={e => setForm({ ...form, endDate: e.target.value })}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
            </Grid>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="contained"
              onClick={handlePrev}
              disabled={step === 0}
            >
              Back
            </Button>
            {step < 4 ? (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit Booking
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
