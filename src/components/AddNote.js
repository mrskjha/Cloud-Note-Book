import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext); // Get the context
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  // Event handler for form submission
  const onClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };

  // Event handler for input changes
  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-md mx-auto  ">
      <h1 className="text-white text-2xl font-bold mb-4">Add a Note</h1>
      <form>
        <div className="mb-4 mt-4">
          <label htmlFor="title" className="block text-white font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={note.title}
            name="title"
            className="form-input w-full rounded-md border-black pl-2 h-10"
            onChange={onChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-white font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={note.description}
            name="description"
            className="form-input w-full rounded-md border-gray-300 pl-2 h-10"
            onChange={onChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tag" className="block text-white font-bold mb-2">
            tag
          </label>
          <input
            type="text"
            id="tag"
            value={note.tag}
            name="tag"
            className="form-input w-full rounded-md border-gray-300 pl-2 h-10"
            onChange={onChange}
          />
        </div>
        <button
          disabled={note.title.length < 3 || note.description.length < 5}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
