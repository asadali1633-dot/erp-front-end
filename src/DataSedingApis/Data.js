import React from 'react'

function Data() {

    const syncModules = async () => {
        const res = await fetch("http://localhost:5000/api/system/sync-modules", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }

        return res.json();
    };
    return (
        <div>
            <button
                onClick={async () => {
                    try {
                        const data = await syncModules();
                        alert(data.message);
                    } catch (e) {
                        alert(e.message);
                    }
                }}
            >
                Sync Modules & Permissions
            </button>


        </div>
    )
}

export default Data