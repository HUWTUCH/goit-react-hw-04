import { useEffect, useState } from 'react';
import './App.css';
import { SearchBar } from "../Search/SearchBar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import { APIphoto } from "../../API/photo-api.js";
import LoadMoreBtn from "../LoadMoreBtn/LoadMore.jsx";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../Error/Error.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');
    const [alt, setAlt] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        Modal.setAppElement('#root');
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (query.trim() === "") return; // Перевіряємо, чи не пустий рядок
            setError(false); // Скидаємо стан помилки
            setLoading(true); // Встановлюємо стан завантаження
            try {
                const data = await APIphoto(query, page);
                setArticles((prevArticles) => [...prevArticles, ...data]);
                setLoadMore(data.length > 0);
            } catch (e) {
                console.error('API error', e);
                toast.error('Error fetching data. Please try again.');
                setError(true); // Встановлюємо стан помилки
            } finally {
                setLoading(false); // Зупиняємо завантаження незалежно від результату
            }
        };

        fetchData();
    }, [page, query]); // Запускаємо ефект при зміні сторінки або запиту

    const handleSubmit = (value) => {
        setPage(1); // Скидаємо сторінку при новому запиті
        setArticles([]); // Очищуємо список статей
        setQuery(value); // Встановлюємо новий запит
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const openModal = (obj) => {
        setShowModal(true);
        setAlt(obj.alt_description);
        setUrl(obj.urls.regular);
        setDescription(obj.description);
    };

    const closeModal = () => {
        setShowModal(false);
        setAlt('');
        setUrl('');
        setDescription('');
    };

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <SearchBar submit={handleSubmit} />
            {error && <ErrorMessage />} {/* Відображаємо ErrorMessage, якщо error === true */}
            <ImageGallery data={articles} openModal={openModal} />
            {loadMore && <LoadMoreBtn onClick={handleLoadMore} loadBtn={loadMore} />}
            {loading && <Loader />}
            <ImageModal
                isOpen={showModal}
                url={url}
                alt={alt}
                closeModal={closeModal}
                description={description}
            />
        </div>
    );
};

export default App;

