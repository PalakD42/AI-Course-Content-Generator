from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from groq import Groq
import os
import json

# Load .env
load_dotenv()

app = Flask(__name__)

# Groq API Key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found in .env file")

# Groq Client
client = Groq(api_key=GROQ_API_KEY)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():

    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data received."}), 400

        course = data.get("course", "").strip()

        if not course:
            return jsonify({"error": "Please enter a course title."}), 400

        prompt = f"""
You are an expert academic curriculum designer.

Generate educational content for the course:

{course}

IMPORTANT:
Return ONLY valid JSON.
Do NOT use markdown.
Do NOT add explanations.
Do NOT wrap JSON inside ```.

Use this exact structure:

{{
    "objective":"",

    "syllabus":[
        {{
            "module":"",
            "topics":[
                "",
                "",
                ""
            ]
        }}
    ],

    "learning_outcomes":[
        {{
            "outcome":"",
            "blooms_level":""
        }}
    ],

    "assessment":[
        {{
            "method":"",
            "weight":""
        }}
    ],

    "readings":[
        ""
    ]
}}

Requirements:

1. Objective:
One concise paragraph.

2. Syllabus:
Exactly 5 modules.
Each module must contain 3 topics.

3. Learning Outcomes:
Exactly 3 outcomes.
Mention Bloom's Taxonomy level.

4. Assessment:
Provide percentage distribution.

5. Readings:
Exactly 5 recommended books/resources with authors whenever possible.
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.5,
            max_tokens=1800
        )

        answer = response.choices[0].message.content.strip()

        # Remove accidental markdown fences if present
        if answer.startswith("```"):
            answer = answer.replace("```json", "")
            answer = answer.replace("```", "")
            answer = answer.strip()

        try:
            result = json.loads(answer)
        except json.JSONDecodeError:
            return jsonify({
                "error": "AI returned an invalid response. Please try again."
            }), 500

        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)