import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {  NavLink, useNavigate } from 'react-router-dom'
import {COMPANY_API_END_POINT } from '../apis/constant.js';
import { setSingleCompany } from '../redux/companySlice'
import '../css/admincomcreate.css'

const AdminCompanycreate = () => {

    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                //toast.success(res.data.message);
                alert(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
<div className='con'>
    <div className="registration-container">
      <div className="header">
        <h1>Your Company Name</h1>
        <p>What would you like to give your company name? You can change this later.</p>
      </div>

      <label className="label">Company Name</label>
      <input
        type="text"
        className="input-field"
        placeholder="google, Microsoft etc."
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <div className="button-group">
        <NavLink to="/admin/companies">
          <button className="btn-cancel">Cancel</button>
        </NavLink>
        <button className="btn-continue" onClick={registerNewCompany}>
          CONTINUE
        </button>
      </div>
    </div>
    </div>
    
    // <div>
    //             <div>
    //                 <h1>Your Company Name</h1>
    //                 <p>What would you like to give your company name? you can change this later.</p>
    //             </div>
    //             <label>Company Name</label>
    //             <input
    //                 type="text"
    //                 placeholder="JobHunt, Microsoft etc."
    //                 onChange={(e) => setCompanyName(e.target.value)}
    //             />
    //             <div>
    //             <NavLink to='/admin/companies'><a className="butout" >Cancel</a></NavLink>
    //             <button className="btn" onClick={registerNewCompany}>CONTINUE</button>
    //             {/* <NavLink to={registerNewCompany}><a className="butout" >CONTINUE</a></NavLink> */}
    //             </div>
    //         </div>
  )
}

export default AdminCompanycreate