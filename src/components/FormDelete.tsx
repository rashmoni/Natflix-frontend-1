// MPM packages
import { FormEvent, useState } from "react";

// Project files
import ListInput from "components/ListInput";
import { useModal } from "state/ModalContext";
import { useUser } from "state/UserContext";

interface iProps {
  endPoint: string;
  id: number;
}

export default function FormDelete({ endPoint, id }: iProps) {
  // Global state
  const { setModal } = useModal();
  const { token } = useUser();
  const { setToken, setUser } = useUser();

    // Local state
    const [form, setForm] = useState({});

    //Properties
  //Properties
  const METHOD = "DELETE";
  const HEADERS = {
    "Content-type": "application/json; charset=UTF-8",
    Authorization: "Bearer " + token,
  };

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
