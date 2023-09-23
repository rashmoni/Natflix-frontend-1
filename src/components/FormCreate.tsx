// MPM packages
import { FormEvent, useState } from "react";

// Project files
import ListInput from "components/ListInput";
import { useModal } from "state/ModalContext";
import { useUser } from "state/UserContext";

interface iProps {
  endPoint: string;
  fields: Array<any>;
}

export default function FormCreate({ endPoint, fields }: iProps) {
  // Global state
  const { setModal } = useModal();
  const { token } = useUser();

  // Local state
  const [form, setForm] = useState({});

  //Properties
  const METHOD = "POST";
  const HEADERS = {
    "Content-type": "application/json; charset=UTF-8",
    Authorization: "Bearer " + token,
  };

  // Methods

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    fetch(endPoint + "create", {
      method: METHOD,
      headers: HEADERS,
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then(onSuccess)
      .catch((error) => onFailure(error));
    console.log(endPoint);
    console.log(form);
  }

  function onSuccess() {
    alert("Item created!");
    setModal(null);
  }

  function onFailure(error: string) {
    console.error(error);
    alert("Could not create item");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Add information</h2>
      <ListInput fields={fields} state={[form, setForm]} />
      <hr />
      <button>Create</button>
      <button onClick={() => setModal(null)}>Cancel</button>
    </form>
  );
}
