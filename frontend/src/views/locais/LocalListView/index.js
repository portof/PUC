import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';
import Results from './Results';
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

const LocaisListView = () => {
  const classes = useStyles();
  const [locais, setLocais] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [dados, setDados] = useState([]);
  const TOKEN = localStorage.getItem("@DataVie-Token");

  useEffect(() => {
    async function carregarLocais() {
      try{
        const response = await api.get('/local', { 'headers': { 'token': TOKEN } });  

        if(response.data.length >= 0){
          for(let i = 0, size = response.data.length; i < size; i++){
            response.data[i].on_mouse_over = false;
          }
          setLocais(response.data);
        }
        else{
          NotificationManager.error('Atualização de dados falhou.', 'Algo deu errado!', 4000);
        }
      }
      catch (e) {
        NotificationManager.error('Erro interno!', 'Algo deu errado!', 4000);
        return e;
      }
    }
    carregarLocais();
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, []);

  async function deleteLocal(id){

    try{
      const response = await api.delete(`/local/${id}`, { 'headers': { 'token': TOKEN } }); 
      if(!response){
        NotificationManager.error(response.data.message, 'Algo deu errado!', 4000)
      }else{       
        NotificationManager.success('', 'Deletado com sucesso!', 2000)
        setOpen(false);
        const response = await api.get('/local', { 'headers': { 'token': TOKEN } });  

        if(response.data.length >= 0){
          for(let i = 0, size = response.data.length; i < size; i++){
            response.data[i].on_mouse_over = false;
          }
          setLocais(response.data);
        }
        else{
          NotificationManager.error('Atualização de dados falhou.', 'Algo deu errado!', 4000)
        } 
      } 
    }
    catch (e) {
      NotificationManager.error('Erro interno!', 'Algo deu errado!', 4000);
      return e
    }
  };

  const handleClose = () => { setOpen(false); };

  return (
    <Page
      className={classes.root}
      title="Local"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results 
          locais={locais} 
          setOpen={setOpen}
          dados={dados}
          setDados={setDados}

          />
           <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{`Deseja deletar o local "${dados.des}"?`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Após a confirmação esse processo não poderá ser desfeito.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button 
                color="primary"
                onClick={handleClose} 
              >
                Cancelar
              </Button>
              <Button 
                autoFocus
                color="primary" 
                onClick={() => deleteLocal(dados.id)} 
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </Page>
  );
};

export default LocaisListView;
