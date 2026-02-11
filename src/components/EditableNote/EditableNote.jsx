import { useState } from "react";

const EditableNote = ({ note, handleUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(note.text);

  const handleSave = () => {
    handleUpdateNote(note._id, { text });
    setIsEditing(false);
  };

  return (
    <article>
      {isEditing ? (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <div onClick={() => setIsEditing(true)}>
          <p>{note.text}</p>
          <small>
            {new Date(note.createdAt).toLocaleDateString()}
          </small>
        </div>
      )}
    </article>
  );
};

export default EditableNote;
