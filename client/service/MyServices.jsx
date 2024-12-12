import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import auth from '../lib/auth-helper.js'
import {listByOwner} from './api-service.js'
import {Navigate, Link} from 'react-router-dom'
import DeleteService from './DeleteService'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px` ,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  addButton:{
    float:'right'
  },
  leftIcon: {
    marginRight: "8px"
  }
}))

export default function MyServices(){
  const classes = useStyles()
  const [services, setServices] = useState([])
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listByOwner({
      userId: jwt.user._id
    }, {t: jwt.token}, signal).then((data) => {
      if (data.error) {
        setRedirectToSignin(true)
      } else {
        setServices(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const removeServices = (service) => {
    const updatedServices = [...services]
    const index = updatedServices.indexOf(service)
    updatedServices.splice(index, 1)
    setServices(updatedServices)
  }

    if (redirectToSignin) {
      return <Navigate to='/signin'/>
    }
    return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your Services
          <span className={classes.addButton}>
            <Link to="/admin/service/new">
              <Button color="primary" variant="contained">
                <Icon className={classes.leftIcon}>add_box</Icon>  New Service
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
        {services.map((service, i) => {
            return   <span key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar src={'/api/services/logo/'+service._id+"?" + new Date().getTime()}/>
                </ListItemAvatar>
                <ListItemText primary={service.name} secondary={service.description}/>
                { auth.isAuthenticated().user && auth.isAuthenticated().user._id == service.owner._id &&
                  (<ListItemSecondaryAction>
                    <Link to={"/admin/service/edit/" + service._id}>
                      <IconButton aria-label="Edit" color="primary">
                        <Edit/>
                      </IconButton>
                    </Link>
                    <DeleteShop service={service} onRemove={removeServices}/>
                  </ListItemSecondaryAction>)
                }
              </ListItem>
              <Divider/>
            </span>})}
        </List>
      </Paper>
    </div>)
}


