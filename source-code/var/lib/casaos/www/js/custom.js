//  Add your custom scripts here

// Wait for page to load and inject license link
window.addEventListener('load', function() {
    // Try to find the branding element (retry a few times as Vue takes time to render)
    let attempts = 0;
    const maxAttempts = 20;
    
    const addLicenseLink = setInterval(function() {
        attempts++;
        
        // Look for the CasaOS branding footer
        const brandingElement = document.querySelector('[class*="casaos"]') || 
                               document.querySelector('a[href*="icewhale"]') ||
                               document.querySelector('footer');
        
        if (brandingElement) {
            clearInterval(addLicenseLink);
            
            // Create license link
            const licenseLink = document.createElement('a');
            licenseLink.href = '/LICENSE';
            licenseLink.target = '_blank';
            licenseLink.textContent = 'License';
            licenseLink.style.cssText = 'margin-left: 15px; color: #4a9eff; text-decoration: none; font-size: 12px;';
            licenseLink.title = 'View Apache 2.0 License';
            
            // Create notice link
            const noticeLink = document.createElement('a');
            noticeLink.href = '/NOTICE';
            noticeLink.target = '_blank';
            noticeLink.textContent = 'Notice';
            noticeLink.style.cssText = 'margin-left: 10px; color: #4a9eff; text-decoration: none; font-size: 12px;';
            noticeLink.title = 'View attribution and modifications';
            
            // Insert after branding
            brandingElement.parentNode.appendChild(licenseLink);
            brandingElement.parentNode.appendChild(noticeLink);
        }
        
        if (attempts >= maxAttempts) {
            clearInterval(addLicenseLink);
        }
    }, 500);
});
