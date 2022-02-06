type RequestData = {
  method: string;
  url: string;
  query: string;
  body: string;
  statusCode: string;
  duration: string;
};

function getRequestLoggingMessage(requestData: RequestData): string {
  return JSON.stringify(requestData, null, 2);
}

export { getRequestLoggingMessage };
