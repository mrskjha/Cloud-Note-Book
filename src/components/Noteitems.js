import React, { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
//import { FaEdit } from "react-icons/fa";
import NoteContext from "../context/notes/noteContext"; 

const NoteItem = ({ note }) => {
  const { deleteNote } = useContext(NoteContext);

  const handleDelete = () => {
    deleteNote(note._id); // Using the provided function to delete notes
  };
  return (
    <div className="card bg-gray-100 flex-wrap rounded-lg p-4 h-52 w-52 ml-2 mb-2 mt-20 shadow-md relative">
      <h3 className="card__title text-xl font-bold">{note.title}</h3>
      <p className="card__content text-gray-700 text-sm"> {note.description}.</p>
      <div className="card__arrow absolute   bottom-0 right-0 cursor-pointer p-1 rounded-tl-lg rounded-br-lg transition duration-200 flex justify-center items-center">
      <MdDeleteForever className="hover:text-red-500 text-3xl " onClick={handleDelete} />
      </div>
    </div>
  );
};
    

export default NoteItem;
