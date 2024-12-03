import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./accomodation.css";
import { description } from "./clgdesc";
{/*import { silver_amabassador } from "./description";
import { gold_amabassador } from "./description"; */}
import FadeIn from "../components/FadeIn";
import FadeInContent from "../components/FadeInContent";
import PageLoader from "../components/PageLoader";
import Go2Top from "../components/Go2Top";
import AuthContext from "../context/AuthContext";
import bg from "../assets/accomodation/bg.webp";
import campusBg_second from "../assets/cAmbassador/caBg_second.webp";
{/*import silverIncentives from "../assets/cAmbassador/silverIncentives.webp";
import goldIncentives from "../assets/cAmbassador/goldIncentives.webp";*/}

const Acc = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const IMAGES = [
    {
      id: "1",
      url: bg,
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    const navBarEle = document.getElementById("navbar");
    navBarEle.style.opacity = 1;

    const mediaQuery = window.matchMedia("(max-width:500px)");
    setIsMobile(mediaQuery.matches);
    const tablet = window.matchMedia("(max-width:1000px)");
    setIsTablet(tablet.matches);

    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.url;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image.url);
          }, 2000);

        loadImg.onerror = (err) => reject(err);
      });
    };
    Promise.all(IMAGES.map((image) => loadImage(image)))
      .then(() => setLoading(false))
      .catch((err) => console.log("Failed to load images", err));
  }, []);

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <FadeIn>
          <div className="caPage">
            <div
              className="caTitle_slide"
              style={{ backgroundImage: `url(${bg})` }}
            >
              <div className="overLayer"></div>
              <div className="ca-title-main">
                <p className="title-campus" style={{ backgroundImage: `url(${bg})` }}>ACCOMODATION</p>
                <p className="title-ambassador" style={{ backgroundImage: `url(${bg})` }}>A COMFORTABLE AND CONVENIENT ACCOMMODATION IN PROMETEO</p>
              </div>
              <div className="gradient_first"></div>
            </div>
            <div
              className="caDetails"
            >
              <div className="overLayer"></div>
              <div className="ca_body">
                {description.map((item, index) => {
                  return (
                    <FadeInContent key={index}>
                      <div className="acc_decription">
                        <div className="ca-info-container" key={index}>
                          <div className="ca_blocks">
                          <h1
  className="no_margin"
  style={{
    textAlign: "center",
    alignSelf: "center",
  }}
>
                              {item.heading}
                            </h1>
                            <div
                              className="ca_info-content"
                              style={{
                                display: "flex",
                                flexDirection: `${isTablet
                                  ? "column-reverse"
                                  : index % 2 != 0
                                    ? "row-reverse"
                                    : "row"
                                  }`,
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <p className="selected_p">{item.info}</p>
                              <img
                                src={item.img}
                                style={{ width: `${isTablet ? "50%" : "30%"}` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeInContent>
                  );
                })}
                <div className="ca-incentives">
                  <FadeInContent>
                    <h1 className="incentive_title">INCENTIVES</h1>
                    <div className="incentives_body">
                      <div className="silver_ambassador">
                        <div className="silver_incentives" style={{ backgroundImage: `url(${silverIncentives})` }}>
                          <p className="silver">Silver</p>
                          <p className="campusA">Campus Ambassador</p>
                        </div>
                        <div className="reg_With_Acco">
                          15+ Registrations (with accommodation)
                        </div>
                        <div className="silver_brief">
                          {silver_amabassador.map((item, index) => (
                            <div key={index} className="ambassador_benefits">
                              <p>&#x2022;</p>
                              <p className="items">{item.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="gold_ambassador">
                        <div className="gold_incentives" style={{ backgroundImage: `url(${goldIncentives})` }}>
                          <p className="silver">Gold</p>
                          <p className="campusA">Campus Ambassador</p>
                        </div>
                        <div className="reg_With_Acco">
                          30+ Registrations (with accommodation)
                        </div>
                        <div className="silver_brief">
                          {gold_amabassador.map((item, index) => (
                            <div key={index} className="ambassador_benefits">
                              <p>&#x2022;</p>
                              <p>{item.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FadeInContent>
                </div>
                <div className="registrationSection">
                  <FadeInContent>
                    <div className="ca-registration">
                      <h2>
                      Prometeo 2024 and IIT Jodhpur will not be responsible for any mishaps that occur through the duration of stay for Prometeo 202
                      </h2>
                      <div className="ca-register-btn">
                        {!user ? (<Link to="/register">
                          <button>Register</button>
                        </Link>
                        ) : (
                          <Link to="/dashboard">
                            <button>Dashboard</button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </FadeInContent>
                </div>
              </div>
            </div>
          </div>
          <Go2Top />
        </FadeIn>)}
    </>
  );
};

export default CA;