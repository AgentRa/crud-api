import { readFile, writeFile } from "node:fs/promises";
import { v5 as uuid } from "uuid";
import { User } from "./models";
const getUsers = async () => {
  const users = await readFile("./src/data/users.json", "utf-8");
  const result = JSON.parse(users);
  return [result, "200"];
};

const getUser = async (id: string) => {
  const [users] = await getUsers();
  const result = users.find((user: any) => user.id === id);
  if (!result) throw new Error("404: Not Found");
  return [result, "200"];
};

const postUser = async (data: unknown) => {
  const userData = data as User;
  if (
    typeof userData.username === "string" &&
    typeof userData.age === "number" &&
    userData.hobbies instanceof Array
  ) {
    userData.id = uuid(userData.username, uuid.DNS);
    const users = JSON.parse(await readFile("./src/data/users.json", "utf-8"));
    users.push(userData);
    await writeFile("./src/data/users.json", JSON.stringify(users, null, 2));
    return [userData, "201"];
  }

  throw new Error("400: invalid input");
};

const putUser = async (data: unknown, id: string) => {
  const [user] = await getUser(id);
  if (!user) throw new Error("404: bot Found");
  if (user.id === id) {
    const userData = data as User;
    if (
      typeof userData.username === "string" ||
      typeof userData.age === "number" ||
      userData.hobbies instanceof Array
    ) {
      const [users] = await getUsers();
      const index = users.findIndex((user: any) => user.id === id);
      users[index] = { ...users[index], ...userData };
      await writeFile("./src/data/users.json", JSON.stringify(users, null, 2));
      return [userData, "200"];
    }
  }
};

const deleteUser = async (id: string) => {
  const [user] = await getUser(id);
  if (!user) throw new Error("404: Not Found");
  if (user.id === id) {
    const [users] = await getUsers();
    const index = users.findIndex((user: any) => user.id === id);
    if (index === -1) throw new Error("404: Not Found");
    users.splice(index, 1);
    await writeFile("./src/data/users.json", JSON.stringify(users, null, 2));
  }
  return ["", "200"];
};

export { getUsers, getUser, postUser, putUser, deleteUser };
