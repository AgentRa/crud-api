import { HttpMethod } from "./models";
import { parse } from "./utils/parse";
import { getUsers, getUser, postUser, putUser } from "./service";
import { IncomingMessage } from "node:http";
const router = async (request: IncomingMessage) => {
  const { url, method } = request;
  try {
    const id: string | null = parse(url);
    switch (method) {
      case HttpMethod.GET:
        return id ? await getUser(id) : await getUsers();
      case HttpMethod.POST:
        if (id) throw new Error("400: userId is invalid");
        request.on("data", (data) => {
          return postUser(JSON.parse(data));
        });
        break;
      case HttpMethod.PUT:
        request.on("data", (data) => {
          return putUser(JSON.parse(data), id);
        });
        break;
      case HttpMethod.DELETE:
        id ? console.log("DELETE", id) : console.log("DELETE");
        break;
    }
  } catch (error) {
    const [code, message] = error.message.split(":");
    console.error(code);
    console.error(message);
  }
};

export { router };
