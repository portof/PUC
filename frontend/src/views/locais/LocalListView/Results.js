import React, { useState } from 'react';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
    
  }
}));


const Results = ( props ) => {
  const {
    locais,
    setOpen,
    dados,
    setDados
    
  } = props;
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
 

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (id, des) => {
    dados.id = id;
    dados.des = des;
    setDados(dados);
    setOpen(true);

  };



  const columns = [
    { id: 'id', label: 'ID', minWidth: 30 },
    { id: 'tipo', label: 'TIPO', minWidth: 30 },
    { id: 'nome', label: 'NOME', minWidth: 150 },
    { id: 'endereco', label: 'ENDEREÇO', minWidth: 300 },
    { id: 'telefone', label: 'TELEFONE', minWidth: 170 },
  ];


  function Mascara(tipo, value) {
    switch (tipo) {
      case 1:
        //eslint-disable-next-line
        return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
      case 2:
        //eslint-disable-next-line
        return value.replace(/(\d{5})(\d{3})/g, '\$1\-\$2');
      case 3:
        if(value.length === 11){
          //eslint-disable-next-line
          return value.replace(/(\d{2})(\d{5})(\d{4})/g, '\(\$1\)\ \$2\-\$3');
        }else{
          //eslint-disable-next-line
          return value.replace(/(\d{2})(\d{4})(\d{4})/g, '\(\$1\)\ \$2\-\$3');
        }
      default:
        return value
    }
  }

    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                  <TableCell
                    key={'label_actions'}
                    align={'right'}
                    style={{width: '12%'}}
                  >
                  {''}
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locais.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((local) => {
                return (
                  <TableRow hover tabIndex={-1} key={local.id} >
                    <TableCell>
                      {local.id}
                    </TableCell>
                    <TableCell>
                      {local.TipoLocal.descricao}
                    </TableCell>
                    <TableCell>
                      {local.nome}
                    </TableCell>
                    <TableCell>
                      {local.logradouro}, {local.numero}, {local.bairro}, {Mascara(2, local.cep)}
                    </TableCell>
                    <TableCell>
                      {Mascara(3, local.telefone)}
                    </TableCell>
                    
                    <TableCell>
                      <Box
                        component={'div'}
                        display='flex'
                        flexDirection='row'
                      > 
                        <Tooltip title="Localizar">
                          <IconButton
                            aria-label="localizar"
                          >
                            <NotListedLocationIcon
                              color = 'action'
                              fontSize='small'
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton
                            aria-label="editar"
                            onClick={() => navigate(`/locais-edit/${local.id}`,  { replace: true })}
                          >
                            <EditIcon
                              color = 'action'
                              fontSize='small'
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar">
                          <IconButton
                            aria-label="deletar"
                            onClick={() => handleClickOpen(local.id, local.nome)}
                          >
                            <DeleteIcon
                              color = 'action'
                              fontSize='small'
                            />
                          </IconButton>
                        </Tooltip>
                      </Box> 
                    </TableCell>
                   
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={locais.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }

export default Results;
