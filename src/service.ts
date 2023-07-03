import { readFile, writeFile } from "node:fs/promises";
import { v5 as uuid } from "uuid";
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
    userData.id = uuid(userData.username, uuid.DNS);
    const users = await getUsers();
    users.push(userData);
    await writeFile("./src/data/users.json", JSON.stringify(users, null, 2));
    return userData;
  }

  throw new Error("400: userId is invalid");
};

const putUser = async (data: unknown, id: string) => {
  if (!id) throw new Error("400: userId is invalid");
  const user = await getUser(id);
  if (!user) throw new Error("404: Not Found");
  if (user.id === id) {
    const userData = data as User;
    if (
      typeof userData.username === "string" ||
      typeof userData.age === "number" ||
      userData.hobbies instanceof Array
    ) {
      const users = await getUsers();
      const index = users.findIndex((user: any) => user.id === id);
      users[index] = { ...users[index], ...userData };
      console.log(users);
      console.log(users[index]);
      await writeFile("./src/data/users.json", JSON.stringify(users, null, 2));
      return userData;
    }
  }
};

const deleteUser = async (id: string) => {
  if (!id) throw new Error("400: userId is invalid");
  const user = await getUser(id);
  if (!user) throw new Error("404: Not Found");
  if (user.id === id) {
    const users = await getUsers();
    const index = users.findIndex((user: any) => user.id === id);
    if (index === -1) throw new Error("404: Not Found");
    users.splice(index, 1);
    await writeFile("./src/data/users.json", JSON.stringify(users, null, 2));
  }
};

export { getUsers, getUser, postUser, putUser, deleteUser };
