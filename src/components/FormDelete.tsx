// MPM packages
import { FormEvent } from "react";

// Project files
import { useModal } from "state/ModalContext";
import fakeFetch from "scripts/fakeFetch";

interface iProps {
  endPoint: string;
  id: number;
}

export default function FormDelete({ endPoint, id }: iProps) {
  // Global state
  const { setModal } = useModal();

    //Properties
    const METHOD = "DELETE"
    const HEADERS = { "Content-type": "application/json; charset=UTF-8"};

  // Methods
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(endPoint + "delete/"+id,{
      method: METHOD,
      headers: HEADERS})
      .then(onSuccess)
      .catch((error) => onFailure(error));
      console.log(endPoint);
      console.log(id);
  }

  /*
 fetch(endPoint + "movies/create", {
      method: METHOD,
      headers: HEADERS,
      body: JSON.stringify(form),})
      .then(onSuccess)
      .catch((error) => onFailure(error));
      console.log(endPoint);
      console.log(form);
  }

  */

  function onSuccess() {
    alert("Item deleted!");
    setModal(null);
  }

  function onFailure(error: string) {
    console.error(error);
    alert("Could not delete item");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Delete information</h2>
      <p>
        Are you sure that you want to delete this item? This action cannot be
        reverted.
      </p>
      <hr />
      <button>Delete</button>
      <button onClick={() => setModal(null)}>Keep</button>
    </form>
  );
}
