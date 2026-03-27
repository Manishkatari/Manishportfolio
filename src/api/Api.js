const rawBaseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const BASE_URL = rawBaseUrl.endsWith("/api")
  ? rawBaseUrl
  : `${rawBaseUrl.replace(/\/$/, "")}/api`;


const fetchData = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Or a default value
  }
};

export const getHome = async () => fetchData("/home");
export const getAbout = async () => fetchData("/about");
export const getProjects = async () => fetchData("/projects");
export const getProjectsCard = async () => fetchData("/projects");
export const getExperience = async () => fetchData("/experience");
export const getEducation = async () => fetchData("/education");
export const getCertifications = async () => fetchData("/certifications");
export const getProfile = async () => fetchData("/profile");
export const getFooter = async () => fetchData("/footer");
export const getHeader = async () => fetchData("/header");
export const getHero = async () => fetchData("/hero");
export const getSkills = async () => fetchData("/skills");

export const getSocial = async () => fetchData("/social");

export const sendContactForm = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error sending contact form:", error);
    return null;
  }
};

