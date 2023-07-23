import React, { useState, useEffect } from "react";
import { url } from "../url";
import axios from "axios";

const Settings = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [themeConfig, setThemeConfig] = useState({
    backgroundColor: "",
    primaryColor: "",
    secondaryColor: "",
    textColor: "",
    fontSize: "",
  });

  useEffect(() => {
    if (userId) {
      axios.get(`${url}/setting/:${userId}`).then((res) => {
        setThemeConfig(res.data);
      });
    } else {
      console.log("Got some error");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    console.log(themeConfig.backgroundColor)
    root.style.setProperty("--background-color", themeConfig.backgroundColor);
    root.style.setProperty("--primary-color", themeConfig.primaryColor);
    root.style.setProperty("--secondary-color", themeConfig.secondaryColor);
    root.style.setProperty("--text-color", themeConfig.textColor);
    root.style.setProperty("--font-size", `${themeConfig.fontSize}px`);
  }, [
    themeConfig.backgroundColor,
    themeConfig.primaryColor,
    themeConfig.secondaryColor,
    themeConfig.textColor,
    themeConfig.fontSize,
  ]);
  const handleThemeConfig = async (event) =>{
    const { name, value } = event.target;
    console.log(name,value)
    setThemeConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
    await axios.put(`${url}/setting/:${userId}`,themeConfig).then((res)=>{
      // console.log(res.data)
    })
  }
  return (
    <div className="settings">
      <h2>Settings</h2>
      <div>
        <label htmlFor="background-color">Background Color:</label>
        <input
          type="color"
          id="background-color"
          name="backgroundColor"
          value={themeConfig.backgroundColor}
          onChange={handleThemeConfig}
        />
      </div>
      <div>
        <label htmlFor="primary-color">Primary Color:</label>
        <input
          type="color"
          id="primary-color"
          name="primaryColor"
          value={themeConfig.primaryColor}
          onChange={handleThemeConfig}
        />
      </div>
      <div>
        <label htmlFor="secondary-color">Secondary Color:</label>
        <input
          type="color"
          id="secondary-color"
          name="secondaryColor"
          value={themeConfig.secondaryColor}
          onChange={handleThemeConfig}
        />
      </div>
      <div>
        <label htmlFor="text-color">Text Color:</label>
        <input
          type="color"
          id="text-color"
          name="textColor"
          value={themeConfig.textColor}
          onChange={handleThemeConfig}
        />
      </div>
      <div>
        <label htmlFor="font-size">Font Size:</label>
        <input
          type="number"
          id="font-size"
          name="fontSize"
          value={themeConfig.fontSize}
          onChange={handleThemeConfig}
        />
      </div>
    </div>
  );
};

export default Settings;
