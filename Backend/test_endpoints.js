
const BASE_URL = 'http://localhost:3000';

async function runTests() {
    let entryId;
    console.log("Starting tests...");

    // Wait for server to potentially start
    await new Promise(r => setTimeout(r, 2000));

    // Test POST
    try {
        console.log("Testing POST /...");
        const res = await fetch(BASE_URL + '/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                siteURL: 'https://example.com',
                userName: 'testuser',
                password: 'password123'
            })
        });
        if (res.status === 201) {
            console.log("POST Success");
        } else {
            console.error("POST Failed", res.status, await res.text());
        }
    } catch (e) {
        console.error("POST Error (Server might not be running)", e.message);
        return;
    }

    // Test GET
    try {
        console.log("Testing GET /...");
        const res = await fetch(BASE_URL + '/');
        const data = await res.json();
        console.log("GET Success, count:", data.length);
        const entry = data.find(d => d.userName === 'testuser');
        if (entry) {
            entryId = entry.id;
            console.log("Found entry ID:", entryId);
        } else {
            console.error("New entry not found in GET response");
        }
    } catch (e) {
        console.error("GET Error", e);
    }

    if (entryId) {
        // Test PUT
        try {
            console.log("Testing PUT /...");
            const res = await fetch(BASE_URL + '/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: entryId,
                    siteURL: 'https://example.updated.com',
                    userName: 'testuser_updated',
                    password: 'newpassword'
                })
            });
            if (res.status === 200) {
                console.log("PUT Success");
            } else {
                console.error("PUT Failed", res.status, await res.text());
            }
        } catch (e) {
            console.error("PUT Error", e);
        }

        // Test DELETE
        try {
            console.log("Testing DELETE /...");
            const res = await fetch(BASE_URL + '/', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: entryId
                })
            });
            if (res.status === 200) {
                console.log("DELETE Success");
            } else {
                console.error("DELETE Failed", res.status, await res.text());
            }
        } catch (e) {
            console.error("DELETE Error", e);
        }

    }
}

runTests();
