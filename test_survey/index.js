// const survey = new Survey.Model(json);
// survey.onComplete.add((sender, options) => {
//     console.log(JSON.stringify(sender.data, null, 3));
// });
// survey.render(document.getElementById("surveyElement"));


const survey = new Survey.Model(json);

survey.onComplete.add((sender, options) => {
    const data = sender.data;

    // optional: get participant_id and claim_id from URL
    const urlParams = new URLSearchParams(window.location.search);
    const participant_id = urlParams.get("pid") || "unknown";
    const claim_id = urlParams.get("claim") || null;

    // attach to survey data
    data.participant_id = participant_id;
    if (claim_id) data.claim_id = claim_id;

    console.log("Survey data to send:", JSON.stringify(data, null, 2));

    // POST to Netlify function
    fetch("http://localhost:8888/.netlify/functions/save_results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resp => console.log("Saved successfully:", resp))
    .catch(err => console.error("Error saving survey:", err));
});

survey.render(document.getElementById("surveyElement"));
