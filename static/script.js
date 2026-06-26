const generateBtn = document.getElementById("generateBtn");
const courseInput = document.getElementById("course");
const output = document.getElementById("output");
const loading = document.getElementById("loading");

generateBtn.addEventListener("click", generateCourse);

// Generate Course
async function generateCourse() {

    const course = courseInput.value.trim();

    if (course === "") {
        alert("Please enter a course title.");
        courseInput.focus();
        return;
    }

    generateBtn.disabled = true;
    generateBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating...`;

    loading.style.display = "block";
    output.innerHTML = "";

    try {

        const response = await fetch("/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                course: course
            })

        });

        const data = await response.json();

        loading.style.display = "none";

        generateBtn.disabled = false;
        generateBtn.innerHTML =
            `<i class="fa-solid fa-wand-magic-sparkles"></i> Generate`;

        if (data.error) {

            output.innerHTML = `
                <div class="error">
                    <h2>❌ Error</h2>
                    <p>${data.error}</p>
                </div>
            `;

            return;
        }

        let html = "";

        // Course Title
        html += `
        <div class="card">
            <h2>📘 Course Title</h2>
            <p><strong>${course}</strong></p>
        </div>
        `;

        // Objective
        html += `
        <div class="card">
            <h2>🎯 Course Objective</h2>
            <p>${data.objective}</p>
        </div>
        `;

        // Syllabus
        html += `
        <div class="card">
            <h2>📚 Sample Syllabus</h2>
        `;

        data.syllabus.forEach((module, index) => {

            html += `
                <h3>📘 Module ${index + 1}: ${module.module}</h3>
                <ul>
            `;

            module.topics.forEach(topic => {

                html += `<li>${topic}</li>`;

            });

            html += `</ul>`;

        });

        html += `</div>`;

        // Learning Outcomes
        html += `
        <div class="card">
            <h2>🎓 Learning Outcomes</h2>
            <ul>
        `;

        data.learning_outcomes.forEach(item => {

            html += `
                <li>
                    ${item.outcome}<br>
                    <strong>Bloom's Level:</strong> ${item.blooms_level}
                </li>
            `;

        });

        html += `
            </ul>
        </div>
        `;

        // Assessment
        html += `
        <div class="card">
            <h2>📝 Assessment Methods</h2>

            <table class="assessment-table">

                <tr>
                    <th>Method</th>
                    <th>Weightage</th>
                </tr>
        `;

        data.assessment.forEach(item => {

            html += `
                <tr>
                    <td>${item.method}</td>
                    <td>${item.weight}</td>
                </tr>
            `;

        });

        html += `
            </table>
        </div>
        `;

        // Readings
        html += `
        <div class="card">
            <h2>📖 Recommended Readings</h2>
            <ol>
        `;

        data.readings.forEach(book => {

            html += `<li>${book}</li>`;

        });

        html += `
            </ol>
        </div>
        `;

        output.innerHTML = html;

    }

    catch (error) {

        loading.style.display = "none";

        generateBtn.disabled = false;

        generateBtn.innerHTML =
            `<i class="fa-solid fa-wand-magic-sparkles"></i> Generate`;

        output.innerHTML = `
            <div class="error">
                <h2>❌ Server Error</h2>
                <p>${error.message}</p>
            </div>
        `;

        console.error(error);

    }

}

// Copy Output
function copyText() {

    if (output.innerText.trim() === "") {
        alert("Nothing to copy.");
        return;
    }

    navigator.clipboard.writeText(output.innerText);

    alert("✅ Content copied successfully!");

}

// Clear
function clearOutput() {

    courseInput.value = "";

    output.innerHTML = `
        <div class="welcome-card">

            <h2>🎓 Welcome</h2>

            <p>
                Enter a course title and click
                <strong>Generate</strong>.
            </p>

            <ul>
                <li>🎯 Course Objective</li>
                <li>📚 Sample Syllabus</li>
                <li>🎓 Learning Outcomes</li>
                <li>📝 Assessment Methods</li>
                <li>📖 Recommended Readings</li>
            </ul>

        </div>
    `;

}

// Download PDF
function downloadPDF() {

    if (output.innerText.trim() === "") {

        alert("Nothing to download.");

        return;

    }

    const filename =
        courseInput.value.trim().replace(/\s+/g, "_") || "Course_Content";

    html2pdf().from(output).save(filename + ".pdf");

}

// Press Enter
courseInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        generateCourse();

    }

});