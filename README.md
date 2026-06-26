# 🎓 AI Course Content Generator

## 📌 Project Overview

The **AI Course Content Generator** is a web-based application that automatically generates educational course content using **Groq AI**. Users simply enter a course title, and the application generates a complete course outline including objectives, syllabus, learning outcomes, assessment methods, and recommended readings.

This project is developed using **Python (Flask)** for the backend, **HTML, CSS, and JavaScript** for the frontend, and the **Groq API** for AI-powered content generation.

---

# 🚀 Features

* Generate course content from a course title
* AI-generated Course Objective
* AI-generated Sample Syllabus
* Three measurable Learning Outcomes based on Bloom's Taxonomy
* Assessment Methods with weightage
* Recommended Readings
* Professional responsive user interface
* Copy generated content
* Download content as PDF
* Error handling for invalid input and API failures
* Secure API key management using `.env`

---

# 🛠 Technologies Used

* Python 3
* Flask
* HTML5
* CSS3
* JavaScript
* Groq API
* python-dotenv

---

# 📂 Project Structure

```
CourseGenerator/
│
├── app.py
├── requirements.txt
├── README.md
├── .env.example
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js
```

---

# ⚙ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

or download the project as a ZIP file.

---

### 2. Open the project folder

```bash
cd CourseGenerator
```

---

### 3. Create a virtual environment

Windows

```bash
python -m venv venv
```

Activate

```bash
venv\Scripts\activate
```

---

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

---

### 5. Configure the API key

Create a file named `.env`

```
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

### 6. Run the application

```bash
python main.py
```

---

### 7. Open the browser

```
http://127.0.0.1:5000
```

---

# 🖥 How It Works

1. User enters a course title.
2. Flask receives the request.
3. The backend sends a prompt to the Groq API.
4. Groq generates structured course content.
5. Flask returns the generated data to the frontend.
6. JavaScript displays the content in organized sections.

---

# 📖 Sample Output

For the course title:

```
Operating Systems
```

The application generates:

* Course Objective
* Five-module syllabus
* Three Bloom's Taxonomy learning outcomes
* Assessment methods
* Recommended readings

---

# 🔒 Data Privacy

* API keys are stored securely in a `.env` file.
* No user data is stored permanently.
* User input is processed only for content generation.

---

# 🎯 Bloom's Taxonomy

The generated learning outcomes follow Bloom's Taxonomy levels such as:

* Remember
* Understand
* Apply
* Analyze
* Evaluate
* Create

---

# 📷 Screenshots

Include screenshots of:

* Home Page 
* Course Input
* Generated Course Content
* PDF Download

---

# 🔮 Future Enhancements

* Dark Mode
* Multiple AI Models
* Export to Word
* Export to Excel
* User Authentication
* Course History
* Database Integration
* Multi-language Support

---

# 👨‍💻 Developed By

**Name:** Palak Dwivedi

**Course:** B.Tech CSE(AI/ML)

**College:** Uttaranchal Institute Of Technology

**Year:** 2nd 

---

# 📜 License

This project is developed for educational purposes.

© 2026 All Rights Reserved.
