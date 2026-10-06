import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function About() {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        profileImage: "",
        education: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    // ==========================================
    // FETCH ABOUT DATA
    // ==========================================

    useEffect(() => {

        fetch("http://localhost:5000/api/about")
            .then((response) => response.json())
            .then((data) => {

                if (data.success && data.data) {

                    setFormData({
                        title: data.data.title || "",
                        description: data.data.description || "",
                        profileImage: data.data.profileImage || "",
                        education: data.data.education || ""
                    });

                }

                setLoading(false);

            })
            .catch((error) => {

                console.error(
                    "Error fetching About:",
                    error
                );

                setMessage(
                    "Unable to load About information."
                );

                setLoading(false);

            });

    }, []);


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setMessage("");

    };


    // ==========================================
    // SAVE ABOUT
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setMessage("");

        try {

            const response = await fetch(
                "http://localhost:5000/api/about",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (data.success) {

                setMessage(
                    "About information saved successfully!"
                );

            } else {

                setMessage(
                    data.message ||
                    "Failed to save About information."
                );

            }

        } catch (error) {

            console.error(
                "Save About error:",
                error
            );

            setMessage(
                "Server error. Please try again."
            );

        } finally {

            setSaving(false);

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="dashboard">

                <aside className="sidebar">

                    <Sidebar />

                </aside>

                <main className="main-content">

                    <div className="cms-card">

                        <p>
                            Loading About information...
                        </p>

                    </div>

                </main>

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="dashboard">

            {/* ================= SIDEBAR ================= */}

            <aside className="sidebar">

                <Sidebar />

            </aside>


            {/* ================= MAIN CONTENT ================= */}

            <main className="main-content">

                <header className="topbar">

                    <div>

                        <span className="welcome">
                            CONTENT MANAGEMENT
                        </span>

                        <h1>
                            About
                        </h1>

                        <p>
                            Manage your personal information,
                            education and profile details.
                        </p>

                    </div>

                </header>


                {/* ================= ABOUT CARD ================= */}

                <section className="cms-card about-card">

                    <div className="cms-section-title">

                        <div>

                            <span>
                                ABOUT INFORMATION
                            </span>

                            <h2>
                                Personal Information
                            </h2>

                            <p className="about-helper">
                                Update the information displayed
                                on your portfolio website.
                            </p>

                        </div>

                    </div>


                    <form
                        className="about-form"
                        onSubmit={handleSubmit}
                    >

                        {/* ================= TITLE ================= */}

                        <div className="form-group about-field">

                            <label>
                                About Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Example: About Me"
                                required
                            />

                        </div>


                        {/* ================= DESCRIPTION ================= */}

                        <div className="form-group about-field">

                            <label>
                                Description
                            </label>

                            <textarea
                                className="about-description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Write your professional introduction..."
                                rows={10}
                                required
                            />

                            <small className="field-hint">
                                Write a short professional introduction
                                about yourself, your skills and your goals.
                            </small>

                        </div>


                        {/* ================= EDUCATION ================= */}

                        <div className="form-group about-field">

                            <label>
                                Education
                            </label>

                            <textarea
                                className="about-education"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                placeholder={
                                    "B.Tech in Computer Science and Engineering\n" +
                                    "BRCM College of Engineering & Technology, Bahal\n" +
                                    "2024 – 2028"
                                }
                                rows={4}
                            />

                            <small className="field-hint">
                                You can write degree, college and duration
                                on separate lines.
                            </small>

                        </div>


                        {/* ================= PROFILE IMAGE ================= */}

                        <div className="form-group about-field">

                            <label>
                                Profile Image URL
                            </label>

                            <input
                                type="url"
                                name="profileImage"
                                value={formData.profileImage}
                                onChange={handleChange}
                                placeholder="https://example.com/profile.jpg"
                            />

                            <small className="field-hint">
                                Optional. Add a public image URL for
                                your portfolio profile photo.
                            </small>

                        </div>


                        {/* ================= IMAGE PREVIEW ================= */}

                        {formData.profileImage && (

                            <div className="profile-preview">

                                <span>
                                    PROFILE PREVIEW
                                </span>

                                <img
                                    src={formData.profileImage}
                                    alt="Profile preview"
                                    onError={(event) => {
                                        event.currentTarget.style.display =
                                            "none";
                                    }}
                                />

                            </div>

                        )}


                        {/* ================= ACTIONS ================= */}

                        <div className="form-actions about-actions">

                            <button
                                type="submit"
                                className="save-btn"
                                disabled={saving}
                            >

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"
                                }

                            </button>

                        </div>


                        {/* ================= MESSAGE ================= */}

                        {message && (

                            <div
                                className={
                                    message.includes("successfully")
                                        ? "form-message success-message"
                                        : "form-message error-message"
                                }
                            >

                                {message.includes("successfully")
                                    ? "✓"
                                    : "!"
                                }

                                {" "}

                                {message}

                            </div>

                        )}

                    </form>

                </section>

            </main>

        </div>

    );

}


/* =====================================================
   SIDEBAR
===================================================== */

function Sidebar() {

    return (

        <>

            {/* BRAND */}

            <div className="brand">

                <div className="brand-logo">
                    P
                </div>

                <div>

                    <h2>
                        Portfolio
                    </h2>

                    <span>
                        CMS PANEL
                    </span>

                </div>

            </div>


            {/* MENU */}

            <div className="menu-title">
                MAIN MENU
            </div>


            <nav>

                <NavLink
                    to="/"
                    className="menu-item"
                >

                    <span>
                        ⌂
                    </span>

                    Dashboard

                </NavLink>


                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive
                            ? "menu-item active"
                            : "menu-item"
                    }
                >

                    <span>
                        ◉
                    </span>

                    About

                </NavLink>


                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        isActive
                            ? "menu-item active"
                            : "menu-item"
                    }
                >

                    <span>
                        ◈
                    </span>

                    Projects

                </NavLink>


                <NavLink
                    to="/skills"
                    className={({ isActive }) =>
                        isActive
                            ? "menu-item active"
                            : "menu-item"
                    }
                >

                    <span>
                        ✦
                    </span>

                    Skills

                </NavLink>


                <div className="menu-item">

                    <span>
                        ✉
                    </span>

                    Messages

                </div>

            </nav>


            {/* ADMIN */}

            <div className="admin-box">

                <div className="avatar">
                    A
                </div>

                <div>

                    <strong>
                        Admin
                    </strong>

                    <small>
                        Administrator
                    </small>

                </div>

                <span className="logout">
                    ↪
                </span>

            </div>

        </>

    );

}


export default About;