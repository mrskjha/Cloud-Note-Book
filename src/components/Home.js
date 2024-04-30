import React from 'react';
import Notes from './Notes';




export const Home = (props) => {
  const { showAlert } = props;

  return (
    <div className=' bg-gray-700 h-screen'>
      <Notes showAlert={showAlert} />
    </div>
  );
};


