const WebSocketServer = require("ws");
const fs = require("fs");

// подключённые клиенты
const clients = {};

// WebSocket-сервер на порту 8081
const wsServer = new WebSocketServer.Server({
  port: 8081,
});

wsServer.on("connection", function (ws) {
  const id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on("message", function (message) {
    try {
      const data = JSON.parse(message);
      if (data.name !== null) {
        fs.open(`./Tables/${data.name}.txt`, "w+", (err, fd) => {
          if (err) {
            console.error(err);
            return;
          }
        });
        let text = data.table.map((el) => el.join("/"));
        text = text.join("\n");
        fs.writeFile(`./Tables/${data.name}.txt`, text, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //файл записан успешно
        });
        for (let key in clients) {
          clients[key].send(`Table saved with name ${data.name}`);
        }
      } else {
        for (let key in clients) {
          clients[key].send("File was not saved");
        }
      }
    } catch (error) {
      if (message === "get list of tables") {
        fs.readdir("./Tables", function (err, items) {
          for (let key in clients) {
            clients[key].send(
              JSON.stringify({
                files: items,
              })
            );
          }
        });
      } else {
        fs.readFile(`./Tables/${message}`, 'utf8', (err, data) => {
          if (err) {
            console.error(err)
            return
          }
          let text = data.split('\n');
          text = text.map((el)=> el.split('/'));
          const array = JSON.stringify({
            arr: text,
          });
          for (let key in clients) {
            clients[key].send(array);
          }
        })
      }
    }
  });

  ws.on("close", function () {
    console.log("соединение закрыто " + id);
    delete clients[id];
  });
});
