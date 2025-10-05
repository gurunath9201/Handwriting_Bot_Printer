# Handwriting Bot Printer 🖨️✍️

A Generative AI-powered application that converts digital text into realistic human-like handwriting.

## 📁 Project Structure
handwriting_bot_capstone/
├── 📂 backend/ # Flask API Server
│ ├── 📂 models/ # AI Models
│ │ ├── handwriting_generator.py
│ │ ├── text_processor.py
│ │ └── style_manager.py
│ ├── 📂 utils/ # Utilities
│ │ ├── image_utils.py
│ │ ├── paper_generator.py
│ │ └── font_utils.py
│ ├── 📂 fonts/ # Font Files
│ ├── app.py # Main Application
│ ├── config.py # Configuration
│ └── requirements.txt # Python Dependencies
│
├── 📂 frontend/ # React Application
│ ├── 📂 src/
│ │ ├── 📂 components/ # React Components
│ │ ├── 📂 pages/ # Page Components
│ │ ├── App.jsx # Main App Component
│ │ └── main.jsx # Entry Point
│ ├── package.json # Node Dependencies
│ └── vite.config.js # Vite Configuration
│
└── 📂 docs/ # Documentation

text

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
Server runs on: http://localhost:8000

Frontend Setup
bash
cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173

✨ Features
AI-Powered Handwriting: Realistic human-like text generation

Multi-Language Support: English & Hindi with auto-translation

Customizable Styles: Multiple handwriting styles

File Upload: Support for TXT and PDF files

High Quality Output: 300 DPI A4 format

Responsive Design: Works on all devices

🛠️ Technologies Used
Backend: Python, Flask, OpenCV, Pillow, NumPy
Frontend: React, Vite, CSS3
AI/ML: Perlin Noise, Bezier Curves, Custom Font Rendering
