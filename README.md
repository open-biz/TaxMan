# TaxMan 🤖💼

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![made-with-hume](https://img.shields.io/badge/Made%20with-Hume%20AI-orange)](https://hume.ai)
[![built-with-resend](https://img.shields.io/badge/Built%20with-Resend-green)](https://resend.com)
[![powered-by-nebius](https://img.shields.io/badge/Powered%20by-Nebius-purple)](https://nebius.com)
[![powered-by-anthropic](https://img.shields.io/badge/Powered%20by-Anthropic-teal)](https://anthropic.com)
[![platform-node](https://img.shields.io/badge/Platform-Node.js-lightgrey)](https://nodejs.org/)

The AI-powered financial co-pilot for e-commerce entrepreneurs, guiding them from scaling to a profitable and tax-efficient exit.

For the MVP we focus on building a profile for the user and to provide an accurate business valuation using a real broker Empire Flippers. We also provide a tax strategy to save hundreds of thousands on their exit.

## The Problem

E-commerce founders are experts at selling, not finance. They are "revenue rich, profit blind," have no idea what their business is truly worth, and are intimidated by the complex, expensive process of selling their business. They leave millions on the table out of sheer inertia and lack of access to high-level strategic advice.

## Our Solution: TaxMan

TaxMan is a conversational AI that bridges the gap. We create a seamless, multi-channel experience that starts with an empathetic phone call and transitions to a simple web interface for data connection, all in real-time. Our mission is to build immediate trust by demonstrating our capability to understand the user's business context instantly, leading to a live, data-driven valuation and a glimpse into transformative tax strategies like **Qualified Small Business Stock (QSBS)**.

## 🔄 The "Real-Time Data Sync" Experience

<div align="center">

**This is the core "magic moment" of our platform**

</div>

| Step | Experience | Description |
|:---:|:---|:---|
| 1️⃣ | **📞 The Call** | A founder calls TaxMan at **+1 978 829 6264** (or **+1 978 TAX-MANG**) and speaks with our empathetic AI agent |
| 2️⃣ | **📧 The Link** | The AI understands their intent to sell and sends a secure profile link to their email (via **Resend**) |
| 3️⃣ | **🔗 The Sync** | The founder opens the link, clicks "Login with Amazon/TikTok," syncing their financial data with our backend |
| 4️⃣ | **🤖 The Awareness** | Instantly, the AI acknowledges the data sync: *"I see the connection was successful. Pulling in your metrics now..."* |
| 5️⃣ | **💰 The Valuation** | Using real data, the AI provides a broker-quality business valuation via the Empire Flippers API |
| 6️⃣ | **✨ The Strategy** | The AI introduces QSBS tax strategy, showing the founder how to save hundreds of thousands on their exit |

## Tech Stack & Architecture

This project is an orchestration of several cutting-edge services managed by a central backend.

*   **Backend:** Node.js with Express
*   **Voice AI & Empathy Engine:** **Hume AI**. Hume provides the core of our voice interaction, delivering not just transcription but the emotional and prosodic analysis needed for the TaxMan AI to sound truly empathetic.
*   **Telephony Services:** **Twilio**. We use Twilio to enable phone interactions with TaxMan via our dedicated number: **+1 978 829 6264** (or **+1 978 TAX-MANG**).
*   **Email Delivery:** **Resend**. For reliably sending the transactional email that is critical to our user flow.
*   **Core Logic:** A powerful Large Language Model (e.g., GPT-4, Claude 3).
*   **Valuation Data:** The **Empire Flippers Valuation Tool API**.
*   **Frontend:** A simple HTML/CSS/JS static site for the data-syncing step.

### A Note on Real-Time Voice (TODO)

Our initial goal was to use a dedicated real-time voice transport layer for the lowest possible latency.

*   **TODO - LiveKit Integration:** We attempted to use LiveKit for managing the audio streams with a server-side bot. We believe this is the optimal architecture for production but faced challenges in achieving the desired audio quality and stability within the hackathon timeframe.
*   **TODO - Sesame AI Integration:** We also explored Sesame AI for creating a dedicated, always-on voice avatar. This is a promising next step for creating an even more personal and persistent agent.

For this MVP, we have focused on perfecting the core conversational logic and the multi-channel (voice-to-web) experience, with the understanding that the voice transport layer is a key area for future development.

## How to Run This Project

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/open-biz/TaxMan.git
    cd taxman-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your API keys:
    ```
    HUME_API_KEY=
    HUME_SECRET_KEY=
    NEXT_PUBLIC_HUME_CONFIG_ID=
    RESEND_API_KEY=
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:3000`.

## Demo Script

For a detailed walkthrough of the "Real-Time Data Sync" experience, please see our [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) file.