import User from "../models/user.model.js";

export async function createUser({ firstName, lastName, email, password }) {
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = await User.create({
    fullName: { firstName, lastName },
    email,
    password,
  });
  return user;
}
