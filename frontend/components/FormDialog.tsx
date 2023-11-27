import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// props = { mode, open, onOpen, initialData }
interface Props {
  mode: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAction: (data: any) => void;
  initialData?: any;
}

export default function FormDialog(props: Props) {
  const { mode, open, onOpen, initialData, onClose, onAction } = props;

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    author: "",
    publicationYear: "",
    ISBN: "",
    ...initialData, // Set initial data if provided
  });

  const handleInputChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [id]: value }));
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      author: "",
      publicationYear: "",
      ISBN: "",
    });
    onClose();
  };

  const handleAction = () => {
    // You can perform further actions here, such as sending the form data to the server
    console.log(`${mode} data submitted:`, formData);
    onAction(formData);
    handleClose();
  };

  React.useEffect(() => {
    // Reset form data when the mode changes
    setFormData({
      title: "",
      description: "",
      author: "",
      publicationYear: "",
      ISBN: "",
      ...initialData, // Set initial data if provided
    });
  }, [mode, initialData]);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {mode === "create" ? "Crear" : "Editar"} Libro
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para {mode === "create" ? "crear" : "editar"} un libro, ingrese los
            datos a continuación
          </DialogContentText>
          <TextField
            margin="dense"
            id="title"
            label="Titulo"
            type="text"
            fullWidth
            variant="standard"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Descripción"
            type="text"
            fullWidth
            variant="standard"
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="author"
            label="Autor"
            type="text"
            fullWidth
            variant="standard"
            value={formData.author}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="publicationYear"
            label="Año de publicación"
            type="number"
            fullWidth
            variant="standard"
            value={formData.publicationYear}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="ISBN"
            label="ISBN"
            type="text"
            fullWidth
            variant="standard"
            value={formData.ISBN}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAction}>
            {mode === "create" ? "Crear" : "Guardar cambios"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
