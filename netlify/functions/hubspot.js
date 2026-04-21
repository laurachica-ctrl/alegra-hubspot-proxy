const https = require("https");

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Path",
      },
      body: "",
    };
  }

  const authHeader = event.headers["authorization"] || "";
  const token = authHeader.replace("Bearer ", "").trim();
  const customPath = event.headers["x-path"] || "/marketing/v3/emails";
  const method = event.httpMethod;
  const body = event.body || "";

  return new Promise((resolve) => {
    const options = {
      hostname: "api.hubapi.com",
      path: customPath,
      method: method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.headers["Content-Length"] = Buffer.byteLength(body);
    }
