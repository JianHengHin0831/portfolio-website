# JIAN: A Cognitive AI Interface Portfolio

This project reimagines the personal portfolio as an immersive, interactive experience. Built for the DevOne Hackathon 2025, it presents my skills and projects through a futuristic terminal and a complementary graphical user interface, powered by an AI assistant.

![website_portfolio_demo (online-video-cutter com)](https://github.com/user-attachments/assets/ca612235-df75-4105-810f-b3df84ac96b9)

<img width="1917" height="852" alt="image" src="https://github.com/user-attachments/assets/aeacbe08-48e4-426a-91b5-374124afa988" />

<img width="1914" height="869" alt="image" src="https://github.com/user-attachments/assets/b9b6698d-2661-48b8-978a-03d6d165e74f" />

<img width="1915" height="842" alt="image" src="https://github.com/user-attachments/assets/19a90efb-1a9f-48a7-8392-597d870fc4a9" />


## Key Features

*   **Dual-Mode Interface:** Start in a fully functional terminal for a power-user experience, or switch to a polished Visual Mode for a graphical overview.
*   **Interactive Terminal:** Supports a range of commands (e.g., `help`, `skills`, `projects`), command history (up/down arrows), and `--gui` flags to directly navigate to visual pages.
*   **AI-Powered Chatbot:** "JIAN" is an integrated AI assistant powered by the OpenAI API. It's context-aware of my projects and skills, capable of answering natural language questions.
*   **Immersive FUI Design:** The entire interface is built with a consistent sci-fi theme, featuring custom animations, subtle sound effects, and a high-tech aesthetic.
*   **Comprehensive Content:** Includes all required sections: a dynamic project showcase with pop-out modals, an interactive skills dashboard, an animated experience timeline, and a themed contact page.

## Tech Stack

*   **Frontend:** Nuxt.js 3 (Vue.js), Tailwind CSS
*   **AI Layer:** OpenAI API (GPT models)
*   **Deployment:** Vercel

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or newer)
*   npm

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/JianHengHin0831/portfolio-website.git
    cd your-repo-name
    ```

2.  **Create the environment file:**
    Create a `.env` file in the root of the project and fill in the required variables (see Configuration section below).

3.  **Install frontend dependencies:**
    ```sh
    npm install
    ```

### Running the Application

1.  **Run the Nuxt.js frontend:**
    From the root directory:
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.


## Configuration

The following environment variables must be set in your `.env` file for the application to function correctly.

```
# For OpenAI API access
OPENAI_API_KEY="sk-..."

```

---
## Online Deployment
https://portfolio-website-omega-nine-92.vercel.app/
