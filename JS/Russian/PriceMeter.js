document.addEventListener('DOMContentLoaded', function() 
{
    document.getElementById('email').setAttribute('title', 'Почта должна быть на @gmail.com, @yandex.ru или @mail.ru!');
    document.getElementById('days').setAttribute('title', 'Вы ввели длительность подписки меньше 7 дней!');

    document.getElementById('days').addEventListener('input', function() 
    {
        if (parseInt(this.value) > 180)
            this.value = 180;

        Update_TotalPrice();
    });

    $('#os, #days').on('input', function() 
    {
        Update_TotalPrice();
    });

    document.getElementById('email').addEventListener('input', function() 
    {
        var Email = document.getElementById('email').value.trim();

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

    document.getElementById('days').addEventListener('input', function() 
    {
        this.value = this.value.replace(/\D/g, '');

        if (this.value != '' && this.value >= 0 && this.value < 7)
            this.classList.add('is-invalid');

        else
            this.classList.remove('is-invalid');

        if (this.value === '')
            this.value = '';

        Update_TotalPrice();
    });

    function Update_TotalPrice() 
    {
        var os = $('#os').val();
        var days = $('#days').val();
        var pricePerDay = (os === 'windows') ? 30 : 10;
        var totalPrice = pricePerDay * days;

        $('#totalPrice').val(totalPrice + " рублей");
    }

    document.querySelector('form').addEventListener('submit', function(e) 
    {
        e.preventDefault();

        var Email = document.getElementById('email').value.trim();
        var Days = document.getElementById('days').value;

        if (Days.trim() === '' || isNaN(parseInt(Days))) 
        {
            alert('Вы не ввели длительность подписки!');
            return;
        }

        if (Days.trim() < 7)
        {
            alert('Вы ввели длительность подписки меньше 7 дней!');
            return;
        }

        if (Email.trim() === '') 
        {
            alert('Вы не указали почту!');
            return;
        }

        if (Email.trim() === '@gmail.com' || Email.trim() === '@mail.ru' || Email.trim() === '@yandex.ru')
        {
            alert('Вы не ввели имя пользователя почты!');
            return;
        }

        if ((!Email.includes('@gmail.com') && !Email.includes('@yandex.ru') && !Email.includes('@mail.ru')) || !Email.match(/@(gmail\.com|yandex\.ru|mail\.ru)$/)) 
        {
            alert('Почта должна быть на @gmail.com, @yandex.ru или @mail.ru!');
            return;
        }
        
        $('#modalOS').text($('#os option:selected').text());
        $('#modal_PaymentMethod').text($('#PaymentMethod option:selected').text());
        $('#modalDays').text($('#days').val());
        $('#modalEmail').text($('#email').val());
        $('#modalPrice').text($('#totalPrice').val());

        $('#confirmationModal').modal('show');
    });

    document.getElementById('confirmPurchase').addEventListener('click', function() 
    {   
        $('#confirmationModal').modal('hide');
        alert('Спасибо за использование нашего ПО. Мы сообщим вам на почту о выходе релиза!');
    });

    $('#os').prop('selectedIndex', 0);
    $('#PaymentMethod').prop('selectedIndex', 0);
    $('#totalPrice').val('0 рублей');
    $('#days').val('');
    $('#email').val('');
});