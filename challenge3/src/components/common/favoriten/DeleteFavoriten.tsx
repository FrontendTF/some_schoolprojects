import React from 'react';

interface DeleteFavoritenProps {
  favoriteID: string; 
  deleteFavourite: (favoriteID: string) => void; 
  buttonText: string;
}

const DeleteFavoriten: React.FC<DeleteFavoritenProps> = ({ favoriteID, deleteFavourite, buttonText }) => {
  const handleDelete = () => {
    deleteFavourite(favoriteID);
  };

  return (
    <button
      onClick={handleDelete}
      className="text-2xl text-red-600"
    >
      {buttonText}
    </button>
  );
};

export default DeleteFavoriten;
