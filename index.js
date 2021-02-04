const { app, port } = require("./admin/serversetup");

const {addPoints} = require("./routes/routes");

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});

//Routes
app.post("/addPoints", addPoints);