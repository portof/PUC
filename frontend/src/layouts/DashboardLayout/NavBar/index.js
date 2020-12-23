import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';
import EventIcon from '@material-ui/icons/Event';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';
import AirlineSeatFlatOutlinedIcon from '@material-ui/icons/AirlineSeatFlatOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import InputIcon from '@material-ui/icons/Input';
import NavItem from './NavItem';


const itens = [
  {
    href: '/dashboard',
    icon: TimelineIcon,
    title: 'Dashboard'
  },
  {
    href: '/404',
    icon: EventIcon,
    title: 'Agenda'
  },

  {
    href: '/locais',
    icon: RoomOutlinedIcon,
    title: 'Locais'
  },
  {
    href: '/404',
    icon: PeopleAltOutlinedIcon,
    title: 'Profissionais' 
  },
  {
    href: '/404',
    icon: PeopleAltOutlinedIcon,
    title: 'Pacientes'
  },
  {
    href: '/404',
    icon: AssignmentOutlinedIcon,
    title: 'Prontuários'
  }
];

const serviceItens = [
  {
    href: '/404',
    icon: LocalHospitalOutlinedIcon,
    title: 'Serviços'
  },
  {
    href: '/404',
    icon: AirlineSeatFlatOutlinedIcon,
    title: 'Leitos'
  },
  {
    href: '/404',
    icon: AssessmentOutlinedIcon,
    title: 'Relatórios'
  }
];
const personalItens = [
  {
    href: '/404',
    icon: PersonOutlineOutlinedIcon,
    title: 'Conta'
  },
  {
    href: '/404',
    icon: SettingsIcon,
    title: 'Configurações'
  },
  
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile, logout }) => {
  const classes = useStyles();
  const location = useLocation();
  const USER = JSON.parse(localStorage.getItem("@DataVie-User"));
  


  const intro = {
    avatar: '/static/images/avatars/avatar.png',
    jobTitle: (USER.funcao === 'A' ? 'Administrador(a)' : (USER.funcao === 'E' ? 'Especialista' : 'Cliente')),
    name: USER.nome
  }; 



  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={intro.avatar}
          to="/"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {intro.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {intro.name ==='teste'? 'Teste' : intro.jobTitle}
        </Typography>
      </Box>
     
      <Box p={2}>
        <Divider />
        <List>
          {itens.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List> 
        <Divider />
        <List>
          {serviceItens.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
        <Divider />
        <List>
          {personalItens.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <NavItem
              href={'/login'}
              key={'Sair'}
              title={'Sair'}
              icon={InputIcon}
              onClick={logout}

            />
        </List>

      </Box>


      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
