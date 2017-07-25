const index = function (req, res) {
  res.json({
    message: "Welcome to the Watch Your Step API",
    documentation_url: "",
    base_url: "fill this in once deployed!",
    endpoints: [
      {
        method: "GET", path: "/api", description: "Describes all available endpoints."
      },
      {
        method: "GET", path: "/api/incidents", description: "Show all incidents in database."
      },
      {
        method: "GET", path: "/api/incidents/:incident_id", description: "Show a particular incident."
      },
      {
        method: "POST", path: "/api/incidents", description: "Create a new incident."
      },
      {
        method: "PUT", path: "/api/incidents/:incident_id", description: "Update an incident."
      },
      {
        method: "DELETE", path: "/api/incidents/:incident_id", description: "Destroy an incident."
      }
    ]
  });
}
