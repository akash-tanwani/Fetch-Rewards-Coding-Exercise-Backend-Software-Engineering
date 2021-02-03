const { app, port } = require("./admin/serversetup");

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});

