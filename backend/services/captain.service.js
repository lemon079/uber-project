import Captain from "../models/captain.model.js";

export async function createCaptain({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) {

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }
  const captain = await Captain.create({
    fullName: { firstName, lastName },
    email,
    password,
    vehicle: {
      plate,
      vehicleType,
      capacity,
      color,
    },
  });

  return captain;
}
