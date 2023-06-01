import React, { useState, useEffect, useMemo } from "react";
import { Grid, Paper } from "@mui/material";
import ApiService from "../Services/ApiService";
import { StyledButton } from "../Components/StyledComponents";
import CreateHotel from "./CreateHotel";

const apiService = new ApiService();
const MainPage = ({ user, signOut }) => {
  const [data, setData] = useState([]);
  const [createHotel, setCreateHotel] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      var idToken =
        user.storage[
          "CognitoIdentityServiceProvider.3vcb3kdshekipba1u1kq899f8i.9e257c07-5b4e-446a-97eb-99a6c1c43a71.idToken"
        ];
      var baseUrl = "https://odcyulxy37.execute-api.us-east-2.amazonaws.com";
      return await apiService.Get(baseUrl, "Test/{listadminhotels+}", idToken);
    };

    fetchHotels()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleClick = () => {
    setCreateHotel(<CreateHotel user={user} />);
  };

  return !createHotel ? (
    <Grid margin={3}>
      <StyledButton
        onClick={handleClick}
        variant="contained"
        color="primary"
        //fullWidth
      >
        Create Hotel
      </StyledButton>

      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper>
              <Column>
                <Typography variant="subtitle1">Name</Typography>
                <Typography variant="body1">{item.name}</Typography>
              </Column>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid marginTop={1}>
        <StyledButton
          onClick={signOut}
          variant="contained"
          color="primary"
          //fullWidth
        >
          Sign Out
        </StyledButton>
      </Grid>
    </Grid>
  ) : (
    <CreateHotel user={user} signOut={signOut} />
  );
};

export default MainPage;
