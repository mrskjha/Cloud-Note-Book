import React, { useContext, useEffect, useState,useRef } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitems from "./Noteitems";
import AddNote from "./AddNote";
import {  useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate=useNavigate();
  const { notes, getNotes } = useContext(NoteContext);
  useEffect(() => {
    if(localStorage.getItem('token')){

      getNotes();
    }
    else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const ref = useRef(null);

//   const updateNote = (note) => {
//     console.log("updating the note", note);
//     toggleModal();
//     ref.current.click();
//   };
  return (
    <>
      <AddNote />
      <button  ref={ref}
        onClick={toggleModal}
        className=" hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button" 
        
      >
        Toggle modal
      </button>

      <div
        id=""
        className={`${
          isModalOpen ? "block" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        {/* Modal content */}
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
              <button
                onClick={toggleModal}
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form>
                <div class="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-white font-bold mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-input w-full rounded-md border-black"
                  />
                </div>
                <div class="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-white font-bold mb-2"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className="form-input w-full rounded-md border-gray-300"
                    
                  />
                </div>
                <div class="mb-4">
                  <label
                    htmlFor="tag"
                    className="block text-white font-bold mb-2"
                  >
                    tag
                  </label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    className="form-input w-full rounded-md border-gray-300"
                  
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                 
                >
                  Update Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="flex ml-2 mb-2">
        {notes.map((note) => (
          <Noteitems key={note._id}note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;
