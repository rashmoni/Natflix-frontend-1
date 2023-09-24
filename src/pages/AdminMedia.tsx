// Fake data (replace this with a real fetch)
//import fakeFetch from "scripts/fakeFetch";
import { useUser } from "state/UserContext";

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
import FieldsDocumentaries from "data/fields-documentaries.json";
import FieldsMovies from "data/fields-movies.json";
import FieldsTVSeries from "data/fields-tv-series.json";
import eStatus from "types/eStatus";
import iMedia from "types/iMedia";
import { useModal } from "state/ModalContext";

export default function AdminMedia() {
  // Global state
  const { code } = useParams();
  const { setModal } = useModal();

  const { token } = useUser();

  // Local state
  const [status, setStatus] = useState(eStatus.LOADING);
  const [data, setData] = useState(new Array<iMedia>());

  // Properties
  //const endPoint: string = "media/";

  const endPoint = "http://20.240.55.130:9090/api/v1/";
  const fields = chooseFields(code);

     const METHOD = "GET";
     const HEADERS = {
       "Content-type": "application/json; charset=UTF-8",
       Authorization: "Bearer " + token,
    
     };

  // Methods
  useEffect(() => {
    fetch(endPoint+code+"/",{
      method: METHOD,
      headers: HEADERS,})
      .then ((response) => response.json())
      .then((result) => onSuccess(result))
      .catch((error) => onFailure(error));
      console.log(data);
      console.log(endPoint+code);
  }, [code]);


  function onSuccess(data: iMedia[]) {
    setData(data);
    console.log(data);
    setStatus(eStatus.READY);
  }

  function onFailure(error: string) {
    console.error(error);
    setStatus(eStatus.ERROR);
  }

  function chooseFields(code: string | undefined) {
    switch (code) {
      case "tv-series":
        return FieldsTVSeries;
      case "documentaries":
        return FieldsDocumentaries;
      case "movie":
        return FieldsMovies;
      default:
        throw new Error(`Invalid code: ${code}`);
    }
  }

  // Components
  const Create = <FormCreate fields={fields} endPoint={endPoint+code+"/"} />;
  const Items = data.map((item) => (
    <Item key={item.id} item={item} endPoint={endPoint+code+"/"} fields={fields} />
  ));

  // Safeguards
  if (status === eStatus.LOADING) return <StatusLoading />;
  if (status === eStatus.ERROR) return <StatusError />;

  return (
    <div className="admin-pages">
      <NavigationBarAdmin />
      <h1>Edit {code}</h1>
      {data.length === 0 ? <StatusEmpty /> : Items}
      <hr />
      <button className="primary" onClick={() => setModal(Create)}>
        Create content
      </button>
    </div>
  );
}
