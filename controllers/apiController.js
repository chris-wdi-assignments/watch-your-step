const index = function (req, res) {
  res.json({
    message: "Welcome to the Watch Your Step API",
    documentation_url: "",
    base_url: "fill this in once deployed!",
    endpoints: [
      {
        method: "GET", path: "/api", description: "Describes all available endpoints."
      }
    ]
  });
}
