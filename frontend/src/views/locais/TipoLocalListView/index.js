import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { useNavigate } from 'react-router-dom';
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

const TipoLocalListView = () => {
  const classes = useStyles();
  const [tipos, setTipos] = useState([]); 
  const [open, setOpen] = React.useState(false);
  const [dados, setDados] = useState([]);
  const TOKEN = localStorage.getItem("@DataVie-Token");

  const navigate = useNavigate();


  useEffect(() => {
    async function carregarTipos() {
      try{
        const response = await api.get('/tipolocal', { 'headers': { 'token': TOKEN } });  

        if(response.data.length >= 0){
          for(let i = 0, size = response.data.length; i < size; i++){
            response.data[i].on_mouse_over = false;
          }
          setTipos(response.data);
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
    carregarTipos();
  }, [TOKEN]);

  async function deleteTipoLocal(id){

    try{
      const response = await api.delete(`/tipolocal/${id}`, { 'headers': { 'token': TOKEN } }); 

      if(!response){
        NotificationManager.error(response.data.message, 'Algo deu errado!', 4000)
      }else if(!!response.data.nome){
        NotificationManager.error(`Tipo selecionado vinculado ao local "${response.data.nome}"! Não é possível deletar tipos com locais vinculados.`, 'Algo deu errado!', 6000)
      }else{       
        NotificationManager.success('', 'Deletado com sucesso!', 2000)
        setOpen(false);
        const response = await api.get('/tipolocal', { 'headers': { 'token':TOKEN } });  

        if(response.data.length >= 0){
          for(let i = 0, size = response.data.length; i < size; i++){
            response.data[i].on_mouse_over = false;
          }
          setTipos(response.data);
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

  async function verificarUpdate(id){

    try{
      const response = await api.get(`/tipolocal/${id}`, { 'headers': { 'token': TOKEN } });  

      if(response.data[1] != null){
        NotificationManager.error('Tipo possui local vinculado! Não é possível realizar alteração.', 'Algo deu errado!', 4000);
      }else{
        navigate(`/tipolocal-edit/${id}`,  { replace: true })
      }
    } 
    catch (e) {
      NotificationManager.error('Erro interno!', 'Algo deu errado!', 4000);
      return e;
    }
  }

  const handleClose = () => {
    setOpen(false);

  };



  return (
    <Page
      className={classes.root}
      title="Tipo de local"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results 
            tipos={tipos}
            deleteTipoLocal={deleteTipoLocal}
            verificarUpdate={verificarUpdate}
            open={open}
            setOpen={setOpen}
            dados={dados}
            setDados={setDados}

          />

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title">{`Deseja deletar o tipo "${dados.des}"?`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="dialog-description">
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
                onClick={() => deleteTipoLocal(dados.id)} 
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

export default TipoLocalListView;
