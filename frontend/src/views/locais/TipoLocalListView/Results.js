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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    
  },
  container: {
    maxHeight: 600
  },
  dialog:{
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "hidden"
  },
  box:{
    
  }
}));


const Results = ( props ) => {
  const {
    tipos,
    verificarUpdate,
    setOpen,
    dados,
    setDados
    
  } = props;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


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
    { id: 'descricao', label: 'DESCRIÇÃO', minWidth: 150 },
  ];

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
              {tipos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tipo) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={tipo.id} >
                    <TableCell>
                      {tipo.id}
                    </TableCell>
                    <TableCell>
                      {tipo.descricao}
                    </TableCell>
                    <TableCell>
                      <Box
                        component={'div'}
                        display='flex'
                        flexDirection='row'
                      > 
                        <Tooltip title="Editar">
                          <IconButton
                            aria-label="editar"
                            onClick={() => verificarUpdate(tipo.id)}
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
                            onClick={() => handleClickOpen(tipo.id, tipo.descricao)}
                            
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
          count={tipos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      

      </Paper>
    );
  }

export default Results;
