import ImageCard from "../ImageCard/ImageCard.jsx";
import css from './imageGallery.module.css'

const ImageGallery = ({data, openModal}) => {
    return (
        <ul className={css.listImage}>
            {
                data.map((photo, index) => (
                    <li key={`${photo.id}-${index}`} className={css.item}>
                        <ImageCard data={photo} openModal={openModal}/>
                    </li>
                ))
            }
        </ul>
    )
}
export default ImageGallery;