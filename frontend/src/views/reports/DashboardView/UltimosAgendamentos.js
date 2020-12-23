import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const data = [
  {
    id: uuid(),
    local: 'MONTE SINAI',
    especialidade: 'Cardiologia',
    paciente: {
      nome: 'João Claudio'
    },
    createdAt: 1555016400000,
    status: 'confirmado'
  },
  {
    id: uuid(),
    local: 'DOM MOURA',
    especialidade: 'Pediatria',
    paciente: {
      nome: 'Mayra Mayara'
    },
    createdAt: 1555016400000,
    status: 'confirmado'
  },
  {
    id: uuid(),
    local: 'MONTE SINAI',
    especialidade: 'Endocrinologia',
    paciente: {
      nome: 'Matheus Conceição'
    },
    createdAt: 1554930000000,
    status: 'confirmado'
  },
  {
    id: uuid(),
    local: 'PPS',
    especialidade: 'Fisioterapia',
    paciente: {
      nome: 'Mariana Tavares'
    },
    createdAt: 1554757200000,
    status: 'confirmado'
  },
  {
    id: uuid(),
    local: 'PPS',
    especialidade: 'Fisioterapia',
    paciente: {
      nome: 'Flávio Porto'
    },
    createdAt: 1554670800000,
    status: 'confirmado'
  },
  {
    id: uuid(),
    local: 'DOM MOURA',
    especialidade: 'Geriatria',
    paciente: {
      nome: 'Clarice Lispector'
    },
    createdAt: 1554670800000,
    status: 'confirmado'
  }
];

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UltimosAgendamentos = ({ classnome, ...rest }) => {
  const classes = useStyles();
  const [orders] = useState(data);

  return (
    <Card
      classnome={clsx(classes.root, classnome)}
      {...rest}
      
    >
      <CardHeader title="Últimos agendamentos" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Local
                </TableCell>
                <TableCell>
                  Especialidade
                </TableCell>
                <TableCell>
                  Paciente
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Ordem"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Horário
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {order.local}
                  </TableCell>
                  <TableCell>
                    {order.especialidade}
                  </TableCell>
                  <TableCell>
                    {order.paciente.nome}
                  </TableCell>
                  <TableCell>
                    {moment(order.createdAt).format('hh:mm')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={order.status}
                      size="small"
                      style={{color: 'white'}}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Ver todos
        </Button>
      </Box>
    </Card>
  );
};

UltimosAgendamentos.propTypes = {
  classnome: PropTypes.string
};

export default UltimosAgendamentos;
