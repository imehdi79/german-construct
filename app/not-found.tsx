import { redirect } from "next/navigation";
import React from "react";

const NotFound = () => {
  redirect("/");
  return <div>not found</div>;
};

export default NotFound;
