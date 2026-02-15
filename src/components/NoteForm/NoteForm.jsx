// src/components/NoteForm/NoteForm.jsx

import { useState } from 'react';

import styles from './NoteForm.module.css'

const NoteForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddNote(formData);
    setFormData({ text: '' });
    console.log('formData', formData)
  };

  return (
    <main className={styles.container} >
    <form onSubmit={handleSubmit}  className={styles.form} >
      
      <textarea
        required
        name='text'
        id='text-input'
        placeholder='Add Note'
        value={formData.text}
        onChange={handleChange}
      />
      <button type='submit'>Add Note</button>
    </form>
    </main>
  );
};

export default NoteForm;
