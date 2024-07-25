import React from "react";

const Box = ({ children }) => {
  return (
    <section className="bg-white min-h-screen max-container padding-x py-12">
      {children}
    </section>
  );
};

export default Box;
