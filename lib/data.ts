import { User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async () => {
  try {
    connectToDB();
    const users = await User.find();
    return users;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch the users");
  }
};
