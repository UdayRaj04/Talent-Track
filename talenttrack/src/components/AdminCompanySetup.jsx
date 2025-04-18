import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useGetCompanyById from '../hooks/useGetCompanyById.jsx'
import { useSelector } from 'react-redux';
import axios from 'axios';
import {COMPANY_API_END_POINT } from '../apis/constant.js';
import "../css/companysetup.css"



const AdminCompanySetup = () => {

  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });
  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null
    })
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    // if (input.file) {
    //   formData.append("file", input.file);
    // }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'application/json'
                },
        withCredentials: true
      });
      if (res.data.success) {
        alert(res.data.message);
        // toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      //toast.error(error.response.data.message);
    } finally {
      console.log("Update done");
      //setLoading(false);
    }
  }


  return (
    <div className="company-setup-container">
    <button className="back-button" onClick={() => navigate("/admin/companies")}>
            <span>Back</span>
          </button>
      <form onSubmit={submitHandler} className="company-form">
        <div className="form-header">
          
          <h1>Company Setup</h1>
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input type="text" name="name" value={input.name} onChange={changeEventHandler} className="input-field" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input type="text" name="description" value={input.description} onChange={changeEventHandler} className="input-field" />
        </div>

        <div className="form-group">
          <label>Website</label>
          <input type="text" name="website" value={input.website} onChange={changeEventHandler} className="input-field" />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={input.location} onChange={changeEventHandler} className="input-field" />
        </div>

        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  )
}

export default AdminCompanySetup