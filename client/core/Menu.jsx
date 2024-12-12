import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from '../lib/auth-helper';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Function to apply active styling
const isActive = (location, path) => {
  return location.pathname === path ? { color: '#ff4081' } : { color: '#ffffff' };
};

// Function for part active state (for paths with dynamic segments)
const isPartActive = (location, path) => {
  return location.pathname.includes(path) ? { color: '#bef67a' } : { color: '#ffffff' };
};

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Tourism Mediation
        </Typography>
        
        {/* Home Icon */}
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(location, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        
        {/* Users link */}
        <Link to="/users">
          <Button style={isActive(location, "/users")}>Users</Button>
        </Link>
        
        {/* Conditional Rendering for Authentication */}
        {!auth.isAuthenticated() ? (
          <span>
            <Link to="/signup">
              <Button style={isActive(location, "/signup")}>Sign Up</Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(location, "/signin")}>Sign In</Button>
            </Link>
          </span>
        ) : (
          <span>
            {/* Admin-only button */}
            {auth.isAuthenticated().user && auth.isAuthenticated().user.admin && (
              <Link to="/admin/services">
                <Button style={isPartActive(location, "/admin/")}>My Services</Button>
              </Link>
            )}
            
            {/* User Profile button */}
            <Link to={`/user/${auth.isAuthenticated().user._id}`}>
              <Button style={isActive(location, `/user/${auth.isAuthenticated().user._id}`)}>
                My Profile
              </Button>
            </Link>
            
            {/* Sign out button */}
            <Button color="inherit" onClick={() => {
              auth.clearJWT(() => navigate('/'));
            }}>Sign out</Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
}
