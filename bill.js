

async function loadBill() {
const params = new URLSearchParams(window.location.search);
const billId = params.get("id");

const {data, error} = await db
    .from("bills")
    .select("*")
    .eq("id", billId)
    .single();

console.log("data:", data);
console.log("error:", error);

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

console.log(participantsData)

const participantsListEl = document.getElementById("participants-list");

const chipsHtml = participantsData.map((p) => {
    return `<span class="chip">${p.name}</span>`;
}).join("");

participantsListEl.innerHTML = chipsHtml;

document.getElementById("bill-title").textContent = data.title;
document.getElementById("bill-tax").textContent = `${data.tax_percent}%`;
document.getElementById("bill-tip").textContent = `${data.tip_percent}%`;

}

loadBill();

