/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';

const SignInContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const SignInPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const SignInIcon = styled(LockOutlinedIcon)(({ theme }) => ({
  fontSize: 60,
  marginBottom: theme.spacing(2),
}));

const SignInForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const SignInButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your authentication logic here
    // For this example, let's just print the email and password
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <SignInContainer component="main" maxWidth="xs">
      <SignInPaper elevation={3}>
       
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SignInForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <SignInButton
          style={{color:'white'}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </SignInButton>
        </SignInForm>
      </SignInPaper>
    </SignInContainer>
  );
};

export default SignIn;
