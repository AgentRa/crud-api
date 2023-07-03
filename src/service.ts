import { readFile, writeFile } from "node:fs/promises";
import { v5 as uuidv5 } from "uuid";
import { User } from "./models";
const getUsers = async () => {
  const users = await readFile("./src/data/users.json", "utf-8");
  return JSON.parse(users);
};

const getUser = async (id: string) => {
  const users = await getUsers();
  return users.find((user: any) => user.id === id);
};

const postUser = async (data: unknown) => {
  const userData = data as User;
  if (
    typeof userData.username === "string" &&
    typeof userData.age === "number" &&
    userData.hobbies instanceof Array
  ) {
    userData.id = uuidv5(userData.username, uuidv5.DNS);
    const users = await getUsers();
    users.push(userData);
    await writeFile("./src/data/users.json", JSON.stringify(users, null, 2));
    return userData;
  }

  throw new Error("400: Bad Request");
};

export { getUsers, getUser, postUser };
