import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import auth from "../lib/auth-helper.js";
import { remove } from "./api-booking.js";

export default function DeleteBooking(props) {
  const [open, setOpen] = useState(false);

  const jwt = auth.isAuthenticated();
  const clickButton = () => {
    setOpen(true);
  };
  const deleteBooking = () => {
    remove(
      {
        serviceId: props.serviceId,
        bookingId: props.booking._id,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOpen(false);
        props.onRemove(props.booking);
      }
    });
  };
  const handleRequestClose = () => {
    setOpen(false);
  };
  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete " + props.booking.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your booking {props.booking.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteBooking}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
DeleteBooking.propTypes = {
  serviceId: PropTypes.string.isRequired,
  booking: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};


