# Testimonials Portal

A modern web application for collecting and displaying customer testimonials, built with React, Vite, and Tailwind CSS.

## Project Overview

### Features
- Modern testimonial submission form
- File upload support for testimonial photos
- Responsive design with Tailwind CSS
- Legacy widget system for displaying testimonials
- (Coming soon) Admin moderation interface
- (Coming soon) Supabase backend integration

### Technical Stack
- React 18
- Vite
- Tailwind CSS
- React Dropzone (for file uploads)
- Date-fns (for date formatting)

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/bryancollins99/testimonials.git
cd testimonials
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Access the application:
- Main portal: http://localhost:9000/
- Legacy widget: http://localhost:9000/embed.html

## Project Structure
```
testimonials/
├── src/                    # React application source
│   ├── components/        # React components
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── scripts/               # Legacy widget scripts
├── styles/               # Legacy widget styles
├── resources/            # Static resources
└── embed.html            # Legacy widget HTML
```

## Development Workflow

### Running the Development Server
The project uses Vite for development. The server runs on port 9000 by default.

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Legacy Widget

The legacy widget system is still available and can be accessed at `/embed.html`. It provides:
- Multiple layout options (modern, minimal, classic)
- Smooth transition effects
- Auto-play functionality
- Touch support for mobile devices
- Responsive design
- Avatar support with fallback to initials

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 