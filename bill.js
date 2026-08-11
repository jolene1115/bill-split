

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
}

loadBill();