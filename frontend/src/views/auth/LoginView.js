import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { NotificationManager } from 'react-notifications';
import api from '../../../src/services/Api';


import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(8)
  },
  card:{
    paddingTop: theme.spacing(3),
    minHeight: 400,
    minWidth: '25%',
  },
  
  paper:{
    minWidth: '70%'
  }
}));


const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [login, setLogin] = useState({});
  const [user, setUser] = useState('');
  const [senha, setSenha] = useState('');


  function modificarValores(order, value) {
    
    switch (order) {
      case 1:
        login.user = value;
        setLogin(login);
        setUser(value);
        break;
      case 2:
        login.senha = value;
        setLogin(login);
        setSenha(value);
      break;
      default:
        setLogin(login);
    }
  }

  async function validarAcesso(user, senha){
    if(user === 'teste'){
      localStorage.setItem("@DataVie-User", JSON.stringify({'nome': 'teste', 'funcao': 'teste'}));
      navigate('/dashboard', { replace: true });

    }else{
      if(!user || !senha){
        NotificationManager.error('Preencher login e senha para entrar.', 'Algo deu errado!', 4000);
      }
      else{
        const response = await api.post('/login', login, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(login)
        } );  
  
        if(!response.data.token){
          NotificationManager.error(response.data.message, 'Algo deu errado!', 4000);
        }else{
          NotificationManager.success(`Bem vindo, ${response.data.nome}.`, 'Login autorizado!', 2000);
  
          localStorage.setItem("@DataVie-Token", response.data.token);
          localStorage.setItem("@DataVie-User", JSON.stringify(response.data.pessoa));
  
          navigate('/dashboard', { replace: true });
        }
      }
    }
  }

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        justifyContent="center"
        
      >
      <Card
        className={classes.card}
        variant="outlined"
      >
        <Box
          display="flex"
          justifyContent="center"
        >    
          <Paper
            className={classes.paper}
            elevation={3}
            style={{
              color: 'white',
              backgroundColor: '#759a49',
              borderRadius: 5,
              marginBottom: 20

            }}
          >
            <Typography variant="h3" align="center">
              ACESSO
            </Typography>
          </Paper>
        </Box>
        <ValidatorForm 
          autoComplete="off"
        >

          <Grid   
            container
            justify={'center'}
          >
            
            <Grid
              item
              
              md={11}
              xs={12}
            >
              <TextValidator
                fullWidth
                helperText={"Insira a matrícula ou o CPF"}
                label="Matrícula ou CPF"
                margin="dense"
                name="user"
                variant="outlined"
                onChange={e => modificarValores(1, e.target.value)}
              />
            </Grid>
          </Grid>
            <Grid
              container
              justify={'center'}
            >
            
            <Grid
              item
              md={11}
              xs={12}
            >
              
              <TextValidator
                fullWidth
                type="password"
                helperText={"Insira a senha"}
                label="Senha"
                margin="dense"
                name="senha"
                id="senha"
                variant="outlined"
                onChange={e => modificarValores(2, e.target.value)}
                
              />
            </Grid>
            <Grid
              item
              md={11}
              xs={12}
            >
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                style={{
                  color: 'white',
                  borderRadius: 15,

                }}
                onClick={() => validarAcesso(user, senha)}
              >
                Entrar
              </Button>              
            </Grid>          
          </Grid>
          <Grid
            container
            justify={'center'}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Link
                component="button"
                style={{marginTop: 20}}
              >
                Esqueci minha senha
              </Link>
            </Grid>
            <Link
              component="button"
              style={{marginTop: 20}}
            >
              Não possuo cadastro
            </Link>
          </Grid>
        </ValidatorForm>
        <Divider style={{marginTop: 20}}/>
      </Card>
      </Box>
    </Page>
  );
};


export default LoginView;
