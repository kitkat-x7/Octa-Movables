import React, { useState, useEffect } from "react";
import { getVehicleTypesbyWheel, getVehicleModels, createBooking } from "../api/api";
import { Button, TextField, Radio, RadioGroup, FormControlLabel, Typography } from "@mui/material";

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

  // Fetch vehicle types based on wheel selection
  useEffect(() => {
    if (step === 2 && form.wheels) {
      const wheelType = form.wheels === "2" ? "TWO_WHEELER" : "FOUR_WHEELER";
      getVehicleTypesbyWheel(wheelType).then(res => {
        setVehicleTypes(Array.isArray(res.data.payload) ? res.data.payload : []);
      });
    }
  }, [step, form.wheels]);

  // Fetch vehicle models based on type selection
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
      await createBooking({
        firstname: form.firstName,
        lastname: form.lastName,
        modelid: Number(form.modelId),
        startdate: form.startDate,
        enddate: form.endDate,
      });
      alert("Booking successful!");
    } catch (e) {
      setError("Booking failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <Typography variant="h5">Book a Vehicle</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {step === 0 && (
        <div>
          <TextField label="First Name" value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })} fullWidth margin="normal" />
          <TextField label="Last Name" value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })} fullWidth margin="normal" />
        </div>
      )}
      {step === 1 && (
        <RadioGroup value={form.wheels} onChange={e => setForm({ ...form, wheels: e.target.value })}>
          <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
          <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
        </RadioGroup>
      )}
      {step === 2 && (
        <RadioGroup value={form.typeId} onChange={e => setForm({ ...form, typeId: e.target.value })}>
          {vehicleTypes.map(t => (
            <FormControlLabel key={t.id} value={String(t.id)} control={<Radio />} label={t.name} />
          ))}
        </RadioGroup>
      )}
      {step === 3 && (
        <RadioGroup value={form.modelId} onChange={e => setForm({ ...form, modelId: e.target.value })}>
          {vehicleModels.map(m => (
            <FormControlLabel key={m.id} value={String(m.id)} control={<Radio />} label={m.modelname} />
          ))}
        </RadioGroup>
      )}
      {step === 4 && (
        <div>
          <TextField type="date" label="Start Date" InputLabelProps={{ shrink: true }}
            value={form.startDate}
            onChange={e => setForm({ ...form, startDate: e.target.value })} fullWidth margin="normal" />
          <TextField type="date" label="End Date" InputLabelProps={{ shrink: true }}
            value={form.endDate}
            onChange={e => setForm({ ...form, endDate: e.target.value })} fullWidth margin="normal" />
        </div>
      )}
      <div style={{ marginTop: 16 }}>
        {step > 0 && <Button onClick={handlePrev}>Back</Button>}
        {step < 4 && <Button onClick={handleNext}>Next</Button>}
        {step === 4 && <Button onClick={handleSubmit}>Submit</Button>}
      </div>
    </div>
  );
}
