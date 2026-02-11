// src/components/NoteForm/NoteForm.jsx

import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Add note:</label>
      <textarea
        required
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
      />
      <button type='submit'>Add Note</button>
    </form>
  );
};

export default NoteForm;
