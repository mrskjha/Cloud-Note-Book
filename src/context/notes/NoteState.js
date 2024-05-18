import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [setError] = useState(null);

  // Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching notes: ${response.status}`);
      }

      const json = await response.json();
      setNotes(json);
      console.log("Fetched notes successfully:", json);
    } catch (err) {
      setError(err);
      console.error("Error fetching notes:", err);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });
  
      if (!response.ok) {
        throw new Error(`Error adding note: ${response.status}`);
      }
  
      const json = await response.json();
      console.log("Added note successfully:", json);
      setNotes([...notes, json]); // Assuming the response from the server contains the newly added note
    } catch (err) {
      setError(err);
      console.error("Error adding note:", err);
    }
  };
  

  // Delete a note
  const deleteNote =async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE", // Likely PUT for updating an existing note
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = response.json();
    console.log(json);
    console.log("Deleting the note with id: " + id);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "POST", // Likely PUT for updating an existing note
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response);
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
  };
 

  

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
