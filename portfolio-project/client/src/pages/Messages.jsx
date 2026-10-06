import { useEffect, useState } from "react";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/messages",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setMessages(data.messages);
            } else {
                alert(data.message || "Failed to load messages");
            }
        } catch (error) {
            console.error("Fetch messages error:", error);
            alert("Cannot connect to backend");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/messages/${id}/read`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                fetchMessages();
            } else {
                alert(data.message || "Failed to update message");
            }
        } catch (error) {
            console.error("Mark read error:", error);
        }
    };

    const deleteMessage = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/messages/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Message deleted successfully");
                fetchMessages();
            } else {
                alert(data.message || "Failed to delete message");
            }
        } catch (error) {
            console.error("Delete message error:", error);
        }
    };

    if (loading) {
        return (
            <div className="main-content">
                <h1>Messages</h1>
                <p>Loading messages...</p>
            </div>
        );
    }

    return (
        <div className="main-content">

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px"
            }}>
                <div>
                    <span className="welcome">INBOX</span>
                    <h1>Messages</h1>
                    <p>Manage messages received from your portfolio visitors.</p>
                </div>

                <div style={{
                    background: "#151E30",
                    padding: "12px 20px",
                    borderRadius: "10px"
                }}>
                    <strong>{messages.length}</strong> Messages
                </div>
            </div>

            {messages.length === 0 ? (
                <div style={{
                    background: "#151E30",
                    padding: "40px",
                    borderRadius: "14px",
                    textAlign: "center"
                }}>
                    <h2>No messages yet</h2>
                    <p>Visitor messages will appear here.</p>
                </div>
            ) : (
                <div>
                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            style={{
                                background: "#151E30",
                                padding: "24px",
                                marginBottom: "18px",
                                borderRadius: "14px",
                                border: "1px solid #24304A"
                            }}
                        >

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start"
                            }}>

                                <div>
                                    <h2 style={{ marginBottom: "6px" }}>
                                        {msg.name}
                                    </h2>

                                    <p style={{
                                        margin: "4px 0",
                                        opacity: 0.8
                                    }}>
                                        📧 {msg.email}
                                    </p>
                                </div>

                                <span style={{
                                    padding: "6px 12px",
                                    borderRadius: "20px",
                                    background:
                                        msg.status === "read"
                                            ? "#24304A"
                                            : "#D4AF6A",
                                    color:
                                        msg.status === "read"
                                            ? "#F5F3ED"
                                            : "#0B1120",
                                    fontSize: "12px",
                                    fontWeight: "600"
                                }}>
                                    {msg.status === "read"
                                        ? "READ"
                                        : "UNREAD"}
                                </span>

                            </div>

                            <hr style={{
                                border: "none",
                                borderTop: "1px solid #24304A",
                                margin: "18px 0"
                            }} />

                            <h3>{msg.subject || "No Subject"}</h3>

                            <p style={{
                                lineHeight: "1.7",
                                marginTop: "10px"
                            }}>
                                {msg.message}
                            </p>

                            <p style={{
                                fontSize: "13px",
                                opacity: 0.6,
                                marginTop: "15px"
                            }}>
                                Received:{" "}
                                {new Date(msg.createdAt).toLocaleString()}
                            </p>

                            <div style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "20px"
                            }}>

                                {msg.status !== "read" && (
                                    <button
                                        onClick={() =>
                                            markAsRead(msg._id)
                                        }
                                        style={{
                                            padding: "9px 16px",
                                            border: "none",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            background: "#D4AF6A",
                                            color: "#0B1120",
                                            fontWeight: "600"
                                        }}
                                    >
                                        ✓ Mark as Read
                                    </button>
                                )}

                                <button
                                    onClick={() =>
                                        deleteMessage(msg._id)
                                    }
                                    style={{
                                        padding: "9px 16px",
                                        border: "1px solid #7F1D1D",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        background: "transparent",
                                        color: "#FCA5A5"
                                    }}
                                >
                                    🗑 Delete
                                </button>

                            </div>

                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default Messages;