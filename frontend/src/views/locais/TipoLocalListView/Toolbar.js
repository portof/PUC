import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {},
  paper:{
    minWidth: '25%',
  },
  icon:{
    marginRight: 5
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div
      className={clsx(classes.root, className)}
      style={{ width: '100%' }}
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
            TIPO DE LOCAL
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
          onClick={(() => {navigate('/locais', { replace: true })})}
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
            <ArrowBackIcon />
          </SvgIcon>
          Voltar
        </Button>

        <Button
          color="secondary"
          variant="contained"
          onClick={(() => {navigate('/tipolocal-register', { replace: true })})}
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
          Cadastrar Tipo de Local
        </Button>

        <Button
          disabled
          color="secondary"
          variant="contained"
          style={{
            marginRight: '10px',
            color: 'black',
            
            borderRadius: 15
          }}
        >
          <SvgIcon
            className={classes.icon}
            fontSize="small"
            color="action"
          >
            <EditIcon />
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
