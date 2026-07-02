document.addEventListener('DOMContentLoaded', function () {
    // Simulate redirect to Creso after 3 seconds
    const cresoUrl = 'https://creso.onboarding/partner/rion'; // replace with actual URL
    const link = document.getElementById('investRedirectLink');
    link.href = cresoUrl;

    // Auto redirect
    setTimeout(function () {
        window.location.href = cresoUrl;
    }, 3000);

    // Track conversion event (GA4 / Meta)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-XXXXX/YYYYY', // replace
            'value': 1.0,
            'currency': 'INR'
        });
    }
    console.log('Redirecting to Creso with partner ID...');
});