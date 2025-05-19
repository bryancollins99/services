# Bryan Collins Portfolio Website

A professional portfolio website built with HTML, CSS (Tailwind), and JavaScript to showcase my content strategy and marketing expertise.

## Features

- Responsive design that works on all devices
- Testimonials carousel with client feedback
- Contact section with direct links
- Work samples with project descriptions
- Analytics integration with Plausible

## Technologies Used

- HTML5
- CSS3 with Tailwind CSS framework
- JavaScript (vanilla)
- Font Awesome for icons
- Plausible Analytics for privacy-friendly tracking

## Project Structure

```
├── index.html              # Main portfolio page
├── testimonials/           # Testimonials module
│   ├── embed.html          # Embed template for testimonials
│   ├── scripts/            # JavaScript for testimonials
│   │   ├── widget-modified.js       # Main widget script (hardcoded testimonials)
│   │   ├── testimonial-carousel.js  # Simplified carousel functionality
│   │   └── admin.js        # Admin functionality (not in use)
│   └── styles/             # CSS for testimonials
│       └── widget.css      # Testimonial styling
├── netlify.toml            # Netlify configuration
└── README.md              # This documentation
```

## Deployment

This site is deployed on Netlify at [bryancollins.netlify.app](https://bryancollins.netlify.app).

## Development Notes

### Testimonials

Testimonials are hardcoded directly in the `widget-modified.js` file for reliability. The original implementation attempted to load testimonials from a CSV file, but this was changed to ensure consistent display across environments.

### Button Styling

The site uses consistent button styling:
- `btn-primary`: White background with blue text (Email, Call buttons)
- `btn-secondary`: Transparent with white border (Newsletter button)
- `btn-accent`: Blue background with white text (used for some social links)

### Analytics

The site uses Plausible Analytics for privacy-friendly visitor tracking. The script tracks page views, file downloads, and outbound link clicks.

## TODO

- Consider adding a skills section with progress bars
- Add meta tags for better SEO and social sharing
- Optimize images for faster loading
- Add more work samples as they become available
- Update availability date as needed

## License

All rights reserved © Bryan Collins 2025
