
const form= document.getElementById("create-form");
const errorEl= document.getElementById("form-error");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop the browser's default full-page reload on submit
    errorEl.hidden = true; // clear any error shown from a previous failed attempt

    const title = document.getElementById("title").value.trim();
    const taxPercent = parseFloat(document.getElementById("tax").value) || 0;
    const tipPercent = parseFloat(document.getElementById("tip").value) || 0;

    const submitButton = form.querySelector("button");
    submitButton.disabled = true; // prevent double-submitting while we wait on the network
    submitButton.textContent = "Creating...";


    // insert a new row into bills, then ask Supabase to hand back the created
    // row (including its auto-generated id) so we can redirect to it
    const{data, error} = await db
        .from("bills")
        .insert({title, tax_percent: taxPercent, tip_percent: tipPercent})
        .select()
        .single();
    
    if (error) {
        errorEl.textContent = "Couldn't create the bill: " + error.message;
        errorEl.hidden = false;
        submitButton.disabled = false;
        submitButton.textContent = "Start splitting";
        return; // stop here — don't redirect if the insert failed
    }

    // the bill's id becomes part of the shareable URL
    window.location.href = `bill.html?id=${data.id}`;
});
