/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';

import { useGetFilesQuery } from '../features/apiSlice';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetFilesQuery(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div className="app">
      <div className="files">
        {data?.data.map((file) => (
          <div key={file.id} className="file">
            <img src={file.file_path} alt={file.file_name} />
            <p>{file.file_name}</p>
          </div>
        ))}
      </div>
      {data && <Pagination meta={data.meta} onPageChange={handlePageChange} />}
    </div>
  );
};

export default Home;
