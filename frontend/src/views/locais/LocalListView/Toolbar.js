import React  from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Paper,
  Typography,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { NotificationManager } from 'react-notifications';

import SearchIcon from '@material-ui/icons/Search';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import api from '../../../services/Api';
const TOKEN = localStorage.getItem("@DataVie-Token");

const useStyles = makeStyles((theme) => ({
  root: {},
  paper:{
    minWidth: '25%',
  },
  icon:{
    marginRight: 5
  }
}));

const Toolbar = ( props ) => {
  const { 
    className, 
    ...rest } = props;
  const classes = useStyles();
  const navigate = useNavigate();



  async function existemTipos() {
    try{
      const response = await api.get('/tipolocal', { 'headers': { 'token': TOKEN } });  
      if(response.data.length > 0){
        navigate('/locais-register', { replace: true })
      }
      else{
        NotificationManager.error('Favor cadastrar um tipo de local.', 'Algo deu errado!', 4000)
      } 
    }
    catch (e) {  
        NotificationManager.error('Erro interno!', 'Algo deu errado!', 4000)
    }
  }


  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >


      <Box
        display="flex"
        justifyContent="flex-start"
       
      >    
        <Paper
          className={classes.paper}
          elevation={3}
          style={{
            color: 'white',
            backgroundColor: '#759a49',
            borderRadius: 5
          }}
        >
          <Typography variant="h3" align="center">
            LOCAL
          </Typography>
        </Paper>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          color="secondary"
          variant="contained"
          onClick={existemTipos}
          style={{
            marginRight: '10px',
            color: 'white',
            borderRadius: 15
          }}
        >
          <SvgIcon
            className={classes.icon}
            fontSize="small"
            color="inherit"
          >
            <ControlPointIcon />
          </SvgIcon>
          Cadastrar Local
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={(() => {navigate('/tipolocal', { replace: true })})}
          style={{
            color: 'white',
            borderRadius: 15
          }}
        >
          <SvgIcon
            className={classes.icon}
            fontSize="small"
            color="inherit"
          >
            <ArrowForwardIcon />
          </SvgIcon>
          Tipo de Local
        </Button>
      </Box>

      <Box mt={3}>
        <Card>
          <CardContent>
            <Box >
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Pesquisar"
                variant="standard"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
