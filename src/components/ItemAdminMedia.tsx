// Node modules
import { Link } from "react-router-dom";

// Project files
import iMedia from "types/iMedia";
import eMediaType from "types/eMediaType";
import Placeholder from "assets/images/placeholders/card-basic.png";
import { useModal } from "state/ModalContext";

interface iProps {
  index: number;
  item: iMedia;
}

export default function ItemAdminMedia({ index, item }: iProps) {
  const { id, type_id, title, thumbnail_url } = item;

  // Global
  const { setModal } = useModal();

  // Properties
  const Image = thumbnail_url === "" ? Placeholder : thumbnail_url;

  // Components
  const ModalUpdate = <>update {title}</>;
  const ModaDelete = <>delete {title}</>;
  const TVSeriesEpisodes = <Link to={"/admin/tv-series/" + id} />;

  return (
    <article className="item-admin">
      <span className="number">{index + 1}</span>
      <img src={Image} />
      <h3>{title}</h3>
      <div className="buttons">
        <button onClick={() => setModal(ModalUpdate)}>Update</button>
        <button onClick={() => setModal(ModaDelete)}>Delete</button>
        {type_id === eMediaType.SERIES && TVSeriesEpisodes}
      </div>
    </article>
  );
}
