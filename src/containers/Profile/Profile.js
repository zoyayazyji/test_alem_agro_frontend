import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProfile } from "../../store/actions/profileActions";
import { Typography, Grid } from "@mui/material";
import Loader from "../../components/UI/Loader/Loader";

const Profile = () => {

  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.profile);

  useState(async () => {
    await dispatch(fetchGetProfile())
  }, []);

  const dob = new Date(profile?.dob?.date).toDateString();
  const date = new Date(profile?.registered?.date).toDateString();

  return <>
    <Loader loading={loading} />
    <Grid>
      <Typography component={'h4'}>
        {profile?.name?.title} {profile?.name?.first} {profile?.name?.last}
      </Typography>
      <Typography component={'h4'}>
        {profile?.dob?.age} years old
      </Typography>
      <Typography component={'h4'}>
        Date of Birthday : {dob} ({profile?.gender})
      </Typography>
      <Typography component={'h4'}>
        Country: {profile?.location?.country}, State: {profile?.location?.state}
      </Typography>
      <Typography>
        City : {profile?.location?.city}
      </Typography>
      <Typography>
        Street: {profile?.location?.street?.name} - {profile?.location?.street?.number}
      </Typography>
      <Typography>
        Nationality : {profile?.nat}
      </Typography>
      <Typography>
        Phone : {profile?.phone}
      </Typography>
      <Typography>
        Login : {profile?.login?.username}
      </Typography>
      <Typography>
        Here since : {date} for {profile?.registered?.age} years!
      </Typography>
      <img
        src={`${profile?.picture?.medium}?w=164&h=164&fit=crop&auto=format`}
        alt="avatar"
      />
    </Grid>
  </>;
};

export default Profile;