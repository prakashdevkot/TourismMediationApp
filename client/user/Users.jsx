import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { list } from './api-user.js';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: '20px auto',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(3),
  },
  title: {
    color: '#3f51b5',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: theme.spacing(2, 0),
  },
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#e8f0fe',
    borderRadius: theme.spacing(1),
  },
  avatar: {
    backgroundColor: '#3f51b5',
    color: '#fff',
  },
  listItem: {
    borderBottom: '1px solid #ddd',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  arrowIcon: {
    color: '#3f51b5',
  },
}));

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        List of All Users
      </Typography>
      <List dense>
        {users.map((item, i) => (
          <Link
            component={RouterLink}
            to={`/user/${item._id}`}
            key={i}
            className={classes.link}
          >
            <ListItem button className={classes.listItem}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  {item.name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton className={classes.arrowIcon}>
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  );
}
