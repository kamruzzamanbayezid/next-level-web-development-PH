import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log(`Server is running..`);
  }
);

server.listen(5000, () => {
  console.log(`Server is running on 5000 port`);
});
