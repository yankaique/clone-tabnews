function status (request, response) {
  response.status(200).json({
    "name": "Oi Yanzito"
  });
}

export default status;