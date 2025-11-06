'use strict';

const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
});

function animateCursor() {
  outlineX += (mouseX - outlineX) * 0.100;
  outlineY += (mouseY - outlineY) * 0.100;

  outline.style.left = `${outlineX}px`;
  outline.style.top = `${outlineY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();




// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Dynamic Page Title on Visibility Change
const originalTitle = document.title;
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Come back soon!';
    } else {
        document.title = originalTitle;
    }
});

// Fetch Medium Blog Posts
async function fetchMediumPosts() {
  const mediumUsername = 'sohamsarda';
  const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
  const blogList = document.getElementById('blog-posts-list');
  
  if (!blogList) return; // Exit if blog list doesn't exist
  
  // Use rss2json API to bypass CORS
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.status === 'ok' && data.items && data.items.length > 0) {
      // Clear loading message
      blogList.innerHTML = '';
      
      // Calculate popularity score for sorting (most viewed posts first)
      // Since Medium RSS doesn't provide view counts, we use heuristics:
      // - Older posts have had more time to accumulate views (primary factor)
      // - Longer content might indicate more engagement (secondary factor)
      const postsWithScore = data.items.map((post) => {
        const pubDate = new Date(post.pubDate);
        const now = new Date();
        const daysSincePublished = (now - pubDate) / (1000 * 60 * 60 * 24);
        
        // Calculate popularity score:
        // - Base score: days since published (older = more time for views)
        // - Content length bonus: longer posts might be more valuable
        // - Use a logarithmic scale so very old posts don't dominate too much
        const baseScore = Math.log(daysSincePublished + 1) * 100; // Log scale for balanced sorting
        const contentBonus = post.content ? Math.min(post.content.length / 1000, 50) : 0;
        const popularityScore = baseScore + contentBonus;
        
        return {
          ...post,
          popularityScore: popularityScore,
          pubDateObj: pubDate,
          daysSincePublished: daysSincePublished
        };
      });
      
      // Sort by popularity score (highest first = most viewed)
      // This prioritizes posts that have had time to accumulate views
      postsWithScore.sort((a, b) => {
        // Primary sort: popularity score (higher = more likely to have more views)
        if (Math.abs(a.popularityScore - b.popularityScore) > 10) {
          return b.popularityScore - a.popularityScore;
        }
        // Secondary sort: If scores are close, prefer slightly newer posts
        return b.pubDateObj - a.pubDateObj;
      });
      
      // Display up to 6 posts (sorted by popularity/views)
      const sortedPosts = postsWithScore.slice(0, 6);
      
      sortedPosts.forEach(post => {
        // Extract description/excerpt (remove HTML tags)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = post.content;
        const description = tempDiv.textContent || tempDiv.innerText || '';
        const excerpt = description.substring(0, 150).trim() + (description.length > 150 ? '...' : '');
        
        // Format date
        const formattedDate = post.pubDateObj.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
        
        // Extract category from tags or use default
        const category = post.categories && post.categories.length > 0 
          ? post.categories[0] 
          : 'Technology';
        
        // Create blog post item (without image)
        const blogItem = document.createElement('li');
        blogItem.className = 'blog-post-item';
        blogItem.innerHTML = `
          <a href="${post.link}" target="_blank" rel="noopener noreferrer">
            <div class="blog-content">
              <div class="blog-meta">
                <p class="blog-category">${category}</p>
                <span class="dot"></span>
                <time datetime="${post.pubDateObj.toISOString()}">${formattedDate}</time>
              </div>
              <h3 class="h3 blog-item-title">${post.title}</h3>
              <p class="blog-text">${excerpt}</p>
            </div>
          </a>
        `;
        
        blogList.appendChild(blogItem);
      });
      
      // If no posts found, show message
      if (sortedPosts.length === 0) {
        blogList.innerHTML = `
          <li class="blog-post-item" style="text-align: center; padding: 40px;">
            <p style="color: var(--light-gray);">No blog posts found. Check back soon!</p>
            <a href="https://medium.com/@${mediumUsername}" target="_blank" style="color: var(--orange-yellow-crayola); margin-top: 10px; display: inline-block;">Visit Medium Profile</a>
          </li>
        `;
      }
    } else {
      throw new Error('Failed to fetch posts');
    }
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    blogList.innerHTML = `
      <li class="blog-post-item" style="text-align: center; padding: 40px;">
        <p style="color: var(--light-gray); margin-bottom: 15px;">Unable to load blog posts at the moment.</p>
        <a href="https://medium.com/@${mediumUsername}" target="_blank" style="color: var(--orange-yellow-crayola); display: inline-block; font-weight: 600;">Visit My Medium Profile →</a>
      </li>
    `;
  }
}

// Loading Screen Control & Medium Posts
document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  const mainContent = document.getElementById('mainContent');
  
  // Show main content after 3 seconds
  const LOADING_TIME = 3000;
  
  setTimeout(function() {
    // Fade out loading screen
    if (loadingScreen) {
      loadingScreen.classList.add('fade-out');
    }
    
    // Show main content
    if (mainContent) {
      mainContent.style.display = 'block';
    }
    
    // Remove loading screen from DOM after animation
    setTimeout(function() {
      if (loadingScreen) {
        loadingScreen.remove();
      }
      // Load Medium posts after page is fully loaded
      setTimeout(fetchMediumPosts, 500);
    }, 800);
  }, LOADING_TIME);
});
