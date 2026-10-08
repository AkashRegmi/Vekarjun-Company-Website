export function notFound(_request, response) {
  return response.status(404).json({ error: 'API route not found.' });
}

export function errorHandler(error, _request, response, _next) {
  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({ error: 'Request body must contain valid JSON.' });
  }
  console.error('API request failed:', error);
  return response.status(500).json({ error: 'The request could not be completed.' });
}
