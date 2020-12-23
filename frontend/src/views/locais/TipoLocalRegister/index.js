import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Register from './Register';
import Toolbar from './Toolbar';
import { NotificationManager } from 'react-notifications';
import api from '../../../services/Api';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TipoLocalRegister = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { id } = useParams();

  const [tipo, setTipo] = useState({});
  const [descricao, setDescricao] = useState('');
  const [farmacia, setFarmacia] = useState(false);
  const [vazio, setVazio] = useState(true);
  const [disabled, setDisabled] = React.useState(false);
  const [botao, setBotao] = useState('');
  const TOKEN = localStorage.getItem("@DataVie-Token");
  
   useEffect(() => {
    async function iniciarTipo() {

      if(id){
        setBotao('Atualizar');
        const response = await api.get(`/tipolocal/${id}`, { 'headers': { 'token': TOKEN } });
        setDescricao(response.data[0].descricao);
        setFarmacia(response.data[0].farmacia);
        setTipo(response.data[0]);
        

        if(response.data[0].farmacia === true){
          setDisabled(true);
        }
      }else{
        
        setTipo(tipo);
        setBotao('Salvar');
      }
    }
    iniciarTipo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  async function cadastrarTipoLocal(){

    try{

      const response = await api.post('/tipolocal', tipo, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': TOKEN
        },
        body: JSON.stringify(tipo)
      } ); 
      if(response.data.farmacia === true){
        NotificationManager.error(response.data.message, 'Algo deu errado!', 4000);
      }else if(response.data.message != null){
        NotificationManager.error(response.data.message, 'Algo deu errado!', 4000);
        }
      else{       
        NotificationManager.success('', 'Cadastrado com sucesso!', 2000);
        navigate('/tipolocal', { replace: true });
      } 
    }
    catch (e) {
      NotificationManager.error('Erro interno!', 'Algo deu errado!', 4000);
      setVazio(false);

    }
  };

  async function atualizarTipoLocal(){

    try{

      const response = await api.put(`/tipolocal/${id}`, tipo, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': TOKEN
        },
        body: JSON.stringify(tipo)
      } );     

      if(response.data.local){
        NotificationManager.error(response.data.message, 'Algo deu errado!', 4000);
      }else if(response.data.farmacia === true){
        NotificationManager.error(response.data.message, 'Algo deu errado!', 4000);
        }
      else{       
        NotificationManager.success('', 'Atualizado com sucesso!', 2000);
        navigate('/tipolocal', { replace: true });
      } 
    }
    catch (e) {
      NotificationManager.error('Erro interno!', 'Algo deu errado!', 4000);
      setVazio(false);

    }
  };

  return (
    <Page
      className={classes.root}
      title="Tipo de local"
    >
      <Container maxWidth={false}>
        <Toolbar 
          cadastrarTipoLocal={cadastrarTipoLocal}
          atualizarTipoLocal={atualizarTipoLocal}
          id={id}
          botao={botao}
        />
        <Box mt={3}>
          <Register 
            tipo={tipo}
            setTipo={setTipo}
            vazio={vazio}
            setVazio={setVazio}
            descricao={descricao}
            setDescricao={setDescricao}     
            farmacia={farmacia}
            setFarmacia={setFarmacia}     
            disabled={disabled}
            setDisabled={setDisabled}       
          />
        </Box>
       
      </Container>
    </Page>
  );
};

export default TipoLocalRegister;
