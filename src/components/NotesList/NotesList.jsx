import EditableNote from "../EditableNote/EditableNote";

const NotesList = ({ notes, handleUpdateNote }) => {
  if (!notes?.length) return <p>No notes yet</p>;

  return (
    <section>
      {notes.map((note) => (
        <EditableNote
          key={note._id}
          note={note}
          handleUpdateNote={handleUpdateNote}
        />
      ))}
    </section>
  );
};

export default NotesList;
