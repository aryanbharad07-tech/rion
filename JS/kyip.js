document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll('.form-step');
    let currentStep = 0;
    const totalSteps = steps.length;

    function showStep(index) {
        steps.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
    }

    function getRadioValue(name) {
        const el = document.querySelector(`input[name="${name}"]:checked`);
        return el ? el.value : null;
    }

    function getCheckboxValues(name) {
        const checks = document.querySelectorAll(`input[name="${name}"]:checked`);
        return Array.from(checks).map(c => c.value);
    }

    function calculateRiskProfile() {
        const horizon = getRadioValue('horizon');
        const risk = getRadioValue('risk');
        // simple logic: long horizon + invest more = aggressive, short + sell = conservative
        if (horizon === 'long' && risk === 'invest') return 'Aggressive';
        if (horizon === 'short' && risk === 'sell') return 'Conservative';
        if (horizon === 'medium' && risk === 'wait') return 'Moderate';
        // default
        return 'Moderate';
    }

    // Next / Previous buttons
    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', function () {
            // Validate current step (basic)
            const current = steps[currentStep];
            const radios = current.querySelectorAll('input[type="radio"]');
            if (radios.length > 0) {
                const checked = Array.from(radios).some(r => r.checked);
                if (!checked) {
                    alert('Please select an option before proceeding.');
                    return;
                }
            }
            const inputs = current.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]');
            for (let inp of inputs) {
                if (inp.hasAttribute('required') && !inp.value.trim()) {
                    alert('Please fill in all required fields.');
                    return;
                }
            }
            if (currentStep < totalSteps - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', function () {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    // Form submit
    document.getElementById('kyipForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Gather data (for demo, we just show results)
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!name || !phone || !email) {
            alert('Please fill in your contact details.');
            return;
        }

        // Calculate risk
        const riskProfile = calculateRiskProfile();

        // Display results
        document.querySelector('#resultProfile').textContent = riskProfile;
        const suggestion = document.querySelector('#resultSuggestion');
        if (riskProfile === 'Aggressive') {
            suggestion.textContent = 'Based on your inputs, a mix of mid-cap and small-cap funds may align with your profile.';
        } else if (riskProfile === 'Conservative') {
            suggestion.textContent = 'Based on your inputs, debt and balanced funds may be a good fit.';
        } else {
            suggestion.textContent = 'Based on your inputs, a mix of large-cap and hybrid funds may align with your profile.';
        }

        // Hide form, show results
        document.querySelectorAll('.form-step').forEach(s => s.style.display = 'none');
        document.getElementById('kyipResults').style.display = 'block';

        // In production, send data to webhook/CRM
        console.log({ name, phone, email, riskProfile });
    });
});