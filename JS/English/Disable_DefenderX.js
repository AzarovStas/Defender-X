window.addEventListener('beforeunload', function(event)
{
    document.getElementById("DefenderCheckbox").checked = false;
});

window.addEventListener('load', function() 
{
    document.getElementById("DefenderCheckbox").checked = false;
});

function Toggle_DefenderImage() 
{
    document.getElementById("DefenderImage").src = document.getElementById("DefenderCheckbox").checked ? "../../Images/Index/DefenderX_off.png" : "../../Images/Index/DefenderX_on.png";
}