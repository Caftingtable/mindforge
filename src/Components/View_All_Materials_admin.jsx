import React, { useState, useEffect } from 'react';
import useMyBackendAxios from '../Hooks/useMyBackendAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SearchBar from './SearchBar';

const View_All_Materials_admin = () => {
  const axios = useMyBackendAxios();
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  const { isPending, data: All_Materials = [], refetch } = useQuery({
    queryKey: ['all_materials_admin'],
    queryFn: async () => {
      const res = await axios.get(`/materials`);
      return res.data;
    }
  });

  useEffect(() => {
    setFilteredMaterials(All_Materials);
  }, [All_Materials]);

  const handleSearch = (searchTerm) => {
    const filtered = All_Materials.filter(material =>
      material.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMaterials(filtered);
  };

  const handleDeleteSession = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/materials/${_id}`)
          .then(res => {
            if (res.data.deletedCount === 1) {
              Swal.fire("Deleted!", "Material has been deleted.", "success");
              refetch();
            }
          });
      }
    });
  };

  if (isPending) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search materials..."
          className="max-w-md mx-auto"
        />
      </div>
      <div className="relative w-full lg:h-36 md:h-36 sm:h-36 bg-primary  flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">All Materials</h1>
      </div>
      <div className="grid my-10 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {filteredMaterials.map((material) => (
          <div key={material._id}
            className="p-4 bg-white max-w-sm rounded-2xl overflow-hidden shadow-sm shadow-primary transition duration-300">
            <img className="rounded-xl w-full" src={material?.imgFile} alt="" />
            <div className="flex flex-col ">
              <div className="mb-4">
                <h1 className="mt-5 text-2xl font-semibold">{material?.title}</h1>
              </div>
              <div>
                <button onClick={() => handleDeleteSession(material._id)} className="text-white flex items-center text-md font-semibold bg-primary py-2 px-4 rounded-lg shadow-md hover:shadow-lg ">Delete Materials</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View_All_Materials_admin;
