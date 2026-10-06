import { useEffect, useState } from "react";

function Skills() {

    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        level: "Beginner",
        icon: "",
        description: ""
    });


    // ==========================================
    // GET SKILLS
    // ==========================================

    const fetchSkills = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/skills"
            );

            const data = await response.json();

            if (data.success) {
                setSkills(data.data);
            }

        } catch (error) {

            console.error("Error fetching skills:", error);

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // LOAD SKILLS
    // ==========================================

    useEffect(() => {

        fetchSkills();

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

    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {

        setFormData({
            name: "",
            category: "",
            level: "Beginner",
            icon: "",
            description: ""
        });

        setEditingId(null);

        setShowForm(false);

    };


    // ==========================================
    // ADD / UPDATE SKILL
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {

            alert("Please login first.");

            return;
        }


        try {

            let response;


            // UPDATE

            if (editingId) {

                response = await fetch(
                    `http://localhost:5000/api/skills/${editingId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },

                        body: JSON.stringify(formData)
                    }
                );

            }

            // CREATE

            else {

                response = await fetch(
                    "http://localhost:5000/api/skills",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },

                        body: JSON.stringify(formData)
                    }
                );

            }


            const data = await response.json();


            if (data.success) {

                alert(
                    editingId
                        ? "Skill updated successfully!"
                        : "Skill added successfully!"
                );

                resetForm();

                fetchSkills();

            } else {

                alert(data.message || "Something went wrong.");

            }

        } catch (error) {

            console.error("Skill save error:", error);

            alert("Server error. Please try again.");

        }

    };


    // ==========================================
    // EDIT SKILL
    // ==========================================

    const handleEdit = (skill) => {

        setFormData({
            name: skill.name || "",
            category: skill.category || "",
            level: skill.level || "Beginner",
            icon: skill.icon || "",
            description: skill.description || ""
        });

        setEditingId(skill._id);

        setShowForm(true);

    };


    // ==========================================
    // DELETE SKILL
    // ==========================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this skill?"
        );


        if (!confirmDelete) {
            return;
        }


        const token = localStorage.getItem("token");


        if (!token) {

            alert("Please login first.");

            return;
        }


        try {

            const response = await fetch(
                `http://localhost:5000/api/skills/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );


            const data = await response.json();


            if (data.success) {

                alert("Skill deleted successfully!");

                fetchSkills();

            } else {

                alert(data.message || "Delete failed.");

            }

        } catch (error) {

            console.error("Delete error:", error);

            alert("Server error.");

        }

    };


    return (

        <div className="dashboard">

            <main className="main-content">


                {/* ==========================================
                    HEADER
                ========================================== */}

                <header className="topbar">

                    <div>

                        <span className="welcome">
                            CONTENT MANAGEMENT
                        </span>

                        <h1>
                            Skills
                        </h1>

                        <p>
                            Manage your technical skills
                            from the CMS dashboard.
                        </p>

                    </div>


                    <button
                        className="view-btn"
                        onClick={() => {

                            if (showForm) {
                                resetForm();
                            } else {
                                setShowForm(true);
                            }

                        }}
                    >

                        {showForm
                            ? "Cancel"
                            : "+ Add Skill"
                        }

                    </button>

                </header>



                {/* ==========================================
                    ADD / EDIT FORM
                ========================================== */}

                {showForm && (

                    <section className="recent-card skill-form-card">

                        <div className="section-heading">

                            <div>

                                <span>
                                    SKILL MANAGEMENT
                                </span>

                                <h2>
                                    {editingId
                                        ? "Edit Skill"
                                        : "Add New Skill"
                                    }
                                </h2>

                            </div>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="form-grid">


                                {/* Skill Name */}

                                <div className="form-group">

                                    <label>
                                        Skill Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. React.js"
                                        required
                                    />

                                </div>


                                {/* Category */}

                                <div className="form-group">

                                    <label>
                                        Category
                                    </label>

                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        placeholder="e.g. Frontend"
                                        required
                                    />

                                </div>


                                {/* Level */}

                                <div className="form-group">

                                    <label>
                                        Skill Level
                                    </label>

                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                    >

                                        <option value="Beginner">
                                            Beginner
                                        </option>

                                        <option value="Intermediate">
                                            Intermediate
                                        </option>

                                        <option value="Advanced">
                                            Advanced
                                        </option>

                                    </select>

                                </div>


                                {/* Icon */}

                                <div className="form-group">

                                    <label>
                                        Icon
                                    </label>

                                    <input
                                        type="text"
                                        name="icon"
                                        value={formData.icon}
                                        onChange={handleChange}
                                        placeholder="e.g. ⚛️"
                                    />

                                </div>

                            </div>


                            {/* Description */}

                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your experience with this skill..."
                                    rows="4"
                                />

                            </div>


                            <div className="form-actions">

                                <button
                                    type="submit"
                                    className="save-btn"
                                >

                                    {editingId
                                        ? "Update Skill"
                                        : "Save Skill"
                                    }

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

                    </section>

                )}



                {/* ==========================================
                    SKILLS LIST
                ========================================== */}

                <section className="content-grid">

                    <div className="recent-card">

                        <div className="section-heading">

                            <div>

                                <span>
                                    TECHNICAL SKILLS
                                </span>

                                <h2>
                                    My Skills
                                </h2>

                            </div>

                        </div>


                        {loading ? (

                            <p>
                                Loading skills...
                            </p>

                        ) : skills.length === 0 ? (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    ✦
                                </div>

                                <h3>
                                    No skills added yet
                                </h3>

                                <p>
                                    Start building your technical
                                    profile by adding your first skill.
                                </p>

                                <button
                                    className="save-btn"
                                    onClick={() => setShowForm(true)}
                                >
                                    + Add Your First Skill
                                </button>

                            </div>

                        ) : (

                            skills.map((skill) => (

                                <div
                                    className="project skill-item"
                                    key={skill._id}
                                >


                                    <div className="project-icon">

                                        {skill.icon || "✦"}

                                    </div>


                                    <div className="project-info">

                                        <h3>
                                            {skill.name}
                                        </h3>

                                        <p>

                                            {skill.category}

                                            {" • "}

                                            {skill.level}

                                        </p>


                                        {skill.description && (

                                            <small>
                                                {skill.description}
                                            </small>

                                        )}

                                    </div>


                                    <span className="status">
                                        Active
                                    </span>


                                    <div className="skill-actions">

                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                handleEdit(skill)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(skill._id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>


                    {/* ==========================================
                        SIDE CARD
                    ========================================== */}

                    <div className="quick-card">

                        <span>
                            SKILLS MANAGEMENT
                        </span>

                        <h2>

                            Build your

                            <br />

                            technical profile.

                        </h2>

                        <p>

                            Add, update and manage your
                            technical skills from the CMS.

                        </p>


                        <div className="skill-summary">

                            <strong>
                                {skills.length}
                            </strong>

                            <span>
                                Total Skills
                            </span>

                        </div>

                    </div>

                </section>

            </main>

        </div>

    );

}

export default Skills;