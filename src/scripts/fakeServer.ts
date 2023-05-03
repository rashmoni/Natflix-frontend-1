// Fake data
import Media from "./fake-data/media.json";
import Documentaries from "./fake-data/documentaries.json";
import Movies from "./fake-data/movies.json";
import Series from "./fake-data/tv-series.json";
import SingleDocumentary from "./fake-data/single-documentary.json";
import SingleMovie from "./fake-data/single-movie.json";
import SingleSerie from "./fake-data/single-tv-series.json";

// Project files
import eMediaType from "types/eMediaType";
import iMedia from "types/iMedia";
import iDetailsOther from "types/iDetailsOther";
import iDetailsSeries from "types/iDetailsSeries";

export default function fakeServer(endPoint: string, data: any = null): any {
  switch (endPoint) {
    // Media
    case "media/":
      return Media;
    case "media/create/":
      return mediaCreate(data);
    case "media/delete/":
      return mediaDelete(data);
    case "media/update/":
      return mediaUpdate(data);

    // Media filtered
    case "media/tv-series/":
      return Series;
    case "media/movies/":
      return Movies;
    case "media/documentaries/":
      return Documentaries;

    // Movies
    case "movies/:id/":
      return detailsOther(data);
    case "movies/:id/update/":
      return detailsOtherUpdate(data);

    // Documentaries
    case "documentaries/:id/":
      return detailsOther(data);
    case "documentaries/:id/update/":
      return detailsOtherUpdate(data);

    // TV Series
    case "tv-series/:id/":
      return detailsSeries(data);
    case "tv-series/:id/create/":
      return detailsSeriesCreate(data);
    case "tv-series/:id/update/":
      return detailsSeriesUpdate(data);
    case "tv-series/:id/delete/":
      return detailsSeriesDelete(data);

    // Exception
    default:
      throw new Error(`invalid endpoint ${endPoint}`);
  }
}

// Media
function mediaCreate(item: iMedia): string {
  return `Created new media ${item.title}`;
}

function mediaUpdate(item: iMedia): string {
  return `Updated media ${item.title}`;
}

function mediaDelete(id: number): string {
  return `Deleted media with id ${id}`;
}

// Details other
function detailsOther(id: number): iDetailsOther {
  const media = Media.filter((item) => item.id === Number(id))[0];

  switch (media.media_type_id) {
    case eMediaType.MOVIES:
      return SingleMovie;
    case eMediaType.DOCUMENTARIES:
      return SingleDocumentary;
    default:
      throw new Error(`Invalid type id ${id}`);
  }
}

function detailsOtherUpdate(item: iDetailsOther): string {
  return `Update media details id ${item.id}`;
}

// Details tv-series
function detailsSeries(id: number): iDetailsSeries[] {
  const media = Media.filter((item) => item.id === Number(id))[0];

  switch (media.media_type_id) {
    case eMediaType.SERIES:
      return SingleSerie;
    default:
      throw new Error(`Invalid type id ${id}`);
  }
}

function detailsSeriesCreate(item: iDetailsSeries) {
  return `Created new episode ${item.title}`;
}

function detailsSeriesUpdate(item: iDetailsSeries) {
  return `Update episode ${item.title}`;
}

function detailsSeriesDelete(id: number) {
  return `Deleted episode with id ${id}`;
}
