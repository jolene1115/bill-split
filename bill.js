
let participants = [];
let billId = null;

async function loadBill() {
    const params = new URLSearchParams(window.location.search);
    billId = params.get("id");

    const {data, error} = await db
        .from("bills")
        .select("*")
        .eq("id", billId)
        .single();

    console.log("data:", data);
    console.log("error:", error);


    // if the bill doesn't exist, bail out early
    if (error || !data) {
        document.getElementById("bill-content").hidden = true;
        const errorEl = document.getElementById("bill-error");
        errorEl.textContent = "Couldn't find that bill -- double check the link.";
        errorEl.hidden = false;
        return; // stop here, don't try to fill in a bill that does not exist
    }

    const {data: participantsData} = await db
        .from("participants")
        .select("*")
        .eq("bill_id", billId);

    // store the fetched participants into the shared variable, then render
    participants = participantsData;
    renderParticipants();

    console.log(participantsData)


    document.getElementById("bill-title").textContent = data.title;
    document.getElementById("bill-tax").textContent = `${data.tax_percent}%`;
    document.getElementById("bill-tip").textContent = `${data.tip_percent}%`;
}

// turns the current particiapnts array into chip HTML and displays it
function renderParticipants() {
    const participantsListEl = document.getElementById("participants-list");
    const chipsHtml = participants.map((p) => {
        return `<span class="chip">${p.name}</span>`;
    }).join("");   
    participantsListEl.innerHTML = chipsHtml;
}

    document.getElementById("add-participant").addEventListener("click", async() => {
        const input = document.getElementById("participant-name")
        const name = input.value.trim();

        if (!name) return;

        const {data, error} = await db
            .from("participants")
            .insert({bill_id: billId, name:name, color: '#FFD966'})
            .select()
            .single();
        
        if (error) {
            alert("Couldn't add person: " + error.message);
            return;
        }

        participants.push(data);
        input.value = "";
        renderParticipants()
    });

loadBill();

