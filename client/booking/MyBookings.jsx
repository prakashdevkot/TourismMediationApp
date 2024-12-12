import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Edit from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import { listByService } from "./api-booking.js";
import DeleteProduct from "./DeleteBooking.jsx";

const useStyles = makeStyles((theme) => ({
  bookings: {
    padding: "24px",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  cover: {
    width: 110,
    height: 100,
    margin: "8px",
  },
  details: {
    padding: "10px",
  },
}));

export default function MyBookings(props) {
  const classes = useStyles();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByService(
      {
        serviceId: props.serviceId,
      },
      signal
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBookings(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const removeBooking = (booking) => {
    const updatedBookings = [...bookings];
    const index = updatedBookings.indexOf(booking);
    updatedBookings.splice(index, 1);
    setBookings(updatedBookings);
  };

  return (
    <Card className={classes.products}>
      <Typography type="title" className={classes.title}>
      Bookings
        <span className={classes.addButton}>
          <Link to={"/admin/" + props.serviceId + "/bookings/new"}>
            <Button color="primary" variant="contained">
              <Icon className={classes.leftIcon}>add_box</Icon> New Booking
            </Button>
          </Link>
        </span>
      </Typography>
      <List dense>
        {bookings.map((booking, i) => {
          return (
            <span key={i}>
              <ListItem>
                <CardMedia
                  className={classes.cover}
                  image={
                    "/api/booking/image/" +
                    booking._id +
                    "?" +
                    new Date().getTime()
                  }
                  title={booking.name}
                />
                <div className={classes.details}>
                  <Typography
                    type="headline"
                    component="h2"
                    color="primary"
                    className={classes.bookingTitle}
                  >
                    {booking.name}
                  </Typography>
                  <Typography
                    type="subheading"
                    component="h4"
                    className={classes.subheading}
                  >
                    Quantity: {booking.quantity} | Price: ${booking.price}
                  </Typography>
                </div>
                <ListItemSecondaryAction>
                  <Link
                    to={
                      "/admin/" +
                      booking.service._id +
                      "/" +
                      booking._id +
                      "/edit"
                    }
                  >
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteBooking
                    booking={booking}
                    serviceId={props.serviceId}
                    onRemove={removeBooking}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </span>
          );
        })}
      </List>
    </Card>
  );
}
MyBookings.propTypes = {
  serviceId: PropTypes.string.isRequired,
};


