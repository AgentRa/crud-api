import { createServer } from "node:http";
import { parse } from "./utils/parse";
import { HttpMethod } from "./models";
import { deleteUser, getUser, getUsers, postUser, putUser } from "./service";

const server = createServer(async (request, response) => {
  const { url, method } = request;
  let result, code;
  try {
    const id: string | null = parse(url);
    switch (method) {
      case HttpMethod.GET:
        [result, code] = id ? await getUser(id) : await getUsers();
        response.writeHead(code, { "Content-Type": "application/json" });
        response.end(JSON.stringify(result, null, 2));
        break;
      case HttpMethod.POST:
        request.on("data", async (data) => {
          [result, code] = await postUser(JSON.parse(data));
          response.writeHead(code, { "Content-Type": "application/json" });
          response.end(JSON.stringify(result, null, 2));
        });
        break;
      case HttpMethod.PUT:
        request.on("data", async (data) => {
          [result, code] = await putUser(JSON.parse(data), id);
          response.writeHead(code, { "Content-Type": "application/json" });
          response.end(JSON.stringify(result, null, 2));
        });
        break;
      case HttpMethod.DELETE:
        return deleteUser(id);
    }
  } catch (error) {
    const [statusCode, message] = error.message.split(":");
    response.writeHead(+statusCode, { "Content-Type": "text/plain" });
    response.end(message);
  }
});

const LOCALHOST: string = "localhost";
const PORT: number = 4000;

server.listen(PORT, LOCALHOST, () => {
  console.log(`listening port ${PORT}`);
});
