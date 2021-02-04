const { app, port } = require("./admin/serversetup");

const {addPoints, pointBalance} = require("./routes/routes");

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});

//Routes
app.post("/addPoints", addPoints);
app.get("/pointBalance/:user", pointBalance);