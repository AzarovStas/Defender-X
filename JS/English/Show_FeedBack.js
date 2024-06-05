const feedbackButton = document.createElement('div');

feedbackButton.className = 'feedback-button';
feedbackButton.style.cssText = 'position: fixed; bottom: 10px; right: 10px;';
feedbackButton.innerHTML = `
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#feedbackModal">💬 Feedback</button>
`;

const feedbackModal = document.createElement('div');
feedbackModal.className = 'modal fade dark-bg';
feedbackModal.id = 'feedbackModal';
feedbackModal.tabIndex = -1;
feedbackModal.setAttribute('aria-labelledby', 'feedbackModalLabel');
feedbackModal.setAttribute('aria-hidden', 'true');
feedbackModal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="feedbackModalLabel">💬 Feedback</h5>
                <button type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="https://formspree.io/f/xoqgolya" method="POST">
                    <div class="mb-3">
                        <label for="feedbackName" class="form-label">🧑🏻 From:</label>
                        <input type="text" class="form-control" id="feedbackName" name="From:">
                    </div>
                    <div class="mb-3">
                        <label for="feedbackEmail" class="form-label">📧 Your email:</label>
                        <input type="text" class="form-control" id="feedbackEmail" name="Email:">
                    </div>
                    <div class="mb-3">
                        <label for="feedbackMessage" class="form-label">✉️ Message:</label>
                        <textarea class="form-control" id="feedbackMessage" name="Message:" rows="3" maxlength="200"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send</button><span id="CharCount">0/200</span>
                </form>
            </div>
        </div>
    </div>
`;

document.body.appendChild(feedbackButton);
document.body.appendChild(feedbackModal);

document.getElementById('feedbackMessage').addEventListener('input', function() 
{
    document.getElementById('CharCount').textContent = this.value.length + '/200';
});

document.getElementById('feedbackEmail').setAttribute('title', 'Email should be at @gmail.com, @yandex.ru or @mail.ru!');

document.getElementById('feedbackModal').addEventListener('hidden.bs.modal', function() 
{
    if (document.getElementById('feedbackMessage').value.length > 0)
        document.getElementById('CharCount').textContent = document.getElementById('feedbackMessage').value.length + '/200';
});

window.addEventListener('beforeunload', function(event)
{
    if (document.getElementById('feedbackMessage').value.length > 0)
        document.getElementById('CharCount').textContent = document.getElementById('feedbackMessage').value.length + '/200';
});

window.addEventListener('load', function() 
{
    if (document.getElementById('feedbackMessage').value.length > 0)
        document.getElementById('CharCount').textContent = document.getElementById('feedbackMessage').value.length + '/200';
});

document.getElementById('feedbackEmail').addEventListener('input', function() 
{
    var Email = document.getElementById('feedbackEmail').value.trim();

    if (Email.trim() === '') 
    {
        this.classList.remove('is-invalid');
        return;
    }

    if (Email.trim() === '@gmail.com' || Email.trim() === '@mail.ru' || Email.trim() === '@yandex.ru' ||
    !Email.includes('@gmail.com') && !Email.includes('@yandex.ru') && !Email.includes('@mail.ru') || !Email.match(/@(gmail\.com|yandex\.ru|mail\.ru)$/)) 
        this.classList.add('is-invalid');

    else
        this.classList.remove('is-invalid');
});

document.querySelector('form').addEventListener('submit', function(event)
{
    if (document.getElementById('feedbackName').value.trim() === '') 
    {
        alert('You didn\'\ t specify who you are!');
        event.preventDefault();

        return;
    }

    if (document.getElementById('feedbackEmail').value.trim() === '') 
    {
        alert('You didn\'\ t specify an email!');
        event.preventDefault();

        return;
    }

    if (document.getElementById('feedbackMessage').value.trim() === '') 
    {
        alert('You didn\'\ t enter the message!');
        event.preventDefault();

        return;
    }
    
    var Email = document.getElementById('feedbackEmail').value.trim();

    if ((!Email.includes('@gmail.com') && !Email.includes('@yandex.ru') && !Email.includes('@mail.ru')) || !Email.match(/@(gmail\.com|yandex\.ru|mail\.ru)$/)) 
    {
        alert('Email should be at @gmail.com, @yandex.ru or @mail.ru!');
        event.preventDefault();
        
        return;
    }

    if (Email.trim() === '@gmail.com' || Email.trim() === '@yandex.ru' || Email.trim() === '@mail.ru')
    {
        alert('You have not entered the mail username!');
        event.preventDefault();

        return;
    }
});