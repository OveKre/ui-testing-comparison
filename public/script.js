// Sisselogimise skript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Kontrolli kas kasutaja on juba sisse logitud
    const userData = sessionStorage.getItem('userData');
    if (userData && window.location.pathname === '/login') {
        // Kui kasutaja on juba sisse logitud, suuna dashboard'i
        window.location.href = '/dashboard';
    }
});

// Sisselogimise käsitleja
async function handleLogin(e) {
    e.preventDefault();
    
    // Puhasta varasemad vead
    clearErrors();
    hideMessages();
    
    const submitBtn = document.getElementById('login-submit');
    const loginText = document.getElementById('login-text');
    const loadingText = document.getElementById('loading-text');
    
    // Näita laadimise olekut
    submitBtn.disabled = true;
    loginText.style.display = 'none';
    loadingText.style.display = 'inline';
    
    // Võta andmed vormist
    const formData = new FormData(e.target);
    const username = formData.get('username').trim();
    const password = formData.get('password').trim();
    
    // Kliendipoolne valideerimine
    let hasErrors = false;
    
    if (!username) {
        showFieldError('username', 'Kasutajanimi on kohustuslik!');
        hasErrors = true;
    }
    
    if (!password) {
        showFieldError('password', 'Parool on kohustuslik!');
        hasErrors = true;
    }
    
    if (hasErrors) {
        resetSubmitButton();
        return;
    }
    
    try {
        // Saada POST päring serverile
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Salvesta kasutaja andmed
            sessionStorage.setItem('userData', JSON.stringify(result.user));
            
            // Näita õnnestumise sõnumit
            showMessage('success', result.message);
            
            // Suuna dashboard'i pärast lühikest viivitust
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
            
        } else {
            // Näita vea sõnumit
            showMessage('error', result.message);
            resetSubmitButton();
        }
        
    } catch (error) {
        console.error('Sisselogimise viga:', error);
        showMessage('error', 'Serveri viga! Proovi hiljem uuesti.');
        resetSubmitButton();
    }
}

// Välja vea näitamine
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorDiv = document.getElementById(fieldName + '-error');
    
    if (field && errorDiv) {
        field.classList.add('error');
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    }
}

// Vigade puhastamine
function clearErrors() {
    const errorDivs = document.querySelectorAll('.field-error');
    const inputFields = document.querySelectorAll('input');
    
    errorDivs.forEach(div => {
        div.classList.remove('show');
        div.textContent = '';
    });
    
    inputFields.forEach(field => {
        field.classList.remove('error');
    });
}

// Sõnumite näitamine
function showMessage(type, message) {
    const errorMsg = document.getElementById('error-message');
    const successMsg = document.getElementById('success-message');
    
    // Peida kõik sõnumid
    if (errorMsg) errorMsg.style.display = 'none';
    if (successMsg) successMsg.style.display = 'none';
    
    if (type === 'error' && errorMsg) {
        document.getElementById('error-text').textContent = message;
        errorMsg.style.display = 'block';
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (type === 'success' && successMsg) {
        document.getElementById('success-text').textContent = message;
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Sõnumite peitmine
function hideMessages() {
    const errorMsg = document.getElementById('error-message');
    const successMsg = document.getElementById('success-message');
    
    if (errorMsg) errorMsg.style.display = 'none';
    if (successMsg) successMsg.style.display = 'none';
}

// Nupu taastamine
function resetSubmitButton() {
    const submitBtn = document.getElementById('login-submit');
    const loginText = document.getElementById('login-text');
    const loadingText = document.getElementById('loading-text');
    
    if (submitBtn && loginText && loadingText) {
        submitBtn.disabled = false;
        loginText.style.display = 'inline';
        loadingText.style.display = 'none';
    }
}

// Dashboard kaitsmise funktsioon
function protectDashboard() {
    const userData = sessionStorage.getItem('userData');
    
    if (!userData && window.location.pathname === '/dashboard') {
        // Kui kasutaja ei ole sisse logitud, suuna sisselogimise lehele
        window.location.href = '/login';
        return false;
    }
    
    return true;
}

// Väljalogimise funktsioon
function logout() {
    sessionStorage.removeItem('userData');
    window.location.href = '/';
}

// Kasutaja andmete saamine
function getCurrentUser() {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

// Eksporteeritud funktsioonid testimiseks
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleLogin,
        showFieldError,
        clearErrors,
        showMessage,
        hideMessages,
        logout,
        getCurrentUser
    };
}