import Modal from 'react-modal'
import css from './ImageModal.module.css'
const ImageModal = ({isOpen, url, alt, description, closeModal}) => {
    return (
        <div className={css.container}>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        high: '50%',
                    }
                }}
                contentLabel="Image Modal"
            >
            <img src={url} alt={alt} className={css.img}/>
            <p className={css.text }>{description}</p>
            </Modal>
        </div>
    )
}
export default ImageModal;