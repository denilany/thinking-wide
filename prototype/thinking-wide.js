// SkillBridge AI - Enhanced User Journey
// 8-Step Process Implementation

let currentStep = 1;
let userProfile = {
    skills: '',
    interest: '',
    education: '',
    experience: '',
    goals: [],
    timeCommitment: '',
    learningStyle: [],
    selectedCareer: ''
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up form listeners
    const skillsForm = document.getElementById('skillsForm');
    if (skillsForm) {
        skillsForm.addEventListener('submit', handleSkillsSubmit);
    }

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSubmit);
    }

    // Real-time validation for skills input
    const skillsInput = document.getElementById('currentSkills');
    if (skillsInput) {
        skillsInput.addEventListener('input', validateSkillsInput);
        skillsInput.addEventListener('blur', validateSkillsInput);
    }

    const interestSelect = document.getElementById('primaryInterest');
    if (interestSelect) {
        interestSelect.addEventListener('change', validateInterestSelect);
    }
}

// Step Navigation
function startJourney() {
    goToStep(2);
}

function goToStep(step) {
    // Hide all steps
    const allSteps = document.querySelectorAll('.step-section');
    allSteps.forEach(s => s.classList.remove('active'));
    allSteps.forEach(s => s.classList.add('hidden'));

    // Show target step
    const targetStep = document.getElementById('step' + step);
    if (targetStep) {
        targetStep.classList.remove('hidden');
        targetStep.classList.add('active');
    }

    // Update progress indicator
    updateProgressIndicator(step);

    // Show/hide testimonial section (only on step 1)
    const testimonial = document.getElementById('testimonialSection');
    if (testimonial) {
        testimonial.style.display = step === 1 ? 'grid' : 'none';
    }

    // Show/hide progress container (steps 2-7)
    const progressContainer = document.getElementById('progressContainer');
    if (progressContainer) {
        if (step >= 2 && step <= 7) {
            progressContainer.classList.remove('hidden');
        } else {
            progressContainer.classList.add('hidden');
        }
    }

    currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgressIndicator(step) {
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach(ps => {
        const stepNum = parseInt(ps.getAttribute('data-step'));
        if (stepNum <= step) {
            ps.classList.add('completed');
        } else {
            ps.classList.remove('completed');
        }
        if (stepNum === step) {
            ps.classList.add('current');
        } else {
            ps.classList.remove('current');
        }
    });
}

// Form Validation
function validateSkillsInput() {
    const input = document.getElementById('currentSkills');
    const error = document.getElementById('skillsError');
    const value = input.value.trim();

    if (value.length === 0) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        error.style.display = 'block';
        return false;
    } else if (value.length < 3) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        error.textContent = 'Please enter at least 3 characters';
        error.style.display = 'block';
        return false;
    } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
        error.style.display = 'none';
        return true;
    }
}

function validateInterestSelect() {
    const select = document.getElementById('primaryInterest');
    const error = document.getElementById('interestError');
    const value = select.value;

    if (!value) {
        select.classList.add('invalid');
        select.classList.remove('valid');
        error.style.display = 'block';
        return false;
    } else {
        select.classList.remove('invalid');
        select.classList.add('valid');
        error.style.display = 'none';
        return true;
    }
}

// Form Submission Handlers
function handleSkillsSubmit(e) {
    e.preventDefault();

    const skillsValid = validateSkillsInput();
    const interestValid = validateInterestSelect();

    if (!skillsValid || !interestValid) {
        return;
    }

    // Save form data
    userProfile.skills = document.getElementById('currentSkills').value;
    userProfile.interest = document.getElementById('primaryInterest').value;
    userProfile.education = document.getElementById('educationLevel').value;
    userProfile.experience = document.getElementById('experienceLevel').value;

    // Move to next step
    goToStep(3);
}

function handleProfileSubmit(e) {
    e.preventDefault();

    // Save optional profile data
    const goals = document.querySelectorAll('input[name="goals"]:checked');
    userProfile.goals = Array.from(goals).map(g => g.value);

    userProfile.timeCommitment = document.getElementById('timeCommitment').value;

    const learning = document.querySelectorAll('input[name="learning"]:checked');
    userProfile.learningStyle = Array.from(learning).map(l => l.value);

    // Start AI analysis
    startAIAnalysis();
}

function skipToAnalysis() {
    startAIAnalysis();
}

// AI Analysis Simulation (Step 4)
function startAIAnalysis() {
    goToStep(4);

    const messages = [
        { text: 'Analyzing your skills...', duration: 2500 },
        { text: 'Matching you with career paths...', duration: 2500 },
        { text: 'Finding your best opportunities...', duration: 2500 }
    ];

    let currentMessage = 0;
    const progressBar = document.getElementById('progressBar');
    const loadingMessage = document.getElementById('loadingMessage');
    const progressText = document.getElementById('progressText');

    function updateMessage() {
        if (currentMessage < messages.length) {
            loadingMessage.textContent = messages[currentMessage].text;
            progressText.textContent = `Step ${currentMessage + 1} of ${messages.length}`;

            const progress = ((currentMessage + 1) / messages.length) * 100;
            progressBar.style.width = progress + '%';

            currentMessage++;
            setTimeout(updateMessage, messages[currentMessage - 1].duration);
        } else {
            // Analysis complete, show results
            setTimeout(() => goToStep(5), 500);
        }
    }

    updateMessage();
}

// Career Selection (Step 5 -> Step 6)
function selectCareer(career) {
    userProfile.selectedCareer = career;

    // Update career title in roadmap
    const careerTitles = {
        'frontend': 'Frontend Developer',
        'ui-designer': 'UI/UX Designer',
        'fullstack': 'Full-Stack Developer'
    };

    const careerTitle = document.getElementById('careerTitle');
    if (careerTitle) {
        careerTitle.textContent = careerTitles[career] || 'Frontend Developer';
    }

    // Show loading for roadmap generation
    goToStep(6);

    // Simulate roadmap generation (3-5 seconds)
    setTimeout(() => {
        goToStep(7);
    }, 3500);
}

// Roadmap Actions
function downloadRoadmap() {
    // Simulate PDF download
    alert('Your personalized roadmap is being prepared for download!\n\nIn a production version, this would generate a PDF with:\n- Complete skill breakdown\n- Detailed resource links\n- Timeline and milestones\n- Progress tracking templates');
}

// Error Handling
function showError(title, message) {
    const modal = document.getElementById('errorModal');
    const errorTitle = document.getElementById('errorTitle');
    const errorMessage = document.getElementById('errorMessage');

    if (errorTitle) errorTitle.textContent = title;
    if (errorMessage) errorMessage.textContent = message;

    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeErrorModal() {
    const modal = document.getElementById('errorModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Utility Functions
function resetJourney() {
    userProfile = {
        skills: '',
        interest: '',
        education: '',
        experience: '',
        goals: [],
        timeCommitment: '',
        learningStyle: [],
        selectedCareer: ''
    };
    goToStep(1);
}

// Add smooth scroll behavior for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});