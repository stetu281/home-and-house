const { createLocalServer } = require("./server");

const server = createLocalServer();

server.listen({ port: 8000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});