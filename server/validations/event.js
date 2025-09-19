function validateEventCreation(data) {
  const errors = {};

  if (
    !data.name ||
    typeof data.name !== "string" ||
    data.name.trim().length < 3
  ) {
    errors.name = "Event name must be at least 3 characters long";
  }

  if (
    !data.description ||
    typeof data.description !== "string" ||
    data.description.trim().length < 20
  ) {
    errors.description = "Description must be at least 20 characters long";
  }

  if (!data.date || isNaN(Date.parse(data.date))) {
    errors.date = "A valid date is required (ISO format)";
  }

  if (
    !data.time ||
    typeof data.time !== "string" ||
    !/^([0-1][0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/i.test(data.time.trim())
  ) {
    errors.time = "Time is required in hh:mm AM/PM format";
  }

  if (
    data.price === undefined ||
    typeof data.price !== "number" ||
    data.price < 0
  ) {
    errors.price = "Price must be a non-negative number";
  }

  if (
    data.totalSeats === undefined ||
    typeof data.totalSeats !== "number" ||
    data.totalSeats < 1
  ) {
    errors.totalSeats = "Total seats must be at least 1";
  }

  if (
    data.availableSeats === undefined ||
    typeof data.availableSeats !== "number" ||
    data.availableSeats < 0
  ) {
    errors.availableSeats = "Available seats must be a non-negative number";
  }

  if (
    !data.location ||
    typeof data.location !== "string" ||
    data.location.trim().length === 0
  ) {
    errors.location = "Location is required";
  }

  if (!data.organizer || typeof data.organizer !== "object") {
    errors.organizer = "Organizer details are required";
  } else {
    if (
      !data.organizer.name ||
      typeof data.organizer.name !== "string" ||
      data.organizer.name.trim().length === 0
    ) {
      errors["organizer.name"] = "Organizer name is required";
    }
    if (
      !data.organizer.email ||
      typeof data.organizer.email !== "string" ||
      !/^([\w-]+(?:\.[\w-]+)*)@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
        data.organizer.email.trim()
      )
    ) {
      errors["organizer.email"] = "A valid organizer email is required";
    }
    if (
      !data.organizer.phone ||
      typeof data.organizer.phone !== "string" ||
      !/^[0-9\-\+]{9,15}$/.test(data.organizer.phone.trim())
    ) {
      errors["organizer.phone"] = "A valid organizer phone number is required";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

function validateEventUpdate(data) {
  const errors = {};

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.trim().length < 3) {
      errors.name = "Event name must be at least 3 characters long";
    }
  }
  if (data.description !== undefined) {
    if (
      typeof data.description !== "string" ||
      data.description.trim().length < 20
    ) {
      errors.description = "Description must be at least 20 characters long";
    }
  }
  if (data.date !== undefined) {
    if (isNaN(Date.parse(data.date))) {
      errors.date = "A valid date is required (ISO format)";
    }
  }
  if (data.time !== undefined) {
    if (
      typeof data.time !== "string" ||
      !/^([0-1][0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/i.test(data.time.trim())
    ) {
      errors.time = "Time must be in hh:mm AM/PM format";
    }
  }
  if (data.price !== undefined) {
    if (typeof data.price !== "number" || data.price < 0) {
      errors.price = "Price must be a non-negative number";
    }
  }
  if (data.totalSeats !== undefined) {
    if (typeof data.totalSeats !== "number" || data.totalSeats < 1) {
      errors.totalSeats = "Total seats must be at least 1";
    }
  }
  if (data.availableSeats !== undefined) {
    if (typeof data.availableSeats !== "number" || data.availableSeats < 0) {
      errors.availableSeats = "Available seats must be a non-negative number";
    }
  }

  if (data.isFeatured !== undefined) {
    if (typeof data.isFeatured !== "boolean") {
      errors.isFeatured = "isFeatured must be a boolean value";
    }
  }
  if (data.location !== undefined) {
    if (
      typeof data.location !== "string" ||
      data.location.trim().length === 0
    ) {
      errors.location = "Location is required";
    }
  }
  if (data.organizer !== undefined) {
    if (typeof data.organizer !== "object") {
      errors.organizer = "Organizer must be an object";
    } else {
      if (
        data.organizer.name !== undefined &&
        (typeof data.organizer.name !== "string" ||
          data.organizer.name.trim().length === 0)
      ) {
        errors["organizer.name"] = "Organizer name is required";
      }
      if (
        data.organizer.email !== undefined &&
        (typeof data.organizer.email !== "string" ||
          !/^([\w-]+(?:\.[\w-]+)*)@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
            data.organizer.email.trim()
          ))
      ) {
        errors["organizer.email"] = "A valid organizer email is required";
      }
      if (
        data.organizer.phone !== undefined &&
        (typeof data.organizer.phone !== "string" ||
          !/^[0-9\-\+]{9,15}$/.test(data.organizer.phone.trim()))
      ) {
        errors["organizer.phone"] =
          "A valid organizer phone number is required";
      }
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

function extractEventCreationFields(data) {
  return {
    name: data.name,
    description: data.description,
    date: data.date,
    time: data.time,
    price: data.price,
    totalSeats: data.totalSeats,
    availableSeats: data.availableSeats,
    location: data.location,
    organizer: data.organizer,
  };
}

function extractEventUpdateFields(data) {
  const allowedFields = [
    "name",
    "description",
    "date",
    "time",
    "price",
    "totalSeats",
    "availableSeats",
    "location",
    "organizer",
  ];
  const updateData = {};
  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });
  return updateData;
}

module.exports = {
  validateEventCreation,
  validateEventUpdate,
  extractEventCreationFields,
  extractEventUpdateFields,
};
