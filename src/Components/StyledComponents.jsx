import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FormContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4),
    marginTop: theme.spacing(10),
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
  }));
  
  export const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
  }));
  
  export const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
  }));