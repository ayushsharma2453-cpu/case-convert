const input = document.getElementById("inputText");

input.addEventListener("input", updateCounts);

function updateCounts() {
    const text = input.value;

    document.getElementById("charCount").innerText = text.length;
    document.getElementById("wordCount").innerText =
        text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    document.getElementById("sentenceCount").innerText =
        text.split(/[.!?]+/).filter(Boolean).length;
    document.getElementById("lineCount").innerText =
        text.split("\n").length;
}

async function convertCase(type) {
    const text = input.value;

    const res = await fetch(`/api/convert?text=${encodeURIComponent(text)}&type=${type}`);
    const data = await res.json();

    input.value = data.result;
    updateCounts();
}

function copyText() {
    input.select();
    document.execCommand("copy");
    alert("Copied!");
}

function clearText() {
    input.value = "";
    updateCounts();
}

function downloadText() {
    const blob = new Blob([input.value], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted-text.txt";
    link.click();
}