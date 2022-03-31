import { builder, Handler } from "@netlify/functions";

const myHandler: Handler = async (event, context) => {
  // logic to generate the required content
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: `
    <!DOCTYPE html>
      <html>
        <body>
          Hello World
        </body>
    </html>
    `,
  };
};

const handler = builder(myHandler);

export { handler };
