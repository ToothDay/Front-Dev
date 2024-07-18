"use client";

import Error from "@/components/error/Error";

const GlobalError = () => {
  return (
    <html>
      <body>
        <Error errorType={"client"} />
      </body>
    </html>
  );
};

export default GlobalError;
