import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,

} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import './App.css';
import TasksLayout from './layouts/Tasks'
import GoalsLayout from './layouts/Goals'
import HomeLayout from './layouts/Home'
import CalendarLayout from './layouts/Calendar'


Amplify.configure(awsconfig);

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: orange,
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
    <Router>

    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="nav-menu" aria-haspopup="true" onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem><Link to="/">Home</Link></MenuItem>
          <MenuItem><Link to="/tasks">Tasks</Link></MenuItem>
          <MenuItem><Link to="/goals">Goals</Link></MenuItem>
          <MenuItem><Link to="/calendar">Calendar</Link></MenuItem>
        </Menu>
        <Typography variant="h6" className={classes.title}>
          I Did It
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
      <div className="App">
        <header className="App-header">
        <Switch>
          <Route path="/calendar">
            <CalendarLayout />
          </Route>
          <Route path="/tasks">
            <TasksLayout />
          </Route>
          <Route path="/goals">
            <GoalsLayout />
          </Route>
          <Route path="/">
            <HomeLayout />
          </Route>
        </Switch>
        </header>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default withAuthenticator(App, true);
