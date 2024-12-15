# SnapCity 🌟

SnapCity is a modern web application that empowers citizens to actively participate in improving their urban environment through community engagement and gamification.

## Features

- 🎯 **Mission System**: Complete various missions to improve your city
- 💬 **Community Social Feed**: Share your achievements and connect with other citizens
- 🏆 **Rewards Program**: Earn SP (SnapPoints) and redeem them for real-world benefits
- 📊 **Interactive Dashboard**: Track your impact and community statistics
- 🤖 **AI Assistant**: Get help and guidance through our integrated chat assistant

## Project Structure

```
snap-city/
├── Frontend
│   ├── index.html          # Home page
│   ├── dashboard.html      # User dashboard
│   ├── social.html         # Community feed
│   ├── missions.html       # Available missions
│   ├── styles/            # CSS stylesheets
│   ├── js/               # JavaScript files
│   └── assets/           # Images and static assets
│
├── Backend (In Development)
│   ├── app/
│   │   ├── main.py        # FastAPI application
│   │   ├── models/        # Data models
│   │   ├── routers/       # API endpoints
│   │   ├── core/          # Core functionality
│   │   └── services/      # External services
│   └── requirements.txt    # Python dependencies
```

## Tech Stack

### Frontend
- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (Vanilla JS)
- Chart.js for data visualization

### Backend (In Development)
- FastAPI (Python web framework)
- MongoDB (Database)
- JWT Authentication
- OpenAI Integration
- AWS S3 (Image Storage)

## Quick Start

### Frontend Demo
1. Clone the repository:
```bash
git clone https://github.com/ujpm/snapcity.git
```

2. Open `index.html` in your web browser to start using the application.

### Backend Setup (Coming Soon)
1. Create a virtual environment
2. Install dependencies: `pip install -r backend/requirements.txt`
3. Configure environment variables
4. Run: `uvicorn app.main:app --reload`

## API Documentation (Coming Soon)
The backend API will provide endpoints for:
- User Authentication
- Mission Management
- Social Interactions
- Rewards System
- Dashboard Analytics
- AI Chat Assistant

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons provided by [Heroicons](https://heroicons.com/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Charts powered by [Chart.js](https://www.chartjs.org/)
