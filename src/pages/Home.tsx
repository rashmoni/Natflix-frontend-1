// Fake data (replace this with a real fetch)
//import fakeFetch from "scripts/fakeFetch";
import { useUser } from "state/UserContext";

// Node modules
import { useEffect, useState } from "react";


// Project files
import HeroHome from "components/HeroHome";
import ContainerCards from "components/ListCards";
import NavigationBar from "components/NavigationBar";
import StatusEmpty from "components/StatusEmpty";
import StatusError from "components/StatusError";
import StatusLoading from "components/StatusLoading";
import eStatus from "types/eStatus";
import iMedia from "types/iMedia";

export default function Home() {
  // Local state
  const [status, setStatus] = useState(eStatus.LOADING);
  const [data, setData] = useState(new Array<iMedia>());


  const { token } = useUser();

  // Properties
  const endPoint = "http://195.128.241.43:9090/api/v1/media/";
  const tvSeries = data.filter((item) => item.media_type_id === 1);
  const movies = data.filter((item) => item.media_type_id === 2);
  const documentaries = data.filter((item) => item.media_type_id === 3);
  const firstItemToShow = tvSeries[0];

   //Properties
   const METHOD = "GET";
   const HEADERS = {
     "Content-type": "application/json; charset=UTF-8",
     Authorization: "Bearer " + token,
  
   };

  // Methods
  useEffect(() => {

    fetch(endPoint,{
      method: METHOD,
      headers: HEADERS,})
      .then ((response) => response.json())
      .then((result) => onSuccess(result))
      .catch((error) => onFailure(error));
      console.log(HEADERS);
  }, []);

  function onSuccess(data: iMedia[]) {
    setData(data);
    setStatus(eStatus.READY);
  }

  function onFailure(error: string) {
    console.error(error);
    setStatus(eStatus.ERROR);
  }

  // Safeguards
  if (status === eStatus.LOADING) return <StatusLoading />;
  if (status === eStatus.ERROR) return <StatusError />;
  if (data.length === 0) return <StatusEmpty />;

  return (
    <div id="home">
      <NavigationBar />
      <HeroHome item={firstItemToShow} />
      <ContainerCards title="Series" data={tvSeries} />
      <ContainerCards title="Movies" data={movies} />
      <ContainerCards title="Documentaries" data={documentaries} />
    </div>
  );
}
