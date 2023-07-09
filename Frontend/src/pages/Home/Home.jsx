import "./Home.css";

import { Link } from "react-router-dom";


import FAQSection from "./../../components/FAQSection/FAQSection.jsx";


import faqData from "./../../assets/json-data/faqData.json";


import services_menu from "./../../assets/json-data/services_menu.json";
import heroImage from "./../../assets/Images/doctor-hero.svg"
import waveImg from "./../../assets/Images/wave.svg";
import gif from "./../../assets/Images/doctor-application.gif";

const Home = () => {
  return (
    <>
      <div className="home">
        {/* Top Body */}
        <div className="topBody_container">
          {/* hero section */}
          <div className="topBody">
            <img src={heroImage} alt="" />
            <div className="hero-text">
              <h1>Empowering Healthcare through Artificial Intelligence</h1>
              <p>
                Detect. Connect. Heal. Seamlessly schedule doctor meetings after
                disease detection, unlocking your path to optimal health.
              </p>
              <Link type="button" to="/appointment" className="appointment-btn">
                Make Appointment
              </Link>
            </div>
          </div>
          <img className="wave-img" src={waveImg} alt="" />
        </div>
        {/* Models Section */}
        <div className="modelSection">
          {/* Models */}
          <div>
          <p>
            <span>Health At Your FingerTips.</span> <br /> Check your health
            with our latest AI Technology
          </p>
          <img src={gif} className="gifimg" /></div>
          <div className="models">
            {services_menu.items.map((item, index) => {
              if (index !== services_menu.items.length - 1) {
                return (
                  <button key={index} className="CtScan">
                  <img src={item.src} />
                  <p>{item.title}</p>
                </button>
                );
              }
            })}
          </div>
        </div>
        <hr />
        <div className="bottomBody">
          {/* About */}
          <div className="faq">
            <h1>Have a question ?</h1>
            <FAQSection faqData={faqData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;