document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('cName').value.trim();
            const phone = document.getElementById('cPhone').value.trim();
            const message = document.getElementById('cMessage').value.trim();
            if (!name || !phone) {
                alert('Please fill in your name and phone number.');
                return;
            }
            // In production, send to webhook/CRM
            console.log({ name, phone, message });
            alert('Thank you! We\'ll get back to you shortly.');
            this.reset();
        });
    }

    // Tax form (if on tax page)
    const taxForm = document.getElementById('taxForm');
    if (taxForm) {
        taxForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('taxName').value.trim();
            const phone = document.getElementById('taxPhone').value.trim();
            const email = document.getElementById('taxEmail').value.trim();
            const income = document.getElementById('taxIncome').value;
            const existing = document.getElementById('taxExisting').value.trim();
            if (!name || !phone || !email || !income) {
                alert('Please fill in all required fields.');
                return;
            }
            console.log({ name, phone, email, income, existing });
            alert('Your free plan is being prepared. We\'ll send it to you within 24 hours.');
            this.reset();
        });
    }
});