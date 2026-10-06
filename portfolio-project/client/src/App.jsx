import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    NavLink
} from "react-router-dom";

import { useEffect, useState } from "react";

import "./App.css";

import Projects from "./pages/projects";
import About from "./pages/About";
import Skills from "./pages/SkillsPage";
import Login from "./pages/Login";
import Messages from "./pages/Messages";


function Dashboard() {

    const [projectCount, setProjectCount] = useState(0);
    const [skillCount, setSkillCount] = useState(0);
    const [messageCount, setMessageCount] = useState(0);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                const token = localStorage.getItem("token");

                // Projects
                const projectResponse = await fetch(
                    "http://localhost:5000/api/projects"
                );

                const projectData = await projectResponse.json();

                if (projectData.success) {
                    setProjectCount(projectData.count);
                }


                // Skills
                const skillResponse = await fetch(
                    "http://localhost:5000/api/skills"
                );

                const skillData = await skillResponse.json();

                if (skillData.success) {
                    setSkillCount(skillData.count);
                }


                // Messages
                const messageResponse = await fetch(
                    "http://localhost:5000/api/messages",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const messageData = await messageResponse.json();

                if (messageData.success) {

                    setMessageCount(messageData.count);

                    const unread = messageData.messages.filter(
                        (message) => message.status !== "read"
                    ).length;

                    setUnreadCount(unread);
                }

            } catch (error) {

                console.error(
                    "Dashboard data error:",
                    error
                );

            }

        };

        fetchDashboardData();

    }, []);


    return (

        <div className="dashboard">

            <aside className="sidebar">

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


                <div className="menu-title">
                    MAIN MENU
                </div>


                <nav>

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "menu-item active"
                                : "menu-item"
                        }
                    >
                        <span>⌂</span>
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
                        <span>◉</span>
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
                        <span>◈</span>
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
                        <span>✦</span>
                        Skills
                    </NavLink>


                    <NavLink
                        to="/messages"
                        className={({ isActive }) =>
                            isActive
                                ? "menu-item active"
                                : "menu-item"
                        }
                    >
                        <span>✉</span>
                        Messages
                    </NavLink>

                </nav>


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

            </aside>


            <main className="main-content">

                <header className="topbar">

                    <div>

                        <span className="welcome">
                            ADMIN WORKSPACE
                        </span>

                        <h1>
                            Portfolio Overview
                        </h1>

                        <p>
                            Manage your projects, skills, messages and
                            portfolio content from one place.
                        </p>

                    </div>


                    <button className="view-btn">
                        View Live Portfolio ↗
                    </button>

                </header>


                <section className="stats">


                    <Link
                        to="/projects"
                        className="stat-card purple"
                    >

                        <div className="stat-icon">
                        </div>

                        <div>

                            <span>
                                Total Projects
                            </span>

                            <h2>
                                {projectCount}
                            </h2>

                        </div>

                        <small>
                            Projects in database
                        </small>

                    </Link>



                    <Link
                        to="/skills"
                        className="stat-card blue"
                    >

                        <div className="stat-icon">
                        </div>

                        <div>

                            <span>
                                Skills
                            </span>

                            <h2>
                                {skillCount}
                            </h2>

                        </div>

                        <small>
                            Skills in database
                        </small>

                    </Link>



                    <Link
                        to="/messages"
                        className="stat-card pink"
                    >

                        <div className="stat-icon">
                            ✉
                        </div>

                        <div>

                            <span>
                                Messages
                            </span>

                            <h2>
                                {messageCount}
                            </h2>

                        </div>

                        <small>
                            {unreadCount} unread messages
                        </small>

                    </Link>

                </section>


                <section className="content-grid">


                    <div className="recent-card">

                        <div className="section-heading">

                            <div>

                                <span>
                                    PORTFOLIO ACTIVITY
                                </span>

                                <h2>
                                    Recent Projects
                                </h2>

                            </div>


                            <Link to="/projects">

                                <button>
                                    View all →
                                </button>

                            </Link>

                        </div>


                        <div className="project">

                            <div className="project-icon">
                                💻
                            </div>

                            <div className="project-info">

                                <h3>
                                    Portfolio Website
                                </h3>

                                <p>
                                    React • Node.js • MongoDB
                                </p>

                            </div>

                            <span className="status">
                                Live
                            </span>

                        </div>


                        <div className="project">

                            <div className="project-icon">
                                🎙️
                            </div>

                            <div className="project-info">

                                <h3>
                                    Text-to-Speech App
                                </h3>

                                <p>
                                    React • Express • Edge TTS
                                </p>

                            </div>

                            <span className="status">
                                Live
                            </span>

                        </div>


                        <div className="project">

                            <div className="project-icon">
                                🚀
                            </div>

                            <div className="project-info">

                                <h3>
                                    Portfolio CMS
                                </h3>

                                <p>
                                    React • Node.js • MongoDB • REST API
                                </p>

                            </div>

                            <span className="status">
                                Ongoing
                            </span>

                        </div>

                    </div>


                    <div className="quick-card">

                        <span>
                            QUICK ACTION
                        </span>

                        <h2>
                            Build your
                            <br />
                            developer story.
                        </h2>

                        <p>
                            Keep your portfolio content
                            organized and up to date.
                        </p>

                        <Link to="/projects">

                            <button>
                                + Add Project
                            </button>

                        </Link>

                    </div>

                </section>

            </main>

        </div>

    );

}


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/projects"
                    element={<Projects />}
                />

                <Route
                    path="/skills"
                    element={<Skills />}
                />

                <Route
                    path="/messages"
                    element={<Messages />}
                />

            </Routes>

        </BrowserRouter>

    );

}


export default App;