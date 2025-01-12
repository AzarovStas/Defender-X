document.addEventListener("DOMContentLoaded", function() 
{
    let CurrentPage = window.location.pathname.split("/").pop();
    let FlagLinks = document.querySelectorAll(".nav-link");

    FlagLinks.forEach(function(link) 
    {
        if (link.getAttribute("href") === CurrentPage) 
        { 
            link.addEventListener("click", function(event) 
            {
                event.preventDefault();
            });
        }
    });
});