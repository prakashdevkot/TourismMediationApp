const create = async (params, credentials, product) => {
    try {
      let response = await fetch("/api/bookings/by/" + params.serviceId, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: booking,
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const read = async (params, signal) => {
    try {
      let response = await fetch("/api/bookings/" + params.bookingId, {
        method: "GET",
        signal: signal,
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const update = async (params, credentials, booking) => {
    try {
      let response = await fetch(
        "/api/product/" + params.bookingId + "/" + params.bookingId,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + credentials.t,
          },
          body: booking,
        }
      );
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const remove = async (params, credentials) => {
    try {
      let response = await fetch(
        "/api/booking/" + params.serviceId + "/" + params.bookingId,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + credentials.t,
          },
        }
      );
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const listByService = async (params, signal) => {
    try {
      let response = await fetch("/api/bookings/by/" + params.serviceId, {
        method: "GET",
        signal: signal,
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const listLatest = async (signal) => {
    try {
      let response = await fetch("/api/bookings/latest", {
        method: "GET",
        signal: signal,
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const listRelated = async (params, signal) => {
    try {
      let response = await fetch("/api/bookings/related/" + params.bookingId, {
        method: "GET",
        signal: signal,
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const listCategories = async (signal) => {
    try {
      let response = await fetch("/api/bookings/categories", {
        method: "GET",
        signal: signal,
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const list = async (params, signal) => {
    const query = queryString.stringify(params);
    try {
      let response = await fetch("/api/bookings?" + query, {
        method: "GET",
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  export {
    create,
    read,
    update,
    remove,
    listByService,
    listLatest,
    listRelated,
    listCategories,
    list,
  };
  
  
  