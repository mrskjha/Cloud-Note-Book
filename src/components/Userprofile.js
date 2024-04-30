import React from "react";
// import NoteContext from "../context/notes/noteContext"; 

const Userprofile = ({ note }) => {
  // Check if note is defined before destructuring
  if (!note) {
    return (
      <div>
        <h1>User Profile</h1>
        <p>This is the user profile page</p>  
        <p>No user information available</p>
      </div>
    );
  }

  // Destructure name and email from note object
  const { name, email } = note;

  return (
    <div>
      <h1>User Profile</h1>
      <p>This is the user profile page</p>  
      <div>
        <h1>Hello {name}</h1>
        <h1>Your email is {email}</h1>
      </div>
    </div>
  );
}

export default Userprofile;
