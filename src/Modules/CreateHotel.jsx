import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Container, Button, TextField, Grid, Chip } from "@mui/material";
import ApiService from "../Services/ApiService";

const apiService = new ApiService();
const FormContainer = styled("div")(({ theme }) => ({
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const CreateHotel = ({ user, signOut }) => {
  const [data, setData] = useState({
    name: "",
    rating: null,
    city: "",
    price: null,
    file: null,
    userId: "",
    idToken: null,
  });

  useEffect(() => {
    var idToken =
      user.storage[
        "CognitoIdentityServiceProvider.3vcb3kdshekipba1u1kq899f8i.9e257c07-5b4e-446a-97eb-99a6c1c43a71.idToken"
      ];
    setData({ ...data, userId: user.attributes.sub, idToken: idToken});
    //setData({ ...data, idToken: idToken });
  },[user]);

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    setData({ ...data, file: e.target.files[0] });
  };

  const onFieldChanged = (e, prop) => {
    setData({ ...data, [prop]: e.target.value });
  };

  const submitData = (e) => {
    var baseUrl = 'https://d7avzb6hlh.execute-api.us-east-2.amazonaws.com'
    apiService.Post(baseUrl, "Test/{admin+}", data);
    return data;
  };
  return (
    <Container maxWidth="md">
      <FormContainer>
        <form>
          <StyledTextField
            label="Name"
            variant="outlined"
            size="small"
            onChange={(e) => onFieldChanged(e, "name")}
            fullWidth
          />
          <StyledTextField
            label="Rating"
            variant="outlined"
            size="small"
            onChange={(e) => onFieldChanged(e, "rating")}
            fullWidth
          />
          <StyledTextField
            label="City"
            variant="outlined"
            size="small"
            onChange={(e) => onFieldChanged(e, "city")}
            fullWidth
          />
          <StyledTextField
            label="Price"
            variant="outlined"
            type="number"
            onChange={(e) => onFieldChanged(e, "price")}
            fullWidth
          />
          <Grid container rowSpacing={1}>
            <Grid item xs={6}>
              <Button variant="contained" component="label">
                Upload File
                <input type="file" onChange={handleFileUpload} hidden />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Chip label={data.file?.name ?? undefined} />
            </Grid>
          </Grid>
          <StyledButton
            onClick={submitData}
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </StyledButton>
          <StyledButton
            onClick={signOut}
            variant="contained"
            color="primary"
            //fullWidth
          >
            Sign out
          </StyledButton>
        </form>
      </FormContainer>
    </Container>
  );
};

export default CreateHotel;
