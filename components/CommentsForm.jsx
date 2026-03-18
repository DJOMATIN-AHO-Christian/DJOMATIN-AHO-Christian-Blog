import React, { useState, useEffect } from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug, id }) => {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', comment: '', storeData: false });

  useEffect(() => {
    const initialFormData = {
      name: window.localStorage.getItem('name') || '',
      email: window.localStorage.getItem('email') || '',
      storeData: !!(window.localStorage.getItem('name') || window.localStorage.getItem('email')),
      comment: '',
    };
    setFormData(initialFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObj = { name, email, comment, slug, id };

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
    }

    submitComment(commentObj)
      .then((res) => {
        if (res.createComment) {
          setFormData((prevState) => ({
            ...prevState,
            comment: '',
          }));
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        }
      });
  };

  return (
    <div className="bg-notion-card border border-notion-border rounded-lg p-8 pb-12 mb-8 transition-colors">
      <h3 className="text-xl mb-8 font-bold text-notion-text border-b border-notion-border pb-4">Laisser un commentaire</h3>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          value={formData.comment}
          onChange={onInputChange}
          className="p-4 outline-none w-full rounded-lg h-32 focus:ring-1 focus:ring-notion-border bg-notion-hover text-notion-text placeholder-notion-secondary/50 border border-notion-border/50 text-sm transition-all"
          name="comment"
          placeholder="Commentaire"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={formData.name}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-1 focus:ring-notion-border bg-notion-hover text-notion-text placeholder-notion-secondary/50 border border-notion-border/50 text-sm transition-all"
          placeholder="Nom"
          name="name"
        />
        <input
          type="email"
          value={formData.email}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-1 focus:ring-notion-border bg-notion-hover text-notion-text placeholder-notion-secondary/50 border border-notion-border/50 text-sm transition-all"
          placeholder="Email"
          name="email"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <input checked={formData.storeData} onChange={onInputChange} type="checkbox" id="storeData" name="storeData" className="cursor-pointer" />
          <label className="text-notion-secondary text-xs cursor-pointer select-none" htmlFor="storeData">Enregistrer mon nom et mon email dans ce navigateur pour mon prochain commentaire.</label>
        </div>
      </div>

      {error && <p className="text-xs text-red-500 mb-4">Tous les champs sont obligatoires</p>}

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="transition-all duration-300 notion-button bg-notion-text text-white dark:bg-white dark:text-black font-bold rounded px-8 py-2 text-sm hover:opacity-90 active:scale-95 shadow-sm"
        >
          Publier le commentaire
        </button>
        {showSuccessMessage && <span className="text-sm font-bold text-green-500 animate-pulse">Commentaire soumis pour examen</span>}
      </div>
    </div>
  );
};

export default CommentsForm;
