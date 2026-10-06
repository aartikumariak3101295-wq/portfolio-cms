import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
        liveLink: "",
        image: "",
        status: "completed"
    });

    const fetchProjects = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/projects"
            );

            const data = await response.json();

            if (data.success) {
                setProjects(data.projects || []);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            return;
        }

        try {
            const projectData = {
                title: formData.title,
                description: formData.description,
                technologies: formData.technologies
                    .split(",")
                    .map((tech) => tech.trim())
                    .filter((tech) => tech !== ""),
                githubLink: formData.githubLink,
                liveLink: formData.liveLink,
                image: formData.image,
                status: formData.status
            };

            const url = editingId
                ? `http://localhost:5000/api/projects/${editingId}`
                : "http://localhost:5000/api/projects";

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(projectData)
            });

            const data = await response.json();

            if (data.success) {
                alert(
                    editingId
                        ? "Project updated successfully!"
                        : "Project added successfully!"
                );

                resetForm();
                fetchProjects();
            } else {
                alert(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Project save error:", error);
            alert("Server error. Please try again.");
        }
    };

    const handleEdit = (project) => {
        setEditingId(project._id);

        setFormData({
            title: project.title || "",
            description: project.description || "",
            technologies: Array.isArray(project.technologies)
                ? project.technologies.join(", ")
                : "",
            githubLink: project.githubLink || "",
            liveLink: project.liveLink || "",
            image: project.image || "",
            status: project.status || "completed"
        });

        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmDelete) {
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:5000/api/projects/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Project deleted successfully!");
                fetchProjects();
            } else {
                alert(data.message || "Delete failed.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Server error. Please try again.");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            technologies: "",
            githubLink: "",
            liveLink: "",
            image: "",
            status: "completed"
        });

        setEditingId(null);
        setShowForm(false);
    };

    return (
        <div className="dashboard">

            {/* SIDEBAR */}
            <aside className="sidebar">

                <div className="brand">
                    <div className="brand-logo">P</div>

                    <div>
                        <h2>Portfolio</h2>
                        <span>CMS PANEL</span>
                    </div>
                </div>

                <div className="menu-title">
                    MAIN MENU
                </div>

                <nav>

                    <NavLink
                        to="/"
                        className="menu-item"
                    >
                        <span>⌂</span>
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/about"
                        className="menu-item"
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
                        className="menu-item"
                    >
                        <span>✦</span>
                        Skills
                    </NavLink>

                    <div className="menu-item">
                        <span>✉</span>
                        Messages
                    </div>

                </nav>

                <div className="admin-box">

                    <div className="avatar">
                        A
                    </div>

                    <div>
                        <strong>Admin</strong>
                        <small>Administrator</small>
                    </div>

                    <span className="logout">
                        ↪
                    </span>

                </div>

            </aside>


            {/* MAIN CONTENT */}
            <main className="main-content">

                <header className="topbar">

                    <div>
                        <span className="welcome">
                            CONTENT MANAGEMENT
                        </span>

                        <h1>Projects</h1>

                        <p>
                            Manage your portfolio projects from here.
                        </p>
                    </div>

                    <button
                        className="add-project-btn"
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                    >
                        + Add Project
                    </button>

                </header>


                {/* FORM */}

                {showForm && (
                    <div className="cms-card project-form-card">

                        <div className="cms-section-title">

                            <div>
                                <span>
                                    PROJECT MANAGEMENT
                                </span>

                                <h2>
                                    {editingId
                                        ? "Edit Project"
                                        : "Add New Project"}
                                </h2>
                            </div>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="form-group">

                                <label>
                                    Project Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter project title"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your project"
                                    rows="5"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Technologies
                                </label>

                                <input
                                    type="text"
                                    name="technologies"
                                    value={formData.technologies}
                                    onChange={handleChange}
                                    placeholder="React, Node.js, MongoDB"
                                />

                                <small>
                                    Separate technologies using commas.
                                </small>

                            </div>


                            <div className="form-row">

                                <div className="form-group">

                                    <label>
                                        GitHub Link
                                    </label>

                                    <input
                                        type="text"
                                        name="githubLink"
                                        value={formData.githubLink}
                                        onChange={handleChange}
                                        placeholder="GitHub repository URL"
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Live Project Link
                                    </label>

                                    <input
                                        type="text"
                                        name="liveLink"
                                        value={formData.liveLink}
                                        onChange={handleChange}
                                        placeholder="Live project URL"
                                    />

                                </div>

                            </div>


                            <div className="form-row">

                                <div className="form-group">

                                    <label>
                                        Project Image URL
                                    </label>

                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="Project image URL"
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="completed">
                                            Completed
                                        </option>

                                        <option value="ongoing">
                                            Ongoing
                                        </option>

                                        <option value="planned">
                                            Planned
                                        </option>
                                    </select>

                                </div>

                            </div>


                            <div className="form-actions">

                                <button
                                    type="submit"
                                    className="save-btn"
                                >
                                    {editingId
                                        ? "Update Project"
                                        : "Save Project"}
                                </button>

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>
                )}


                {/* PROJECT LIST */}

                <div className="projects-section">

                    <div className="projects-heading">

                        <div>
                            <span>
                                YOUR WORK
                            </span>

                            <h2>
                                Portfolio Projects
                            </h2>
                        </div>

                        <div className="project-count">
                            {projects.length} Projects
                        </div>

                    </div>


                    {loading ? (

                        <div className="empty-projects">
                            Loading projects...
                        </div>

                    ) : projects.length === 0 ? (

                        <div className="empty-projects">

                            <div className="empty-icon">
                                ◈
                            </div>

                            <h3>
                                No Projects Yet
                            </h3>

                            <p>
                                Add your first portfolio project.
                            </p>

                        </div>

                    ) : (

                        <div className="project-grid">

                            {projects.map((project) => (

                                <div
                                    className="project-card"
                                    key={project._id}
                                >

                                    <div className="project-image">

                                        {project.image ? (

                                            <img
                                                src={project.image}
                                                alt={project.title}
                                            />

                                        ) : (

                                            <div className="project-placeholder">
                                                ◈
                                            </div>

                                        )}

                                        <span
                                            className={`project-status ${project.status}`}
                                        >
                                            {project.status}
                                        </span>

                                    </div>


                                    <div className="project-content">

                                        <h3>
                                            {project.title}
                                        </h3>

                                        <p>
                                            {project.description}
                                        </p>


                                        <div className="technology-list">

                                            {project.technologies?.map(
                                                (tech, index) => (

                                                    <span
                                                        key={index}
                                                    >
                                                        {tech}
                                                    </span>

                                                )
                                            )}

                                        </div>


                                        <div className="project-links">

                                            {project.githubLink && (
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    GitHub
                                                </a>
                                            )}

                                            {project.liveLink && (
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Live Demo
                                                </a>
                                            )}

                                        </div>


                                        <div className="project-actions">

                                            <button
                                                onClick={() =>
                                                    handleEdit(project)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        project._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

export default Projects;