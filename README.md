# Personal Portfolio Website

A clean, responsive, and modern personal portfolio website built with HTML, CSS, and vanilla JavaScript. Perfect for showcasing your projects, skills, and professional information.

## Features

- 🎨 Clean and modern design
- 🌓 Dark mode support
- 📱 Fully responsive layout
- ⚡ Smooth scrolling and animations
- 📝 Contact form with EmailJS integration
- 🔍 SEO friendly
- 🚀 Fast loading and optimized

## Setup Instructions

1. Clone this repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Customize the content:
   - Update personal information in `index.html`
   - Modify styles in `styles.css`
   - Add your own projects and skills
   - Replace placeholder images with your own

3. Set up EmailJS for the contact form:
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Create an email service and template
   - Update the EmailJS configuration in `script.js`:
     ```javascript
     emailjs.init("YOUR_USER_ID");
     await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData);
     ```

4. Add your resume:
   - Place your resume PDF in the root directory
   - Update the resume link in `index.html`:
     ```html
     <a href="your-resume.pdf" class="btn secondary-btn" download>Download Resume</a>
     ```

5. Deploy your website:
   - You can deploy to GitHub Pages, Netlify, Vercel, or any other hosting service
   - For GitHub Pages, enable it in your repository settings

## Customization

### Colors
The color scheme can be modified in `styles.css` by updating the CSS variables in the `:root` selector:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --text-color: #1f2937;
    --bg-color: #ffffff;
    --card-bg: #f3f4f6;
    --border-color: #e5e7eb;
}
```

### Sections
Each section in `index.html` can be customized:
- Update the hero section with your name and title
- Modify the about section with your personal information
- Add or remove project cards
- Update skills and certifications
- Customize the contact form

### Images
Replace placeholder images with your own:
- Add your profile picture
- Update certification logos
- Add project screenshots

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details. 