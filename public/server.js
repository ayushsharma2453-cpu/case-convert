const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/convert", (req, res) => {
    const { text, type } = req.query;
    if (!text) return res.json({ result: "" });

    let result = text;

    switch (type) {
        case "upper":
            result = text.toUpperCase();
            break;

        case "lower":
            result = text.toLowerCase();
            break;

        case "capitalize":
            result = text
                .toLowerCase()
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            break;

        case "inverse":
            result = text
                .split("")
                .map(c =>
                    c === c.toUpperCase()
                        ? c.toLowerCase()
                        : c.toUpperCase()
                )
                .join("");
            break;

        case "alternate":
            result = text
                .split("")
                .map((c, i) =>
                    i % 2 === 0
                        ? c.toLowerCase()
                        : c.toUpperCase()
                )
                .join("");
            break;

        case "sentence":
            result = text
                .toLowerCase()
                .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
            break;

        case "title":
            result = text
                .toLowerCase()
                .split(" ")
                .map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join(" ");
            break;

        default:
            result = text;
    }

    res.json({ result });
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});