import { createServer } from "node:http";
import { router } from "./router";

const server = createServer(async (request, response) => {
  const result = await router(request);
  console.log(result);
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(result, null, 2));
});

const LOCALHOST: string = "localhost";
const PORT: number = 4000;

server.listen(PORT, LOCALHOST, () => {
  console.log(`listening port ${PORT}`);
});
