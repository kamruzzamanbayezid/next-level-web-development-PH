import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is Running...");

    if (req.url == "/" && req.method == "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Hello from node js with TS",
          path: req.url,
        })
      );
    }

    if (req.url == "/api" && req.method == "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Server health",
          path: req.url,
        })
      );
    }

    if (req.url == "/api/users" && req.method == "POST") {
      // const user = {
      //   id: 1,
      //   name: "Bayezid",
      // };
      // res.writeHead(200, { "content-type": "application/json" });
      // res.end(JSON.stringify(user));

      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const parseBody = JSON.parse(body);
          console.log(parseBody);
          console.log(body);

          res.end(JSON.stringify(parseBody));
        } catch (error: any) {
          console.log(error?.message);
        }
      });
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server is running port ${config.port}`);
});
