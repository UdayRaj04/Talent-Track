import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../hooks/useGetAllCompanies';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchCompanyByText } from '../redux/companySlice';
import '../css/admincompany.css'


const shortlistingStatus = ["Accepted", "Rejected"];

const AdminCompany = () => {

    useGetAllCompanies();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])


    return (
        // <div>
        //     <div >
        //         <div>
        //             <input
        //                 placeholder="Search by name"
        //                 onChange={(e) => setInput(e.target.value)}
        //             />
        //             {/* <button>New Company</button> */}
        //             <NavLink to='/admin/companies/create'><a className="butout" >ADD NEW COMPANY</a></NavLink>
        //         </div>


        //         <div className="data">
        //         <h1>A list of your recent registered companies</h1>
        //             <table>
        //                 <tr>
        //                     <th>DATE</th>
        //                     <th>NAME</th>
        //                     <th>DATE</th>
        //                     <th>ACTION</th>
        //                 </tr>
        //                 {
        //                     filterCompany?.map((company) => (
        //                 <tr>
        //                     <td><img src="avatar.png" alt="Avatar" className="avatar" /></td>
        //                     <td>{company.name}</td>
        //                     <td>{company.createdAt.split("T")[0]}</td>
        //                     <td><NavLink to={(`/admin/companies/${company._id}`)}><a className="butout" >Edit</a></NavLink></td>
        //                 </tr>))}
        //                 {/* {
        //                     data.map((x) => (
        //                         <tr>
        //                             <td>{x.id}</td>
        //                             <td>{x.name}</td>
        //                             <td>{x.age}</td>
        //                             <td>{x.location}</td>
        //                         </tr>
        //                     )
        //                     )
        //                 } */}
        //             </table>
        //         </div>
        //     </div>
        // </div>
        <div className="container">
      <div className="search-container">
        <input
          className="search-input"
          placeholder="Search by name"
          onChange={(e) => setInput(e.target.value)}
        />
        <NavLink to="/admin/companies/create">
          <button className="butout">ADD NEW COMPANY</button>
        </NavLink>
      </div>

      <div className="data">
        <h1>A list of your recent registered companies</h1>
        <table className="company-table">
          <thead>
            <tr>
              <th>AVATAR</th>
              <th>NAME</th>
              <th>DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filterCompany?.map((company) => (
              <tr key={company._id}>
                <td>
                  <img src="../../public/company.png" alt="Avatar" className="avatarr1" />
                </td>
                <td>{company.name}</td>
                <td>{company.createdAt.split("T")[0]}</td>
                <td>
                  <NavLink to={`/admin/companies/${company._id}`}>
                    <button className="butout">Edit</button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}

export default AdminCompany