import React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="space-y-7">{children}</main>
    </>
  );
};

export default PageWrapper;
