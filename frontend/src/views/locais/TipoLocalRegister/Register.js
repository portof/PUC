import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Checkbox ,
  Divider,
  FormControlLabel,
  Grid,
  makeStyles
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Page from 'src/components/Page';
import { NotificationManager } from 'react-notifications';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',

  },
  card:{
    minHeight:648,
    paddingTop: theme.spacing(8)
  },
  check:{
    marginBottom: 20,
    marginLeft: 20
  }

}));

const Register = ( props ) => {
  const {
    tipo,
    setTipo,
    vazio,
    setVazio,
    descricao,
    setDescricao,
    farmacia,
    setFarmacia,
    disabled,
    setDisabled
  } = props;
  const classes = useStyles();

  function modificarValores(order, value) {
    switch (order) {
      case 1:
        tipo.descricao = value;
        setTipo(tipo);
        setDescricao(value);
        break;
      case 2:
        tipo.farmacia = value;
        setFarmacia(value); 
        if(value === true){
          tipo.descricao = 'Farmácia';
          setDescricao('Farmácia');
          setDisabled(true);
        }else{
          tipo.descricao = '';
          setDescricao('');
          setDisabled(false);
        }
        setTipo(tipo);
        break;
      default:
        setTipo(tipo);
    }
    
  }

  function blurValidation(value){
    setVazio(value);
  }

  function erroInfos() {
    NotificationManager.error('Favor verificar informações fornecidas.', 'Algo deu errado!', 4000)
  }

  return (
    <Page
      className={classes.root}
      title="Tipo de local"
    >
      <Card
        className={classes.card}
        variant="outlined"
      >
        <ValidatorForm 
          autoComplete="off"
          onError={erroInfos}
        >
          
          <Grid
            container
            spacing={2}
            justify={'center'}
          >
            <Grid
              item
              md={5}
              xs={12}
            >
              <TextValidator
                fullWidth
                disabled={disabled}
                error={Boolean((descricao.length === 0) && !vazio)}
                helperText={"Insira a descrição"}
                label="Descrição"
                margin="dense"
                name="descricao"
                onBlur={e => blurValidation(e.target.value)}
                onChange={e => modificarValores(1, e.target.value)}
                value={descricao}
                variant="outlined"
                inputProps={{ maxLength: 50 }}
                
              />
            </Grid>
            <FormControlLabel
              className={classes.check}
              control={
                <Checkbox
                  checked={farmacia}
                  onChange={e => modificarValores(2, e.target.checked)} 
                  name="farmacia"
                  color="primary"
                  
                />
              }
              label="Farmácia"
            />

          </Grid>

        </ValidatorForm>
        <Divider style={{marginTop: 20}}/>
      </Card>
    </Page>
  );
};

Register.propTypes = {
  className: PropTypes.string,
  tipo: PropTypes.object.isRequired,

};

export default Register;
