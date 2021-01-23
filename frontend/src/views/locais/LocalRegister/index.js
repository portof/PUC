import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles
} from '@material-ui/core';
import { NotificationManager } from 'react-notifications';
import Page from 'src/components/Page';
import Register from './Register';
import Toolbar from './Toolbar';

import api from '../../../services/Api';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LocaisRegister = () => {
  const [local, setLocal] = useState({});
  const classes = useStyles();
  const navigate = useNavigate();

  const { id } = useParams();

  const [uf, setUf] = React.useState('');
  const [admin, setAdmin] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [nomeDetalhado, setNomeDetalhado] = React.useState('');
  const [cnpj, setCnpj] = React.useState('');
  const [logradouro, setLogradouro] = React.useState('');
  const [numero, setNumero] = React.useState('');
  const [complemento, setComplemento] = React.useState('');
  const [bairro, setBairro] = React.useState('');
  const [cep, setCep] = React.useState('');
  const [cidade, setCidade] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [tipoLocal, setTipoLocal] = React.useState('');

  const [tipos, setTipos] = React.useState([]);
  const [vazio, setVazio] = React.useState(true);
  const [botao, setBotao] = useState('');
  const [open, setOpen] = React.useState(false);
  const TOKEN = localStorage.getItem("@DataVie-Token");
  
  useEffect(() => {
    async function iniciarLocal() {
      if(id){
        setBotao('Atualizar');
        const response = await api.get(`/local/${id}`, { 'headers': { 'token': TOKEN } });
        setLocal(response.data[0]);
        setUf(response.data[0].uf);
        setAdmin(response.data[0].admin);
        setNome(response.data[0].nome);
        setNomeDetalhado(response.data[0].nome_detalhado);
        setCnpj(response.data[0].cnpj);
        setLogradouro(response.data[0].logradouro);
        setNumero(response.data[0].numero);
        setComplemento(response.data[0].complemento);
        setBairro(response.data[0].bairro);
        setCep(response.data[0].cep);
        setCidade(response.data[0].cidade);
        setTelefone(response.data[0].telefone);
        setTipoLocal(response.data[0].id_tipo_local);
        
      }else{       
        setLocal(local);
        setBotao('Salvar');
      }
    }
    iniciarLocal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  

  async function cadastrarLocal(){
    
    try{
      const response = await api.post('/local', local, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': TOKEN
        },
        body: JSON.stringify(local)
      } );  

      if(response.data.message != null){
        NotificationManager.error('Favor preencher todos os campos.', 'Algo deu errado!', 4000)

        setVazio(false);
        }
      
      else{
        NotificationManager.success('', 'Cadastrado com sucesso!', 2000)

        navigate('/locais', { replace: true })

      } 
    }
    catch (e) {
      NotificationManager.error('Erro interno!', 'Algo deu errado!', 4000);
      setVazio(false);

    }
  };

  useEffect(() => {
    async function carregarTipos() {
      try{
        const response = await api.get('/tipolocal', { 'headers': { 'token': TOKEN } });  
        if(response.data.length > 0){
          setTipos(response.data);
        }
        else{
          NotificationManager.error('Favor verificar tipos de local cadastrados.', 'Algo deu errado!', 4000)
        } 
      }
      catch (e) {  
        NotificationManager.error('Erro interno!', 'Algo deu errado!', 4000);
      }
    }
    carregarTipos();
    // eslint-disable-next-line react-hooks/exhaustive-deps   
  }, []);

  async function atualizarLocal(){
   
    try{
      
      const response = await api.put(`/local/${id}`, local, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': TOKEN
        },
        body: JSON.stringify(local)
      } );      


      if(response.data.erro === true){
        NotificationManager.error(response.data.message, 'Algo deu errado!', 4000);
      }
      else{       
        NotificationManager.success('', 'Atualizado com sucesso!', 2000);
        navigate('/locais', { replace: true });
      } 
    }
    catch (e) {
      NotificationManager.error('Erro interno!', 'Algo deu errado!', 4000);
      setVazio(false);
    }
  };

  const handleClose = () => { setOpen(false); };

  function verificarAtt(){

    if(nome || cnpj || admin || nomeDetalhado || logradouro || numero || complemento || bairro || cep || cidade || uf || telefone || tipoLocal){
      setOpen(true);

    }else{
      navigate('/locais', { replace: true }); 

    }
  }

  return (
    <Page
      className={classes.root}
      title="Local"
    >
      <Container maxWidth={false}>
        <Toolbar 
          cadastrarLocal={cadastrarLocal}
          atualizarLocal={atualizarLocal}
          id={id}
          botao={botao}
          verificarAtt={verificarAtt}
        />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{`Deseja cancelar operação?`}</DialogTitle>
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
                Voltar
              </Button>
              <Button 
                autoFocus
                color="primary" 
                onClick={(() => {navigate('/locais', { replace: true })})} 
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        <Box mt={3}>
          <Register 
            local={local}
            setLocal={setLocal}
            tipos={tipos}
            vazio={vazio}
            setVazio={setVazio}
            uf={uf}
            setUf={setUf}
            admin={admin}
            setAdmin={setAdmin}
            nome={nome}
            setNome={setNome}
            nomeDetalhado={nomeDetalhado}
            setNomeDetalhado={setNomeDetalhado}
            cnpj={cnpj}
            setCnpj={setCnpj}
            logradouro={logradouro}
            setLogradouro={setLogradouro}
            numero={numero}
            setNumero={setNumero}
            complemento={complemento}
            setComplemento={setComplemento}
            bairro={bairro}
            setBairro={setBairro}
            cep={cep}
            setCep={setCep}
            cidade={cidade}
            setCidade={setCidade}
            telefone={telefone}
            setTelefone={setTelefone}
            tipoLocal={tipoLocal}
            setTipoLocal={setTipoLocal}
          />
        </Box>
       
      </Container>
    </Page>
  );
};

export default LocaisRegister;
