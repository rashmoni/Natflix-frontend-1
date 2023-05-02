// Fake data (replace this with a real fetch)
import fakeFetch from "scripts/fakeFetch";

// Node modules
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Project files
import FormCreate from "components/FormCreate";
import Item from "components/ItemAdminMedia";
import NavigationBarAdmin from "components/NavigationBarAdmin";
import StatusEmpty from "components/StatusEmpty";
import StatusError from "components/StatusError";
import StatusLoading from "components/StatusLoading";
import Fields from "data/fields-content.json";
import eStatus from "types/eStatus";
import iMedia from "types/iMedia";
import { useModal } from "state/ModalContext";

export default function AdminContent() {
  // Global state
  const { code } = useParams();
  const { setModal } = useModal();

  // Local state
  const [status, setStatus] = useState(eStatus.LOADING);
  const [data, setData] = useState(new Array<iMedia>());

  // Properties
  const endPoint: string = "content/";

  // Methods
  useEffect(() => {
    fakeFetch(endPoint + code + "/")
      .then((response) => onSuccess(response.data))
      .catch((error) => onFailure(error));
  }, [code]);

  function onSuccess(data: iMedia[]) {
    setData(data);
    setStatus(eStatus.READY);
  }

  function onFailure(error: string) {
    console.error(error);
    setStatus(eStatus.ERROR);
  }

  // Components
  const ModalCreate = <FormCreate fields={Fields} endPoint={endPoint} />;
  const Items = data.map((item, index) => (
    <Item key={item.id} index={index} item={item} />
  ));

  // Safeguards
  if (status === eStatus.LOADING) return <StatusLoading />;
  if (status === eStatus.ERROR) return <StatusError />;

  return (
    <div className="admin-pages">
      <NavigationBarAdmin />
      <header>
        <h1>Admin content</h1>
      </header>
      {data.length === 0 ? <StatusEmpty /> : Items}
      <hr />
      <button onClick={() => setModal(ModalCreate)}>Create content</button>
    </div>
  );
}
