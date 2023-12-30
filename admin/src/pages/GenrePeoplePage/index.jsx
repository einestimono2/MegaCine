import React from 'react';

import Genres from '../../components/Genres/List';
import People from '../../components/People/List';

export default function GenrePeoplePage() {
  return (
    <div className="h-full w-full grid grid-cols-5 gap-5">
      <Genres />
      <People />
    </div>
  );
}
