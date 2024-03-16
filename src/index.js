

jQuery(document).ready(function ($) {
    var modalHtml = `
        <div class="modal fade mt-3" id="exampleModalLong" tabindex="-1" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Add Your Ratings here</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container mt-4">
                            <div class="row">
                                <div class="col-12">
                                    <form id="ratingForm" method="POST">
                                        <div class="mb-3">
                                            <h3 class="mb-4">Write a review</h3>
                                            <p class="mb-4">Leave Your rating</p>
                                            <p class="mb-4">You can leave a review as a guest or <a href="#">log in</a> and leave a review as a
                                            registered
                                            user</p>
                                        </div>
                                        <div class="star mb-4">
                                            <a href="#" class="bi-star-fill" data-ratings="1"></a>
                                            <a href="#" class="bi-star-fill" data-ratings="2"></a>
                                            <a href="#" class="bi-star-fill" data-ratings="3"></a>
                                            <a href="#" class="bi-star-fill" data-ratings="4"></a>
                                            <a href="#" class="bi-star-fill" data-ratings="5"></a>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="side">
                                                <div>Design</div>
                                            </div>
                                            <div class="middle">
                                                <div class="bar-container">
                                                    <div class="bar-5"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="side">
                                                <div>Functionality</div>
                                            </div>
                                            <div class="middle">
                                                <div class="bar-container">
                                                    <div class="bar-4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="side">
                                                <div>Quality</div>
                                            </div>
                                            <div class="middle">
                                                <div class="bar-container">
                                                    <div class="bar-3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <input type="text" class="form-control" id="name" name="name" aria-describedby="nameHelp" required>
                                            <small id="nameHelp" class="form-text text-muted">Please include your first name</small>
                                        </div>

                                        <div class="mb-3 form-group">
                                            <label for="email" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" required>
                                            <div id="emailHelp" class="form-text">Please include email.</div>
                                        </div>
                                        <div class="mb-3 form-group">
                                            <label for="title" class="form-label">Give the review a title that summarizes its content</label>
                                            <input type="text" class="form-control" id="title" name="title" aria-describedby="textHelp" required>
                                            <div id="textHelp" class="form-text">Please include the first title.</div>
                                        </div>
                                        <input type="hidden" id="ratings" name="ratings"> 
                                        <input type="hidden" id="product_id" name="product_id">
                                        <div class="mb-3 form-group">
                                            <label for="description" class="form-label">write your review below.we really appreciate your
                                            opinion.</label>
                                            <textarea class="form-control" id="description" name="description" rows="5" aria-describedby="textHelp"
                                            required></textarea>
                                            <div id="textHelp" class="form-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id
                                            massa sit amet odio consectetur vulputate. Fusce lacinia justo neque, vel blandit dui pretium in. Cras
                                            fringilla et velit vitae lacinia. Morbi imperdiet risus at orci aliquet, in laoreet erat rutrum. Cras
                                            ullamcorper dui nec libero cursus blandit. Vestibulum hendrerit tellus dictum ipsum imperdiet, nec
                                            pharetra leo vulputate. Aenean bibendum enim eu ex efficitur, vitae viverra nulla vulputate. Cras mattis,
                                            ex vel ornare vulputate, justo arcu pulvinar lacus, nec pretium urna ipsum et nunc. Duis eleifend
                                            scelerisque lacus, vel ultricies orci faucibus at. Nullam at orci diam. Curabitur tristique nunc nibh, ac
                                            tempus urna pretium in.</div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="">Would you recommend this product?</label><br>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="isRecommended" id="isRecommendedYes" value="Yes">
                                                <label class="form-check-label" for="isRecommended">Yes</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="isRecommended" id="isRecommendedNo" value="No">
                                                <label class="form-check-label" for="isRecommended">No</label>
                                            </div>
                                        </div>
                                        <div class="mt-5 mb-5 text-center">
                                            <button class="btn btn-dark" type="submit">Submit your review</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    $("body").append(modalHtml);

    // // Function to fetch reviews data for the current product
    // function fetchReviewsData(productId) {

    //     $('#title').val('');
    //     $('#description').val('');
    //     $('#ratings').val('');
    //     $('#name').val('');
    //     $('#email').val('');
    //     $('#isRecommendedYes').prop('checked', false);
    //     $('#isRecommendedNo').prop('checked', false);
    //     $('.star a').removeClass('active');
        
    //     $.ajax({
    //         url: MyPluginData.root_url + '/wp-json/product-review/v1/reviews?product_id=' + productId,
    //         method: 'GET',
    //         beforeSend: function (xhr) {
    //             xhr.setRequestHeader('X-WP-Nonce', MyPluginData.nonce);
    //         },
    //         success: function (response) {
    //             // If reviews data is available, pre-fill the form fields
    //             if (response.length > 0) {
    //                 var review = response[0]; // Assuming only one review per product
    //                 $('#title').val(review.title);
    //                 $('#description').val(review.description);
    //                 $('#ratings').val(review.ratings);
    //                 $('#name').val(review.name);
    //                 $('#email').val(review.email);
                    
    //                 // Check or uncheck the isRecommended radio button based on the value retrieved
    //                 if (review.isRecommended === "Yes") {
    //                     $('#isRecommendedYes').prop('checked', true);
    //                 } else {
    //                     $('#isRecommendedNo').prop('checked', true);
    //                 }
                    
    //                 $('.star a').removeClass('active');
    //                 $('.star a[data-ratings="' + review.ratings + '"]').prevAll('a').addBack().addClass('active');

    //                 $('#title, #description, #name, #email').prop('readonly', true);
    //                 $('input[name="isRecommended"]').prop('disabled',true);
    //                 $('.star a').off('click'); 
    //                 $('#ratingForm button[type="submit"]').prop('disabled', true);
    //             } else {
    //                 $('#title, #description, #name, #email').prop('readonly', false);
    //                 $('input[name="isRecommended"]').prop('disabled', false);
    //                 $('.star a').removeClass('active').on('click', function() {
    //                     $('.star a').removeClass('active');
    //                     $(this).prevAll('a').addBack().addClass('active');
    //                     $('#ratings').val($(this).data('ratings'));
    //                 }); 
    //                 $('#ratingForm button[type="submit"]').prop('disabled', false);
    //             }

    //         },
    //         error: function (xhr, textStatus, errorThrown) {
    //             console.error('Error fetching product reviews:', errorThrown);
    //         }
    //     });
    // }
    

    // Event delegation for dynamically added "Add Ratings" buttons
    $(document).on("click", ".add-rating-btn", function () {
        var productId = $(this).data('product-id');
        $('#product_id').val(productId);

        // Fetch reviews data for the current product
        // fetchReviewsData(productId);

        $('#exampleModalLong').modal('show');
    });

    $('.star a').on('click', function() {
        // Remove 'active' class from all stars
        $('.star a').removeClass('active');
        // Add 'active' class to the clicked star and all stars before it
        $(this).prevAll('a').addBack().addClass('active');
        // Set the rating value in the hidden input field
        $('#ratings').val($(this).data('ratings'));
    });

    $('#ratingForm').on('submit', function (event) {
        event.preventDefault(); 

        // Perform validation
        var isValid = true;
        $('#ratingForm input[required], #ratingForm textarea[required]').each(function() {
            if ($.trim($(this).val()) === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        // Email validation
        var email = $('#email').val();
        if (email && !isValidEmail(email)) {
            isValid = false;
            $('#email').addClass('is-invalid');
            $('#emailHelp').text('Please enter a valid email address.');
        } else {
            $('#email').removeClass('is-invalid');
            $('#emailHelp').text('');
        }

        if (!isValid) {
            return;
        }

        // Form data serialization
        var formData = $(this).serializeArray();

        // AJAX submission
        $.ajax({
            url: MyPluginData.root_url + '/wp-json/product-review/v1/create', 
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-WP-Nonce', MyPluginData.nonce);
            },
            data: formData, 
            success: function (response) {
                console.log('Product review created successfully:', response);
                $('#exampleModalLong').modal('hide');
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Error creating product review:', errorThrown);
            }
        });
    });

        // Clear form fields when modal is hidden
        $('#exampleModalLong').on('hidden.bs.modal', function (e) {
            $('#title').val('');
            $('#description').val('');
            $('#ratings').val('');
            $('#name').val('');
            $('#email').val('');
            $('#isRecommendedYes').prop('checked', false);
            $('#isRecommendedNo').prop('checked', false);
            $('.star a').removeClass('active');
        });
        
    // Email validation function
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Fetch reviews data for the product when the page is loaded
    // var productId = $('#product_id').val(); // Assuming you have a hidden input field with product ID
    // if (productId) {
    //     fetchReviewsData(productId);
    // }
});






















// jQuery(document).ready(function ($) {
//     var modalHtml = `
//         <div class="modal fade mt-3" id="exampleModalLong" tabindex="-1" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
//             <div class="modal-dialog modal-dialog-scrollable modal-lg">
//                 <div class="modal-content">
//                     <div class="modal-header">
//                         <h5 class="modal-title" id="exampleModalLongTitle">Add Your Ratings here</h5>
//                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                     </div>
//                     <div class="modal-body">
//                         <form id="ratingForm" method="POST">
//                             <div className="row">
//                                 <div class="modal-body">
//                                     <div class="mb-3">
//                                         <label for="title" class="form-label">Title</label>
//                                         <input type="text" class="form-control" id="title" name="title" required>
//                                     </div>
//                                     <div class="mb-3">
//                                         <label for="description" class="form-label">Description</label>
//                                         <textarea class="form-control" id="description" name="description" required></textarea>
//                                     </div>
//                                     <div class="star">
//                                         <a href="#" class="bi-star-fill" data-ratings="1"></a>
//                                         <a href="#" class="bi-star-fill" data-ratings="2"></a>
//                                         <a href="#" class="bi-star-fill" data-ratings="3"></a>
//                                         <a href="#" class="bi-star-fill" data-ratings="4"></a>
//                                         <a href="#" class="bi-star-fill" data-ratings="5"></a>
//                                     </div>
//                                     <input type="hidden" id="ratings" name="ratings"> <!-- Hidden input to store rating value -->
//                                     <input type="hidden" id="product_id" name="product_id">
//                                 </div>
//                             </div>
//                             <div class="modal-footer">
//                                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                 <button type="submit" class="btn btn-primary">Submit</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;

//     $("body").append(modalHtml);

//     // Function to fetch reviews data for the current product
//     function fetchReviewsData(productId) {
//         $.ajax({
//             url: MyPluginData.root_url + '/wp-json/product-review/v1/reviews?product_id=' + productId,
//             method: 'GET',
//             beforeSend: function (xhr) {
//                 xhr.setRequestHeader('X-WP-Nonce', MyPluginData.nonce);
//             },
//             success: function (response) {
//                 // If reviews data is available, pre-fill the form fields
//                 if (response.length > 0) {
//                     var review = response[0]; // Assuming only one review per product
//                     $('#title').val(review.title);
//                     $('#description').val(review.description);
//                     $('#ratings').val(review.ratings);
//                     $('.star a').removeClass('active');
//                     $('.star a[data-ratings="' + review.ratings + '"]').prevAll('a').addBack().addClass('active');
//                 }
//             },
//             error: function (xhr, textStatus, errorThrown) {
//                 console.error('Error fetching product reviews:', errorThrown);
//             }
//         });
//     }

//     // Event delegation for dynamically added "Add Ratings" buttons
//     $(document).on("click", ".add-rating-btn", function () {
//         var productId = $(this).data('product-id');
//         $('#product_id').val(productId);

//         // Fetch reviews data for the current product
//         fetchReviewsData(productId);

//         $('#exampleModalLong').modal('show');
//     });

//     $('.star a').on('click', function() {
//         // Remove 'active' class from all stars
//         $('.star a').removeClass('active');
//         // Add 'active' class to the clicked star and all stars before it
//         $(this).prevAll('a').addBack().addClass('active');
//         // Set the rating value in the hidden input field
//         $('#ratings').val($(this).data('ratings'));
//     });

//     $('#ratingForm').on('submit', function (event) {
//         event.preventDefault(); 

//         var formData = $(this).serializeArray();

//         $.ajax({
//             url: MyPluginData.root_url + '/wp-json/product-review/v1/create', 
//             method: 'POST',
//             beforeSend: function (xhr) {
//                 xhr.setRequestHeader('X-WP-Nonce', MyPluginData.nonce);
//             },
//             data: formData, 
//             success: function (response) {
//                 console.log('Product review created successfully:', response);
//                 $('#exampleModalLong').modal('hide');
//             },
//             error: function (xhr, textStatus, errorThrown) {
//                 console.error('Error creating product review:', errorThrown);
//             }
//         });
//     });

//     // Fetch reviews data for the product when the page is loaded
//     var productId = $('#product_id').val(); // Assuming you have a hidden input field with product ID
//     if (productId) {
//         fetchReviewsData(productId);
//     }
// });
