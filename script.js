const beerApi = "http://localhost:3000/beers";
 
fetch(beerApi)
    .then(response => {
        return response.json();
    })
    .then((data) => {
        console.log(data['beers'])
        const response = data.beers;
        const beerList = document.getElementById("beer_list");
        for (let i = 0; i < data.length; i++) {

            //use forEach to iterate through the array and display in a list name and
            //response.forEach(beer => {
            const listItem = document.createElement('li');
            listItem.textContent = data[i].name;
            beerList.appendChild(listItem);
            listItem.addEventListener('click', () => fetchById(data[i].id))
        }
        //})

        //get current image set it to null
        let currentimageId = null;
        //function to fetch data byId
        function fetchById(beerId) {
            //resets/clear 
            document.querySelector('#showOutPut').innerHTML = '';

            console.log(beerId)
            //adds the element
            if (currentimageId !== null) {
                const previousImage = document.getElementById(`output-${currentimageId}`);
                if (previousImage) {
                    previousImage.style.display = 'none';
                }
            }
            //get beer by id 
            const beer = data.find(image => image.id === beerId);
            if (beer) {
                const output = document.createElement('div');
                output.id = `output-${beerId}`;
                const showOutput = document.getElementById('showOutPut');

                const h2 = document.createElement('h2');
                h2.textContent = beer.name;
                output.appendChild(h2);

                const beerImage = document.createElement('img');
                beerImage.src = beer.image_url;
                output.appendChild(beerImage);
                showOutput.appendChild(output);

                const details = document.querySelector("#description-para");
                details.textContent = beer.description;

                // Review
                const review_container = document.getElementById('review_container');
                review_container.innerHTML = "";
                if (beer.reviews && beer.reviews.length > 0) {
                    const reviewList = document.createElement('ul');
                    beer.reviews.forEach(review => {
                        const reviewData = document.createElement('li');
                        reviewData.textContent = review;
                        reviewList.appendChild(reviewData);
                    });
                    review_container.appendChild(reviewList);
                }
            }
            currentimageId = beerId;
        }
    });

function addReview() {
    const reviewInput = document.getElementById('reviewsForm');
    const reviewsData = reviewInput.value.trim();
    console.log(reviewsData);

    if (reviewsData !== '') {
        const reviewItem = document.createElement("li");
        reviewItem.textContent = reviewsData;

        reviewItem.classList.add('reviewAdd');
        reviewItem.addEventListener('click', () => {
            const review_container = document.querySelector('#review_container ul');
            review_container.removeChild(reviewItem);
        });

        var addedReview = document.querySelector('#review_container ul');
        addedReview.appendChild(reviewItem);
        reviewsData.value = '';
    }
}
