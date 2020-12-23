import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Divider,
  Grid,
  makeStyles
} from '@material-ui/core';
import { TextValidator, ValidatorForm, SelectValidator } from 'react-material-ui-form-validator';
import { NotificationManager } from 'react-notifications';
import Page from 'src/components/Page';
import InputMask from 'react-input-mask';
import api from '../../../services/Api';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',

  }, 
  card:{
    minHeight:648,
    paddingTop: theme.spacing(8)
  }

}));

const Register = ( props ) => {
  const {
    local,
    setLocal,
    uf,
    setUf,
    admin,
    setAdmin,
    nome,
    setNome,
    nomeDetalhado,
    setNomeDetalhado,
    cnpj,
    setCnpj,
    logradouro,
    setLogradouro,
    numero,
    setNumero,
    complemento,
    setComplemento,
    bairro,
    setBairro,
    cep,
    setCep,
    cidade,
    setCidade,
    telefone,
    setTelefone,
    tipoLocal,
    setTipoLocal,
    tipos,
    vazio,
    setVazio
    
  } = props;
  const classes = useStyles();


  const [mascaraCep] = useState('99999-999');
  const [mascaraCNPJ] = useState('99.999.999/9999-99');
  const [mascaraTelefone, setMascaraTelefone] = useState('(99) 99999-9999');

  const estados = [
    {"nome": "Acre", "sigla": "AC"},
    {"nome": "Alagoas", "sigla": "AL"},
    {"nome": "Amapá", "sigla": "AP"},
    {"nome": "Amazonas", "sigla": "AM"},
    {"nome": "Bahia", "sigla": "BA"},
    {"nome": "Ceará", "sigla": "CE"},
    {"nome": "Distrito Federal", "sigla": "DF"},
    {"nome": "Espírito Santo", "sigla": "ES"},
    {"nome": "Goiás", "sigla": "GO"},
    {"nome": "Maranhão", "sigla": "MA"},
    {"nome": "Mato Grosso", "sigla": "MT"},
    {"nome": "Mato Grosso do Sul", "sigla": "MS"},
    {"nome": "Minas Gerais", "sigla": "MG"},
    {"nome": "Pará", "sigla": "PA"},
    {"nome": "Paraíba", "sigla": "PB"},
    {"nome": "Paraná", "sigla": "PR"},
    {"nome": "Pernambuco", "sigla": "PE"},
    {"nome": "Piauí", "sigla": "PI"},
    {"nome": "Rio de Janeiro", "sigla": "RJ"},
    {"nome": "Rio Grande do Norte", "sigla": "RN"},
    {"nome": "Rio Grande do Sul", "sigla": "RS"},
    {"nome": "Rondônia", "sigla": "RO"},
    {"nome": "Roraima", "sigla": "RR"},
    {"nome": "Santa Catarina", "sigla": "SC"},
    {"nome": "São Paulo", "sigla": "SP"},
    {"nome": "Sergipe", "sigla": "SE"},
    {"nome": "Tocantins", "sigla": "TO"}
  ];
  const Administracao =[
    {"nome": "Pública", "value": "PUB"},
    {"nome": "Privada", "value": "PRI"}
  ];

  function modificarValores(order, value) {
    
    switch (order) {
      case 1:
        local.nome = value;
        setLocal(local);
        setNome(value);
        break;
      case 2:
        local.nomeDetalhado = value;
        setLocal(local);
        setNomeDetalhado(value);
        break;
      case 3:
        local.cnpj = value;
        setLocal(local);
        setCnpj(value);
        break;
      case 4:
        local.logradouro = value;
        setLocal(local);
        setLogradouro(value);
        break;
      case 5:
        local.numero = value;
        setLocal(local);
        setNumero(value);
        break;
      case 6:
        local.complemento = value;
        setLocal(local);
        setComplemento(value);
        break;
      case 7:
        local.bairro = value;
        setLocal(local);
        setBairro(value);
        break;
      case 8:
        local.cep = value;
        setLocal(local);
        setCep(value);
        break;
      case 9:
        local.cidade = value;
        setLocal(local);
        setCidade(value);
        break;
      case 10:
        local.uf = value;
        setLocal(local);
        setUf(value);
        break;
      case 11:
        local.telefone = value;
        setLocal(local);
        setTelefone(value);
        value.substr(2,1) === 9 ? setMascaraTelefone('(99) 99999-9999') : setMascaraTelefone('(99) 9999-9999');
        break;
      case 12:
        local.id_tipo_local = value;
        setLocal(local);
        setTipoLocal(value);
        break;
      case 13:
        local.admin = value;
        setLocal(local);
        setAdmin(value);
        break;
      default:
        setLocal(local);
    }
  }

  function blurValidation(value){
    setVazio(value);
  }


  async function buscarCep(cep) {
    try{
      const response = await api.get('https://viacep.com.br/ws/' + cep + '/json/');
      
      if(response.data.erro){
        NotificationManager.error('CEP não encontrado.', 'Algo deu errado!', 4000)
        document.getElementById("cep").focus();
        setVazio(cep);
      }
      else{
        modificarValores(4, response.data.logradouro);
        modificarValores(7, response.data.bairro);
        modificarValores(9, response.data.localidade);
        modificarValores(10, response.data.uf);
      }
    }
    catch (e) {
      NotificationManager.error('Favor verificar CEP.', 'Algo deu errado!', 4000);
      setVazio(cep);
      return e;
    }
  }

  function erroInfos() {
    NotificationManager.error('Favor verificar informações.', 'Algo deu errado!', 4000)
  }

  
  return (
    <Page
      className={classes.root}
      title="Local"
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
              md={3}
              xs={12}
            >
              <TextValidator
                fullWidth
                error={Boolean((nome.length === 0) && !vazio)}
                helperText={"Insira o nome"}
                label="Nome"
                margin="dense"
                name="nome"
                onBlur={e => blurValidation(e.target.value)}
                onChange={e => modificarValores(1, e.target.value)}
                value={nome}
                variant="outlined"
                inputProps={{ maxLength: 50 }}
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <InputMask
                mask={mascaraCNPJ}
                value={cnpj}
                onBlur={e => blurValidation(e.target.value)}
                onChange={e => modificarValores(3, e.target.value.replace('.', '').replace('.', '').replace('-', '').replace('/', ''))}
              >
                {
                  (inputProps) =>
              <TextValidator
                fullWidth
                error={Boolean((cnpj.length === 0) && !vazio)}
                helperText={"Insira o CNPJ"}
                label="CNPJ"
                margin="dense"
                name="cnpj"
                id="cnpj"
                onBlur={inputProps.onBlur}
                onChange={inputProps.onChange}
                variant="outlined"
    
              />
                }
              </InputMask>
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <SelectValidator
              fullWidth
              error={Boolean((admin.length === 0) && !vazio)}
              value={admin}
              onBlur={e => blurValidation(e.target.value)}
              onChange={e => modificarValores(13, e.target.value)}
              SelectProps={{
                native: true,
              }}
              helperText="Insira o tipo de administração"
              variant="outlined"
              margin="dense"
              >
                <option disabled value="">
                  Administração
                </option>
                {Administracao.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.nome}
                  </option>
                ))}
              </SelectValidator>
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <SelectValidator
              fullWidth
              error={Boolean((tipoLocal.length === 0) && !vazio)}
              value={tipoLocal}
              onBlur={e => blurValidation(e.target.value)}
              onChange={e => modificarValores(12, e.target.value)}
              SelectProps={{
                native: true,
              }}
              helperText="Insira o tipo de local"
              variant="outlined"
              margin="dense"
              >
                <option disabled value="">
                  Tipo de Local
                </option>
                 {tipos.map((option) => (
                  
                  <option key={option.id} value={option.id}>
                    {option.descricao}
                  </option>
                ))}  
              </SelectValidator>
            </Grid>
          </Grid>
          <Grid
            
            container
            spacing={2}
            justify={'center'}
          >
            <Grid
              item
              md={9}
              xs={12}
            >
              <TextValidator
              fullWidth
              helperText="Insira o nome detalhado(se necessário)"
              label="Nome detalhado"
              margin="dense"
              name="nomeDetalhado"
              onChange={e => modificarValores(2, e.target.value)}
              value={nomeDetalhado}
              variant="outlined"
              inputProps={{ maxLength: 250 }}
            />
            </Grid>
          </Grid>
          <Grid
            
            container
            spacing={2}
            justify={'center'}
          >
            <Grid
              item
              md={2}
              xs={12}
            >
             <InputMask
                mask={mascaraCep}
                value={cep}
                onBlur={e => buscarCep(e.target.value)}
                onChange={e => modificarValores(8, e.target.value.replace('.', '').replace('-', ''))}
              >
                {
                  (inputProps) =>
              <TextValidator
                fullWidth
                error={Boolean((cep.length === 0) && !vazio)}
                helperText={"Insira o CEP"}               
                label="CEP"
                margin="dense"
                name="cep"
                id="cep"
                onBlur={inputProps.onBlur}
                onChange={inputProps.onChange}
                variant="outlined"
              />
                }
              </InputMask>

            </Grid>
            <Grid
              item
              md={5}
              xs={12}
            >
              <TextValidator  
                fullWidth    
                disabled
                helperText={"Insira o logradouro"}                 
                label="Logradouro"
                margin="dense"
                name="logradouro"
                onChange={e => setLogradouro(e.target.value)}
                value={logradouro}
                variant="outlined"
                inputProps={{ maxLength: 100 }}
              />              
            </Grid>

            <Grid
              item
              md={2}
              xs={12}
            >
              <TextValidator  
                fullWidth  
                error={Boolean((numero.length === 0) && !vazio)}      
                helperText={"Insira o número"}                
                label="Número"
                margin="dense"
                name="numero"
                onBlur={e => blurValidation(e.target.value)}
                onChange={e => modificarValores(5, e.target.value)}
                value={numero}
                variant="outlined"
                inputProps={{ maxLength: 10 }}
              />
              
            </Grid>
          </Grid>
          <Grid
            
            container
            spacing={2}
            justify={'center'}
          >
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextValidator
                fullWidth          
                helperText="Insira o complemento"                 
                label="Complemento"
                margin="dense"
                name="complemento"
                onChange={e => modificarValores(6, e.target.value)}
                value={complemento}
                variant="outlined"
                inputProps={{ maxLength: 100 }}
              
              />

              <InputMask
                mask={mascaraTelefone}
                value={telefone}
                onBlur={e => blurValidation(e.target.value)}
                onChange={e => modificarValores(11, e.target.value.replace('(', '').replace(')', '').replace(' ', '').replace('-', ''))}
              >
                {
                  (inputProps) =>
              <TextValidator
                fullWidth
                error={Boolean((telefone.length === 0) && !vazio)}
                helperText={"Insira o telefone com o DDD"}            
                label="Telefone"
                margin="dense"
                name="telefone"
                onBlur={inputProps.onBlur}
                onChange={inputProps.onChange}
                variant="outlined"
                
                
              /> 
                }
                </InputMask>



            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextValidator
                fullWidth  
                disabled
                helperText={"Insira o bairro"}            
                label="Bairro"
                margin="dense"
                name="bairro"
                onChange={e => setBairro(e.target.value)}
                value={bairro}
                variant="outlined"
                inputProps={{ maxLength: 100 }}
            
              />

            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextValidator
                fullWidth        
                disabled  
                helperText={"Insira a cidade"}               
                label="Cidade"
                margin="dense"
                name="cidade"
                onChange={e => setCidade(e.target.value)}
                value={cidade}
                variant="outlined"
                inputProps={{ maxLength: 100 }}
            
              />

            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
            <SelectValidator
              fullWidth
              disabled
              value={uf}
              onChange={e => setUf(e.target.value)}
              SelectProps={{
                native: true,
              }}
              helperText="Insira o estado"
              variant="outlined"
              margin="dense"
            
            >
              <option disabled value="">
                Estado
              </option>

              {estados.map((option) => (
                <option key={option.sigla} value={option.sigla}>
                  {option.nome}
                </option>
              ))}
            </SelectValidator>

            </Grid>

          </Grid>

        </ValidatorForm>
        <Divider style={{marginTop: 20}}/>
      </Card>
    </Page>
  );
};

Register.propTypes = {
  className: PropTypes.string,
  local: PropTypes.object.isRequired
};

export default Register;
