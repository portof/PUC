import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  Paper,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
        '& > span': {
          margin: theme.spacing(2),
        },
  },
  paper:{
    minWidth: '25%',
  },
  card:{
    minHeight: 74,
  },
  icon:{
    marginRight: 5
  }

}));

const Toolbar = ( props ) => {
  const { 
    className, 
    cadastrarTipoLocal, 
    atualizarTipoLocal,
    id,
    botao
  } = props;
  const classes = useStyles();
  const navigate = useNavigate();




  return (
    <div
      className={clsx(classes.root, className)}
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
            CADASTRAR TIPO DE LOCAL
          </Typography>
        </Paper>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-end"
      >
         
        <Button
        variant="contained"
        onClick={(() => {navigate('/tipolocal', { replace: true })})}
        style={{
            marginRight: '10px',
            color: 'white',
            backgroundColor: '#EE0000',
            borderRadius: 15
        }}
        >
        <SvgIcon
          className={classes.icon}
          fontSize="small"
          color="inherit"
        >
          <HighlightOffIcon />
        </SvgIcon>
            Cancelar
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={id ? atualizarTipoLocal : cadastrarTipoLocal}
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
          <CheckCircleOutlineIcon />
        </SvgIcon>
            {botao}
        </Button>

      </Box>
      <Box mt={3}>
          <Card className={classes.card}></Card>
      </Box>
        
     
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
