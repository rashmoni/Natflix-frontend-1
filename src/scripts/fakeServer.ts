// Fake data
import Content from "./fake-data/content.json";
import Documentaries from "./fake-data/documentaries.json";
import Movies from "./fake-data/movies.json";
import Series from "./fake-data/tv-series.json";
import SingleDocumentary from "./fake-data/singleDocumentary.json";
import SingleMovie from "./fake-data/singleMovie.json";
import SingleSerie from "./fake-data/singleTVSerie.json";

// Project files
import eMediaType from "types/eMediaType";
import iMedia from "types/iMedia";
import iDetailsOther from "types/iDetailsOther";
import iDetailsSeries from "types/iDetailsSeries";

export default function fakeServer(endPoint: string, data: any = null): any {
  switch (endPoint) {
    // Media
    case "media/":
      return Content;
    case "media/create/":
      return contentCreate(data);
    case "media/delete/":
      return contentDelete(data);
    case "media/update/":
      return contentUpdate(data);

    // Content filtered
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

// Content
function contentCreate(item: iMedia): string {
  return `Created new content ${item.title}`;
}

function contentUpdate(item: iMedia): string {
  return `Updated content ${item.title}`;
}

function contentDelete(id: number): string {
  return `Deleted content with id ${id}`;
}

// Details other
function detailsOther(id: number): iDetailsOther {
  const content = Content.filter((item) => item.id === Number(id))[0];

  switch (content.type_id) {
    case eMediaType.MOVIES:
      return SingleMovie;
    case eMediaType.DOCUMENTARIES:
      return SingleDocumentary;
    default:
      throw new Error(`Invalid type id ${id}`);
  }
}

function detailsOtherUpdate(item: iDetailsOther): string {
  return `Update content details id ${item.id}`;
}

// Details tv-series
function detailsSeries(id: number): iDetailsSeries[] {
  const content = Content.filter((item) => item.id === Number(id))[0];

  switch (content.type_id) {
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
