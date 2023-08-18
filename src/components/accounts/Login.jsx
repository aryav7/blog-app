import React, { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api";
import {DataContext} from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  background-color: #fb6418;
  height: 45px;
`;
const SignupButton = styled(Button)`
  color: #fb6418;
  text-transform: none;
  font-weight: 500;
  height: 45px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/30%);
`;

const Error = styled(Typography)`
  font-size : 10px;
  color : #ff6161;
  line-height : 0;
  margin-top: 10px;
  font-weight : 600;
`

const Or = styled(Typography)`
  color: #878787;
  font-size: 16px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: '',
  password: ''
};
const signupInitialValues = {
  name: '',
  username: '',
  password: ''
};

const Login = ({isUserAuthenticated}) => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [error,setError] = useState('');
  const [login,setLogin] = useState(loginInitialValues);

  const {setAccount} = useContext(DataContext)
  const navigate = useNavigate();

  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if(response.isSuccess){
      setError('')
      setSignup(signupInitialValues)
      toggleAccount('login')
    }
    else{
      setError('Something went wrong!Please try again later')
    }
  };
  const onValueChange = (e) =>{
    setLogin({...login,[e.target.name]: e.target.value})
  }

  const loginUser = async()=>{
    let response = await API.userLogin(login)
    if(response.isSuccess){
      setError('')
      sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`)
      sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`)
      
      setAccount({username: response.data.username,name:response.data.name})

      isUserAuthenticated(true);

      navigate('/')
    }
    else{
      setError('Something went wrong!Please try again later')
    }
  }
  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />
        {account === "login" ? (
          <Wrapper>
            <TextField value={login.username} label="Username" name="username" onChange={(e)=> onValueChange(e)} variant="standard" />
            <TextField value={login.password} label="Password" name="password" onChange={(e)=> onValueChange(e)} variant="standard" />

            {error && <Error>{error}</Error> }

            <LoginButton onClick={()=> loginUser()} variant="contained">Login</LoginButton>
            <Or style={{ textAlign: "center" }}>OR</Or>
            <SignupButton variant="text" onClick={() => toggleSignup()}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              onChange={(e) => onInputChange(e)}
              id="standard-basic"
              name="name"
              label="Enter Name"
              variant="standard"
            />
            <TextField
              onChange={(e) => onInputChange(e)}
              id="standard-basic"
              name="username"
              label="Enter Username"
              variant="standard"
            />
            <TextField
              onChange={(e) => onInputChange(e)}
              id="standard-basic"
              name="password"
              label="Enter Password"
              variant="standard"
            />

            {error && <Error>{error}</Error> }
            <SignupButton onClick={() => signupUser()}>
              Signup
            </SignupButton>
            <Or style={{ textAlign: "center" }}>OR</Or>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
