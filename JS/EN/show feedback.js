const feedbackButton = document.createElement('div');

feedbackButton.className = 'feedback-button';
feedbackButton.style.cssText = 'position: fixed; bottom: 10px; right: 10px;';
feedbackButton.innerHTML = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#feedbackModal">💬 Feedback</button>`;

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
                        <label for="feedbackName" class="form-label">🧑🏻 From</label>
                        <input type="text" class="form-control" id="feedbackName" name="From:" oninput="CharacterValidation(this)">
                    </div>
                    <div class="mb-3">
                        <label for="feedbackEmail" class="form-label">📧 Your email</label>
                        <input type="text" class="form-control" id="feedbackEmail" name="Email:" oninput="CharacterValidation(this)">
                    </div>
                    <div class="mb-3">
                        <label for="feedbackTopic" class="form-label">📌 Theme</label>
                        <select class="form-select" id="feedbackTopic" name="Theme:">
                            <option value="General questions">General questions</option>
                            <option value="Technical support">Technical support</option>
                            <option value="Suggestions">Suggestions</option>
                            <option value="Complaints">Complaints</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="feedbackMessage" class="form-label">✉️ Message</label>
                        <textarea class="form-control" id="feedbackMessage" name="Message:" rows="3" maxlength="200" oninput="CharacterValidation(this)"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send</button><span id="CharCount">0/200</span>
                </form>
            </div>
        </div>
    </div>`;

const CloseButtonFeedback = document.createElement('div');
CloseButtonFeedback.className = 'Close_Button';
CloseButtonFeedback.style.cssText = 'position: fixed; bottom: 2.325em; right: 0.375em; cursor: pointer;';
CloseButtonFeedback.innerHTML = `✖️`;

CloseButtonFeedback.addEventListener('click', function() 
{
    feedbackModal.style.display = 'none';
    feedbackButton.style.display = 'none';
    CloseButtonFeedback.style.display = 'none';
});
    
document.body.appendChild(feedbackButton);
document.body.appendChild(feedbackModal);
document.body.appendChild(CloseButtonFeedback);

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

function CharacterValidation(input) 
{
    input.value = input.value.replace(/[^A-Za-z0-9 ,.'!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, '');
}

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
    const topic = document.getElementById('feedbackTopic').value;
    const message = document.getElementById('feedbackMessage');

    if (document.getElementById('feedbackName').value.trim() === '') 
    {
        alert('You didn\'t specify who you are!');
        event.preventDefault();
        return;
    }

    if (document.getElementById('feedbackEmail').value.trim() === '') 
    {
        alert('You didn\'t specify an email!');
        event.preventDefault();
        return;
    }

    if (message.value.trim() === '') 
    {
        alert('You didn\'t enter the message!');
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