import React, { useState, useEffect } from "react";
import { Container, Button, Grid, Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ApiService from "../Services/ApiService";
import MainPage from "./MainPage";
import {
  StyledTextField,
  StyledButton,
  FormContainer,
} from "../Components/StyledComponents";

const apiService = new ApiService();

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
  const [back, setBack] = useState(null);

  useEffect(() => {
    var idToken =
      user.storage[
        "CognitoIdentityServiceProvider.3vcb3kdshekipba1u1kq899f8i.9e257c07-5b4e-446a-97eb-99a6c1c43a71.idToken"
      ];
    setData({ ...data, userId: user.attributes.sub, idToken: idToken });
    //setData({ ...data, idToken: idToken });
  }, [user]);

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
    var baseUrl = "https://d7avzb6hlh.execute-api.us-east-2.amazonaws.com";
    apiService.Post(baseUrl, "Test/{admin+}", data);
    return data;
  };

  const handleBackButton = () =>{
    setBack(<MainPage user={user} signOut={signOut}/>)
  }

  const CreateHotelComponent = () => 
  {
    return (
      <Grid>
        <Grid marginLeft={3} maxWidth='20%'>
          <StyledButton
            startIcon={<ArrowBackIcon />}
            onClick={handleBackButton}
            variant="contained"
            color="primary"
            fullWidth
          >
            Back
          </StyledButton>
        </Grid>
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
            </form>
          </FormContainer>
        </Container>
      </Grid>
    );
  }

  return (
    !back ? CreateHotelComponent() : back
  );
};

export default CreateHotel;
