// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZ2G72iSvgQ9O0b0s0XNeEHe3F9b1Htw",
    authDomain: "mindtree-1b9be.firebaseapp.com",
    projectId: "mindtree-1b9be",
    storageBucket: "mindtree-1b9be.appspot.com",
    messagingSenderId: "81627420483",
    appId: "1:81627420483:web:fa1d0900cf6ffd557901f6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Popup Functions
function openEligibilityPopup() {
    document.getElementById('eligibilityPopup').style.display = 'flex';
}

function closeEligibilityPopup() {
    document.getElementById('eligibilityPopup').style.display = 'none';
}

function closeDownloadPopup() {
    document.getElementById('downloadPopup').style.display = 'none';
    closeEligibilityPopup();
}

function submitEligibilityForm(event) {
    event.preventDefault();

    const form = document.getElementById('eligibilityForm');
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        country: formData.get('country'),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Save to Firestore
    db.collection('eligibilitySubmissions').add(data)
        .then(() => {
            console.log('Form data saved successfully!');
            // Show download popup
            document.getElementById('eligibilityPopup').style.display = 'none';
            document.getElementById('downloadPopup').style.display = 'flex';
            form.reset();
        })
        .catch((error) => {
            console.error('Error saving form data: ', error);
            alert('There was an error submitting your form. Please try again.');
        });
}

// Read More Toggle for Reviews
function toggleReview(button) {
    const reviewText = button.previousElementSibling;
    reviewText.classList.toggle('expanded');
    button.textContent = reviewText.classList.contains('expanded') ? 'Read Less' : 'Read More';
}

// Loader Removal
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';
});