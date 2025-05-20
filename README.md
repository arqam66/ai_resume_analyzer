# AI Resume Analyzer

AI Resume Analyzer is a web-based application that allows recruiters and hiring teams to analyze and compare resumes against a job description using Natural Language Processing (NLP) techniques. Users can upload multiple resumes in PDF format and receive a relevance score for each resume to help streamline the hiring process.

## Features

- Upload a job description and multiple PDF resumes
- Parse and extract text from resumes and job descriptions
- Analyze relevance using cosine similarity
- Score and rank candidates based on match quality
- Clean, interactive user interface

## Tech Stack

- TypeScript
- Node.js / Express (for backend)
- React / Next.js (for frontend, if applicable)
- pdf-parse or similar library for PDF text extraction
- Natural language processing with libraries like `natural` or custom logic
- Cosine similarity algorithm for text comparison

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:

   git clone https://github.com/arqam66/ai_resume_analyzer.git  
   cd ai_resume_analyzer

2. Install dependencies:

   npm install  
   # or  
   yarn install

3. (Optional) Configure environment variables if needed in a `.env` file.

### Running the App

Start the development server:

   npm run dev  
   # or  
   yarn dev

The app will be available at `http://localhost:3000` (or the specified port).

## Project Structure

   ai_resume_analyzer/
   ├── src/
   │   ├── components/          # Reusable UI components
   │   ├── pages/               # Frontend routing (if using Next.js)
   │   ├── utils/               # Text processing and similarity logic
   │   └── types/               # TypeScript type definitions
   ├── public/                  # Static assets
   ├── package.json             # Project metadata and scripts
   ├── tsconfig.json            # TypeScript configuration
   └── README.md                # Documentation

## How It Works

1. Users upload a job description and one or more resumes (PDF).
2. Text is extracted from all files using PDF parsing.
3. Each resume is tokenized and compared to the job description.
4. Cosine similarity is calculated to score each resume.
5. Results are sorted and displayed with relevance percentages.

## Limitations

- PDF formatting may affect text extraction
- Currently supports English-language resumes only
- Basic NLP approach; may not handle semantic meaning or synonyms deeply

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome. Feel free to fork the repo and submit a pull request or open an issue.

---

Created by [@arqam66](https://github.com/arqam66)
