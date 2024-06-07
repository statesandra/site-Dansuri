window.addEventListener('scroll', function() {
    var transitionImages = document.querySelectorAll('.transitionImages');
    var windowHeight = window.innerHeight;

    transitionImages.forEach(function(image) {
        var positionFromTop = image.getBoundingClientRect().top;

        if (positionFromTop - windowHeight <= 0) {
            image.style.opacity = 1;
        }
    });
});


document.getElementById("filterButton").addEventListener("click", function(){
    var selectedAge = parseInt(document.getElementById("ageSelect").value);
    var exp = document.querySelector('input[name="expRadio"]:checked').value;
    let expToBoolean = (exp === "true");
    let classes = [
        {
            min_age: 7,
            max_age:10,
            experience_needed:false,
            id:1
        },
        {
            min_age: 10,
            max_age:100,
            experience_needed:false,
            id:2
        },
        {
            min_age: 7,
            max_age:10,
            experience_needed:true,
            id:3
        },
        {
            min_age: 10,
            max_age:100,
            experience_needed:true,
            id:4
        }
    ];
    var filteredData = classes.filter(function(item){
        return selectedAge >= item.min_age && selectedAge <= item.max_age && expToBoolean === item.experience_needed;
    });
    window.addEventListener('click', displayFilteredData);

    function displayFilteredData(){
        if(filteredData.length > 0){    
            document.querySelectorAll(".display").forEach(function(card) {
                card.style.display = 'none';
                filteredData.forEach((element) => {
                    if(element.id === Number(card.id)) {
                        card.style.display = 'block';
                    }
                })
            });
        }
    }
});










