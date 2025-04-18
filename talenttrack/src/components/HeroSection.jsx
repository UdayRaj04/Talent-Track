import React, { useState } from 'react'
import '../css/home.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Cardjob from './Cardjob';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]
//const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
  


const HeroSection = () => {
  const {allJobs} = useSelector(store=>store.job);

  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
}

const searchJobHandle = (query) => {
  dispatch(setSearchedQuery(query));
  navigate("/browse");
}

    


    return (<>
    <div className='bg'>
        <div>
            <div className="hero-section" >
                <h2 className='a'>Search, Apply & Get Your <span >Dream Jobs</span></h2>
                <p className='b'> A smart job portal connecting employers, streamlining hiring as company match and real-time job tracking.</p>
                <div className='c'>
                    <input className="inputtt" type="text" placeholder='Find your dream jobs' onChange={(e) => setQuery(e.target.value)} />
                    <button className="buttt" onClick={searchJobHandler}>Search</button>
                </div>
            </div>
        </div>
        <br></br>


        <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 }
        }}
      >
        {category.map((category, index) => (
          <SwiperSlide key={index}>
            <div className="category-card" onClick={searchJobHandle}>
              <h3>{category}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    <div className="cardcontainer">
            <h1><span>Latest & Top </span> Job Openings</h1>
            <div className="card">
                {
                  allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,4).map((job) =><Cardjob key={job._id} job={job} /> )
                    /* allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>) */

                }
            </div>
        </div>

</div>


        </>
    )
}

export default HeroSection