
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let reports = [];
let nextId = 1;

// POST - Submit a new incident report
app.post("/report", (req, res) => {
    const { incidentType, description } = req.body;

    if (
        typeof incidentType !== "string" ||
        !["Phishing", "Suspicious Message",
          "Account Security", "Other"].includes(incidentType) ||
        typeof description !== "string" ||
        !description.trim()
    ) {
        return res.status(400).json({
            error: "Please provide valid incident details."
        });
    }

    const report = {
        id: nextId++,
        incidentType,
        description: description.trim(),
        status: "Submitted",
        date: new Date().toISOString()
    };

    reports.push(report);

    res.status(201).json({
        message: "Incident reported successfully!",
        report
    });
});

// GET - View submitted reports
app.get("/reports", (req, res) => {
    res.json(reports);
});

// GET - View a specific report
app.get("/reports/:id", (req, res) => {
    const report = reports.find(
        r => r.id === Number(req.params.id)
    );

    if (!report) {
        return res.status(404).json({
            error: "Report not found."
        });
    }

    res.json(report);
});

app.listen(3000, () => {
    console.log("CyberAware running at http://localhost:3000");
});
