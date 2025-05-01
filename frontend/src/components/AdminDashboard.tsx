import React, { useEffect, useState } from "react";
import {
  getVehicleTypes,
  createVehicleType,
  updateVehicleType,
  deleteVehicleType,
  getVehicleModelsByType,
  createVehicleModel,
  updateVehicleModel,
  deleteVehicleModel,
} from "../api/api";
import {
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";

export default function AdminDashboard() {
  // Vehicle Types
  const [types, setTypes] = useState<any[]>([]);
  const [newType, setNewType] = useState({ wheel: "", name: "" });
  const [editType, setEditType] = useState<any>(null);

  // Vehicle Models
  const [models, setModels] = useState<any[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [newModel, setNewModel] = useState({ modelname: "" });
  const [editModel, setEditModel] = useState<any>(null);

  // Fetch types on mount and after CRUD
  const refreshTypes = () => getVehicleTypes().then(res => setTypes(res.data.payload || []));
  useEffect(() => { refreshTypes(); }, []);

  // Fetch models when a type is selected
  const refreshModels = (typeId: number) =>
    getVehicleModelsByType(typeId).then(res => setModels(res.data.payload || []));
  useEffect(() => {
    if (selectedTypeId) refreshModels(selectedTypeId);
    else setModels([]);
  }, [selectedTypeId]);

  // CRUD for Vehicle Types
  const handleAddType = async () => {
    await createVehicleType(newType);
    setNewType({ wheel: "", name: "" });
    refreshTypes();
  };
  const handleUpdateType = async () => {
    await updateVehicleType(editType.id, editType);
    setEditType(null);
    refreshTypes();
  };
  const handleDeleteType = async (id: number) => {
    await deleteVehicleType(id);
    refreshTypes();
  };

  // CRUD for Vehicle Models
  const handleAddModel = async () => {
    await createVehicleModel({ modelname: newModel.modelname, vehicletypeid: selectedTypeId! });
    setNewModel({ modelname: "" });
    refreshModels(selectedTypeId!);
  };
  const handleUpdateModel = async () => {
    await updateVehicleModel(editModel.id, { modelname: editModel.modelname, vehicletypeid: selectedTypeId! });
    setEditModel(null);
    refreshModels(selectedTypeId!);
  };
  const handleDeleteModel = async (id: number) => {
    await deleteVehicleModel(id);
    refreshModels(selectedTypeId!);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Admin Dashboard</Typography>

      {/* Vehicle Type CRUD */}
      <section>
        <Typography variant="h6" sx={{ mt: 3 }}>Vehicle Types</Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Select
            value={newType.wheel}
            onChange={e => setNewType(t => ({ ...t, wheel: e.target.value }))}
            displayEmpty
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">Wheel Type</MenuItem>
            <MenuItem value="TWO_WHEELER">2 Wheeler</MenuItem>
            <MenuItem value="FOUR_WHEELER">4 Wheeler</MenuItem>
          </Select>
          <TextField
            size="small"
            label="Type Name"
            value={newType.name}
            onChange={e => setNewType(t => ({ ...t, name: e.target.value }))}
          />
          <Button onClick={handleAddType} variant="contained">Add</Button>
        </Box>
        <ul>
          {types.map(type => (
            <li key={type.id}>
              {type.name} ({type.wheel}){" "}
              <Button size="small" onClick={() => setEditType(type)}>Edit</Button>
              <Button size="small" color="error" onClick={() => handleDeleteType(type.id)}>Delete</Button>
              <Button size="small" onClick={() => setSelectedTypeId(type.id)}>Models</Button>
            </li>
          ))}
        </ul>
      </section>

      {/* Edit Type Dialog */}
      <Dialog open={!!editType} onClose={() => setEditType(null)}>
        <DialogTitle>Edit Vehicle Type</DialogTitle>
        <DialogContent>
          <Select
            value={editType?.wheel || ""}
            onChange={e => setEditType((t: any) => ({ ...t, wheel: e.target.value }))}
            displayEmpty
            size="small"
            sx={{ minWidth: 120, mt: 1, mb: 1 }}
          >
            <MenuItem value="">Wheel Type</MenuItem>
            <MenuItem value="TWO_WHEELER">2 Wheeler</MenuItem>
            <MenuItem value="FOUR_WHEELER">4 Wheeler</MenuItem>
          </Select>
          <TextField
            size="small"
            label="Type Name"
            value={editType?.name || ""}
            onChange={e => setEditType((t: any) => ({ ...t, name: e.target.value }))}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateType}>Save</Button>
          <Button onClick={() => setEditType(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Vehicle Model CRUD */}
      {selectedTypeId && (
        <section>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Models for Type ID {selectedTypeId}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              size="small"
              label="Model Name"
              value={newModel.modelname}
              onChange={e => setNewModel(m => ({ ...m, modelname: e.target.value }))}
            />
            <Button onClick={handleAddModel} variant="contained">Add Model</Button>
          </Box>
          <ul>
            {models.map(model => (
              <li key={model.id}>
                {model.modelname}{" "}
                <Button size="small" onClick={() => setEditModel(model)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDeleteModel(model.id)}>Delete</Button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Edit Model Dialog */}
      <Dialog open={!!editModel} onClose={() => setEditModel(null)}>
        <DialogTitle>Edit Vehicle Model</DialogTitle>
        <DialogContent>
          <TextField
            size="small"
            label="Model Name"
            value={editModel?.modelname || ""}
            onChange={e => setEditModel((m: any) => ({ ...m, modelname: e.target.value }))}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateModel}>Save</Button>
          <Button onClick={() => setEditModel(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
