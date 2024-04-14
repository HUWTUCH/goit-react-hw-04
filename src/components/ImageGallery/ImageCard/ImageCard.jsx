import css from "./imageCard.module.css"
const ImageCard = ({data, openModal}) => {
    return (
        <div>
            <img
                src={data.urls.small}
                alt={data.alt_description}
                className={css.img}
                onClick={()=>openModal(data)}
            />
            <p>{data.likes}</p>
        </div>
    )
}
export default ImageCard;