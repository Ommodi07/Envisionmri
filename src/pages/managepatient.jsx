import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, useFormState } from 'react-hook-form';


const ManagePatient = () => {
  const [patients, setPatients] = useState([]);
  const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm()

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('https://envisionmri.onrender.com/patie,{message:"Incorrect Registration Number"}nts');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`https://envisionmri.onrender.com/api/patients/${editId}`, formData);
      } else {
        await axios.post('https://envisionmri.onrender.com/api/patients', formData);
      }
      fetchPatients();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://envisionmri.onrender.com/api/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setIsEditing(true);
    setEditId(patient._id);
  };

  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Patients</h1>
      
      {/* Patient Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 mx-auto w-[700px] flex flex-col items-center ">
        <h2 className="text-xl font-semibold mb-4">
          {'Add New Patient'} 
        </h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 w-full' >
              <div className='w-full gap-4  flex'>
                <input
                  type="text"
                  placeholder="Patient name"
              
                  className={`border-2 border-solid ${
                    errors.firstname
                      ? "border-red-500"
                      : "hover:border-blue-600"
                  } focus:border-2 focus:border-blue-600 outline-none rounded-md items-center px-6 py-2 text-sm h-9 w-full transition-colors`}
                />   <input
                  type="text"
                  placeholder="Age"
              
                  className={`border-2 border-solid ${
                    errors.firstname
                      ? "border-red-500"
                      : "hover:border-blue-600"
                  } focus:border-2 focus:border-blue-600 outline-none rounded-md items-center px-6 py-2 text-sm h-9 w-full transition-colors`}
                /> 
              </div>
              <div className='w-full gap-4 flex'>
                  <input
                  type=""
                  placeholder="Gender"
              
                  className={`border-2 border-solid ${
                    errors.firstname
                      ? "border-red-500"
                      : "hover:border-blue-600"
                  } focus:border-2 focus:border-blue-600 outline-none rounded-md items-center px-6 py-2 text-sm h-9 w-full transition-colors`}
                />
               <input
                  type="text"
                  placeholder="Contact Number"
              
                  className={`border-2 border-solid ${
                    errors.firstname
                      ? "border-red-500"
                      : "hover:border-blue-600"
                  } focus:border-2 focus:border-blue-600 outline-none rounded-md items-center px-6 py-2 text-sm h-9 w-full transition-colors`}
                /></div>
              <div  className = "w-full flex ">
                <textarea placeholder='Medical History' className={`border-2 border-solid ${
                    errors.firstname
                      ? "border-red-500"
                      : "hover:border-blue-600"
                  } focus:border-2 focus:border-blue-600 outline-none rounded-md items-center px-6 py-2 text-sm h-20 w-1/2 transition-colors`}/>
              </div>
              <div className='w-1/3'>
                  <button className='bg-blue-400 px-3 rounded-lg font-semibold hover:bg-blue-300 py-2'>Add Patient</button>
              </div>
            </form>
      </div>

      {/* Patients List */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td className="px-6 py-4">{patient.name}</td>
                <td className="px-6 py-4">{patient.age}</td>
                <td className="px-6 py-4">{patient.gender}</td>
                <td className="px-6 py-4">{patient.contact}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(patient)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePatient;