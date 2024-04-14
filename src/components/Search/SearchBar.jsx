import css from './Search.module.css'
import {Field, Form, Formik} from "formik";
import {useState} from "react";
import toast from "react-hot-toast";
export function SearchBar ({submit}) {
    const [query, setQuery] = useState('');

    const handleSubmit = (values, {resetForm}) => {
        if (query.trim() === "") {
          return  toast.error('Please enter search term!');
        }
        submit(query);
        resetForm()
    }

    const handleChange = (evt) => {
        setQuery(evt.target.value);
    }

    return (
        <header className={css.header}>
            <Formik onSubmit={handleSubmit} initialValues={{ searchBar: '' }}>
                <Form className={css.form}>
                    <Field
                        value={query}
                        type="text"
                        autoComplete="off"
                        name="searchBar"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange}
                        className={css.input}
                    />
                    <button type="submit" className={css.btn}>
                        <p className={css.searchIcon}></p>
                    </button>
                </Form>
            </Formik>
        </header>
    )
}