export function errorHandler(err) {
  if (typeof err === "string") {
    const is404 = err.toLowerCase().endsWith("not found");
    return new Response(err, { status: is404 ? 404 : 400 });
  } else if (err.name === "UnauthorizedError") {
    return new Response("Invalid Token", { status: 401 });
  }
  return new Response(err.message, { status: 500 });
}
