import {useEffect, useState} from 'react'
import './App.css'
import {SearchBar} from "../Search/SearchBar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import {APIphoto} from "../../API/photo-api.js";
import LoadMoreBtn from "../LoadMoreBtn/LoadMore.jsx";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../Error/Error.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import Modal from "react-modal";
import toast, {Toaster} from "react-hot-toast";

const App = () => {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const [loadMore, setLoadMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');
    const [alt, setAlt] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        Modal.setAppElement('#root');
        const API = async () => {
            try {
                setLoading(true)
                const data=await APIphoto(query, page + 1);
                setArticles((prevArticles) => [...prevArticles, ...data]);
                setLoadMore(data.length > 0);
            } catch (e) {
                console.error('API error', e)
                toast.error('Please enter search term!');
                setError(true)
            }finally {
                setLoading(false)
            }
        }
        API();
    }, [page, query]);

    const onHandleSubmit = (value) => {
        setQuery(value);
        setPage(1);
        setArticles([]);
        setLoading(true)
    }

    const handleLoadMore = async () => {
        try {
            const data= await APIphoto(query, page + 1);
            if (data.length > 0){
                const newData = data.filter((item) => !articles.some((article) => article.id === item.id));
                setArticles((prevArticles) => [...prevArticles, ...newData]);
                setPage((prevPage)=> prevPage + 1 )
            } else {
                setLoadMore(false)
            }
        } catch (e) {
            console.error(e);
        }
    }

    const isOpenModal= (obj) => {
        setShowModal(true);
        setAlt(obj.alt_description);
        setUrl(obj.urls.regular);
        setDescription(obj.description);
    }
    const isCloseModal= () => {
        setShowModal(false);
        setAlt('');
        setUrl('');
        setDescription('');
    }

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <SearchBar submit={onHandleSubmit}/>
            {error && (<ErrorMessage />)}
            {articles.length > 0 && (
                <>
                    <ImageGallery data={articles} openModal={isOpenModal}/>
                    { loadMore && (
                        <LoadMoreBtn onClick={handleLoadMore} loadBtn={loadMore}/>
                    )}
                    {loading && (<Loader/>)}
                </>
            )}
            <ImageModal
                isOpen={showModal}
                url={url}
                alt={alt}
                closeModal={isCloseModal}
                description={description}
            />
        </div>
    );
};

export default App
