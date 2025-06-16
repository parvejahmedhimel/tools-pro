// DOM Elements
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const searchBox = document.querySelector('.search-box input');
const toolsContainer = document.getElementById('toolsContainer');

// Tools Data
const tools = [
    {
        id: 'bg-remover',
        title: 'Background Remover',
        description: 'Remove background from images with one click',
        icon: 'fas fa-cut',
        color: '#f72585'
    },
    {
        id: 'bg-adder',
        title: 'Background Adder',
        description: 'Add beautiful backgrounds to your images',
        icon: 'fas fa-image',
        color: '#4895ef'
    },
    {
        id: 'img-to-pdf',
        title: 'Image to PDF',
        description: 'Convert images to PDF documents',
        icon: 'fas fa-file-pdf',
        color: '#7209b7'
    },
    {
        id: 'text-to-pdf',
        title: 'Text to PDF',
        description: 'Convert text to downloadable PDF files',
        icon: 'fas fa-file-alt',
        color: '#4361ee'
    },
    {
        id: 'password-generator',
        title: 'Password Generator',
        description: 'Generate strong, secure passwords',
        icon: 'fas fa-lock',
        color: '#4cc9f0'
    },
    {
        id: 'calculator',
        title: 'Calculator',
        description: 'Basic calculator for simple math operations',
        icon: 'fas fa-calculator',
        color: '#3a86ff'
    },
    {
        id: 'unit-converter',
        title: 'Unit Converter',
        description: 'Convert between different units of measurement',
        icon: 'fas fa-ruler-combined',
        color: '#8338ec'
    },
    {
        id: 'page-speed',
        title: 'Page Speed Checker',
        description: 'Check website loading speed (simulated)',
        icon: 'fas fa-tachometer-alt',
        color: '#ff006e'
    },
    {
        id: 'notepad',
        title: 'Note Pad',
        description: 'Create and save notes in your browser',
        icon: 'fas fa-sticky-note',
        color: '#fb5607'
    },
    {
        id: 'clock',
        title: 'Live Clock',
        description: 'Current time and date with timezone support',
        icon: 'fas fa-clock',
        color: '#3a86ff'
    }
];

// Initialize the app
function init() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Render tools
    renderTools();
    
    // Set up event listeners
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Hamburger menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Search functionality
    searchBox.addEventListener('input', filterTools);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
}

// Toggle theme
function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

// Set theme
function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
    themeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
}

// Render tools
function renderTools(filter = '') {
    toolsContainer.innerHTML = '';
    
    const filteredTools = tools.filter(tool => 
        tool.title.toLowerCase().includes(filter.toLowerCase()) || 
        tool.description.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filteredTools.length === 0) {
        toolsContainer.innerHTML = '<p class="no-results">No tools found matching your search.</p>';
        return;
    }
    
    filteredTools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.innerHTML = `
            <div class="tool-card-icon" style="background-color: ${tool.color}">
                <i class="${tool.icon}"></i>
            </div>
            <div class="tool-card-content">
                <h3>${tool.title}</h3>
                <p>${tool.description}</p>
                <button class="tool-card-btn" data-tool="${tool.id}">Open Tool</button>
            </div>
        `;
        toolsContainer.appendChild(toolCard);
    });
    
    // Add event listeners to tool buttons
    document.querySelectorAll('.tool-card-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const toolId = e.target.getAttribute('data-tool');
            openTool(toolId);
        });
    });
}

// Filter tools based on search input
function filterTools() {
    renderTools(searchBox.value);
}

// Open tool (would link to individual tool pages in a real implementation)
function openTool(toolId) {
    // In a real implementation, this would navigate to the tool's page
    // For this demo, we'll show a modal
    showModal(
        `${tools.find(t => t.id === toolId).title} Tool`, 
        `This would open the ${toolId.replace('-', ' ')} tool. In a full implementation, 
        each tool would have its own page with the complete functionality. You can use it by The header link`
    );
}

// Show modal
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2 class="modal-title">${title}</h2>
            <p>${content}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close modal when clicking X
    modal.querySelector('.modal-close').addEventListener('click', () => {
        closeModal(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

// Close modal
function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);


// adding for about 
 const gradients = [
      'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
      'linear-gradient(to right, #1c92d2, #f2fcfe)',
      'linear-gradient(to right, #654ea3, #eaafc8)',
      'linear-gradient(to right, #ff9966, #ff5e62)',
      'linear-gradient(to right, #00c6ff, #0072ff)',
      'linear-gradient(to right, #e65c00, #f9d423)',
    ];
    function changeBackground() {
      const random = Math.floor(Math.random() * gradients.length);
      document.body.style.background = gradients[random];
    }
