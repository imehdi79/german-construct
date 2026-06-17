import { redirect } from "next/navigation";

const NotFound = () => {
  redirect("/");
  return <div>not found</div>;
};

export default NotFound;
