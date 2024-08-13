import { useParams } from "@remix-run/react";

export default
function DocBook() {
  const { id } = useParams();

  return <div>Book {id}</div>;
}
