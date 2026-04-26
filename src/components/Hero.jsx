import React, { useEffect, useState } from "react";
import Button from "./Button";
import Social from "./Social";
import { getHero } from "../api/Api";
import { resolveAssetPath } from "../utils/assetPath";

const Hero = () => {
  const [hero, setHero] = useState({ buttons: [] });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHero();
      if (data) {
        setHero(data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="profileCard container-fluid">
        <div className="row p-5 profileInerrow">
          <div className="col-md-6">
            <div className="col-lg-12 text-center text-lg-start">
              <div className="">
                <h1 className="fw-bold">Hi, I'm {hero.name}</h1>
                <p className="lead">{hero.title}</p>
                <p className="text-muted">{hero.subtitle}</p>

                <div className="m-5 px-5 d-flex justify-content-between">
                  {hero.buttons.map((btn, index) => (
                    <Button
                      key={index}
                      name={btn.name}
                      href={btn.link}
                      className="btn btn-primary"
                      target={
                        btn.link?.startsWith("http") ||
                        btn.link?.endsWith(".pdf")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        btn.link?.startsWith("http") ||
                        btn.link?.endsWith(".pdf")
                          ? "noreferrer"
                          : undefined
                      }
                    />
                  ))}
                </div>

                <div className="col-lg-8 col-md-12 mb-4">
                  <Social />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="col-lg-12 hero-image ">
              {/* <img src={hero.heroImg} className="" alt="Hero" /> */}
             <img
              src={resolveAssetPath(hero.heroImg)}
              className="img-fluid"
              alt="Hero"
            />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
