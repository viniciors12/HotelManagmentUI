import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Container, Button, TextField, Grid, Chip } from "@mui/material";
import ApiService from "../Services/ApiService";

const apiService = new ApiService();
const MainPage = ({ user, signOut }) => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    var baseUrl = "https://odcyulxy37.execute-api.us-east-2.amazonaws.com";
    var response = await apiService.Get(
      baseUrl,
      "Test/{listadminhotels+}",
      data
    );
    response
      .then((data) => {
        setData(data);
      })
      .catch((error) => Console.log(error));
  });

  return (
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
  );
};

export default MainPage;
