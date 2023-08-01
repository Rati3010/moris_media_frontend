import React, { useState, useEffect } from "react";
import { url } from "../url";
import axios from "axios";
import io from "socket.io-client";

const socket = io(url, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

const Settings = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [updateEffect, setUpdateEffect] = useState(false);

  const [themeConfig, setThemeConfig] = useState({
    backgroundColor: "#f5f5f5",
    primaryColor: "#ff0000",
    secondaryColor: "#00ff00",
    textColor: "#000000",
    fontSize: "16",
  });
  useEffect(() => {
    fetchThemeConfig();
    if (userId) {
      socket.emit("joinRoom", userId);
    }
    return () => {
      if (userId) {
        socket.emit("leaveRoom", userId);
      }
    };
  }, [userId]);
  const fetchThemeConfig = async () => {
    try {
      if (userId) {
        const response = await axios.get(`${url}/setting/${userId}`);
        setThemeConfig(response.data);
      } else {
        console.log("User not logged in");
      }
    } catch (error) {
      console.error("Error fetching theme configuration:", error);
    }
  };
  useEffect(() => {
    socket.on("themeConfigUpdate", (updatedConfig) => {
      if(userId === updatedConfig.userID){
        setThemeConfig(updatedConfig);  
      }
    });
    return () => {
      socket.off("themeConfigUpdate");
    };
  }, []);
  useEffect(() => {
    if (userId) {
      axios.get(`${url}/setting/${userId}`).then((res) => {
        setThemeConfig(res.data);
        setUpdateEffect(false)
      });
    } else {
      console.log("Got some error");
    }
  }, [updateEffect, userId]);

  useEffect(() => {
    const root = document.documentElement;
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
  const handleThemeConfig = async (event) => {
    const { name, value } = event.target;
    const updatedConfig = {
      ...themeConfig,
      [name]: value,
    };
    await axios.put(`${url}/setting/${userId}`, updatedConfig).then((res) => {
      setUpdateEffect(true);
    });
    socket.emit("updateThemeConfig", { userId, updatedConfig });
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
