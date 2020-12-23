import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Financeiro from './Financeiro';
import UltimosAgendamentos from './UltimosAgendamentos';
import AtendimentosSemanais from './AtendimentosSemanais';
import AtendimentosMensais from './AtendimentosMensais';
import AgendamentosPorAparelho from './AgendamentosPorAparelho';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={6}
            sm={6}
            xl={6}
            xs={12}
          >
            <Financeiro />
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xl={6}
            xs={12}
          >
            <AtendimentosMensais />
          </Grid>
         
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <AtendimentosSemanais />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <UltimosAgendamentos />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <AgendamentosPorAparelho />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
