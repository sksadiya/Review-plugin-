 <?php

/* 
Plugin Name: Product Review
Description: give your ratings 
version:1.0 
Author:sadiya
*/


function product_review_enqueue_scripts()
{
    // Enqueue jQuery
    wp_enqueue_script('jquery', plugins_url('/node_modules/jquery/dist/jquery.min.js', __FILE__), array(), '3.6.0', false);

    // Enqueue Bootstrap JavaScript
    wp_enqueue_script('bootstrap-js', plugins_url('/node_modules/bootstrap/dist/js/bootstrap.min.js', __FILE__), array('jquery'), '5.0.0', true);

    // Enqueue Bootstrap Icons CSS
    wp_enqueue_style('bootstrap-icons-css', plugins_url('/node_modules/bootstrap-icons/font/bootstrap-icons.css', __FILE__), array(), '1.7.0', 'all');

    // Enqueue Bootstrap CSS
    wp_enqueue_style('bootstrap-css', plugins_url('/node_modules/bootstrap/dist/css/bootstrap.min.css', __FILE__), array(), '5.0.0', 'all');

    // Enqueue your custom script
    wp_enqueue_script('product-review-script', plugins_url('/src/index.js', __FILE__), array('jquery'), '1.0', true);

    // Enqueue your custom styles
    wp_enqueue_style('product-review-style', plugins_url('/src/css/style.css', __FILE__), array(), '1.0', 'all');

    $root_url = get_site_url();
    wp_localize_script(
        'product-review-script',
        'MyPluginData',
        array(
            'root_url' => $root_url,
            'nonce' => wp_create_nonce('wp_rest'),
        )
    );
}
add_action('wp_enqueue_scripts', 'product_review_enqueue_scripts');

class ProductReviewPlugin
{
    function __construct()
    {
        add_action('admin_menu', array($this, 'adminPage'));
    }

    function adminPage()
    {
        add_menu_page('Product Review Settings', 'Product Review', 'manage_options', 'product-review-menu', array($this, 'menuPage'), 'dashicons-star-filled', 100);
    }

    function menuPage()
    {
        // Check if the form is submitted
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Handle form submission here
            // Retrieve and sanitize form data
            $passKey = esc_attr($_POST['pass_key']);
            $displayCode = esc_attr($_POST['display_code']);
            $isAuthenticationRequired = isset ($_POST['authentication_required']) ? 1 : 0;

            // Save the form data or perform any necessary actions
            update_option('pass_key', $passKey);
            update_option('display_code', $displayCode);
            update_option('authentication_required', $isAuthenticationRequired);

            // Display a success message or perform redirection if needed
            ?>
            <div class="updated notice">
                <p>Settings saved successfully!</p>
            </div>
            <?php
        }

        // Retrieve saved settings
        $passKey = get_option('pass_key');
        $displayCode = get_option('display_code');
        $isAuthenticationRequired = get_option('authentication_required');
        ?>

        <div class="wrap">
            <h1>one2Five Review App Global Config Settings</h1>

            <form method="post" action="">
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="pass_key">Pass Key</label></th>
                        <td><input type="text" name="pass_key" id="pass_key" value="<?php echo esc_attr($passKey); ?>"
                                style="width: 300px;" required></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="display_code">Display Code</label></th>
                        <td><input type="text" name="display_code" id="display_code"
                                value="<?php echo esc_attr($displayCode); ?>" style="width: 300px;" required></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="authentication_required">Review Authentication Required</label></th>
                        <td><input type="checkbox" name="authentication_required" id="authentication_required" <?php checked($isAuthenticationRequired, 1); ?>></td>
                    </tr>
                </table>

                <?php submit_button('Save Settings'); ?>
            </form>
        </div>
    <?php }
}

$productReviewPlugin = new productReviewPlugin();

function add_rating_button()
{
    echo '<button type="button" id="add-rating-btn" class="btn btn-dark add-rating-btn rounded-circle" data-product-id="' . get_the_ID() . '"><i class="bi bi-star-fill"></i></button>';
}
add_action('woocommerce_single_product_summary', 'add_rating_button', 30);

function add_rating_button_product_grid()
{
    echo '<button type="button" id="add-rating-btn" class="btn btn-dark add-rating-btn rounded-circle" data-product-id="' . get_the_ID() . '"><i class="bi bi-star-fill"></i></button>';
}
add_action('woocommerce_after_shop_loop_item_title', 'add_rating_button_product_grid');
function register_product_review_post_type()
{
    $labels = array(
        'name' => __('Product Reviews'),
        'singular_name' => __('Product Review'),
        'menu_name' => __('Product Reviews'),
        'name_admin_bar' => __('Product Review'),
        'add_new' => __('Add New'),
        'add_new_item' => __('Add New Product Review'),
        'new_item' => __('New Product Review'),
        'edit_item' => __('Edit Product Review'),
        'view_item' => __('View Product Review'),
        'all_items' => __('All Product Reviews'),
        'search_items' => __('Search Product Reviews'),
        'parent_item_colon' => __('Parent Product Reviews:'),
        'not_found' => __('No product reviews found.'),
        'not_found_in_trash' => __('No product reviews found in Trash.'),
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'product-review'),
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => null,
        'supports' => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments'),
        'show_in_rest' => true, // This line ensures the post type is visible in the REST API
    );

    register_post_type('product_review', $args);
}
add_action('init', 'register_product_review_post_type');

function register_product_review_rest_route()
{
    register_rest_route(
        'product-review/v1',
        '/create',
        array(
            'methods' => 'POST',
            'callback' => 'create_product_review',
            'permission_callback' => function () {
                return current_user_can('edit_posts') || current_user_can('subscriber') || current_user_can('editor');
            },
        )
    );
}
add_action('rest_api_init', 'register_product_review_rest_route');

function create_product_review(WP_REST_Request $request)
{
    $parameters = $request->get_params();

    // Extracting data from request parameters
    $title = sanitize_text_field($parameters['title']);
    $description = wp_kses_post($parameters['description']); // Allow only safe HTML tags
    $ratings = intval($parameters['ratings']); // Assuming ratings is an integer
    $product_id = $product_id = intval($parameters['product_id']); // Extract product ID
    $name = sanitize_text_field($parameters['name']); // Extract name
    $email = sanitize_email($parameters['email']); // Extract email
    $isRecommended = isset ($parameters['isRecommended']) ? sanitize_text_field($parameters['isRecommended']) : ''; // Extract isRecommended

    // Prepare post data
    $post_data = array(
        'post_title' => $title,
        'post_content' => $description,
        'post_type' => 'product_review',
        'post_status' => 'publish',
    );

    // Insert the product review post
    $post_id = wp_insert_post($post_data);

    if (!is_wp_error($post_id)) {
        // Save ratings as post meta
        update_post_meta($post_id, 'ratings', $ratings);

        // Save product_id as post meta
        update_post_meta($post_id, 'product_id', $product_id);

        // Save name as post meta
        update_post_meta($post_id, 'name', $name);

        // Save email as post meta
        update_post_meta($post_id, 'email', $email);

        // Save isRecommended as post meta
        update_post_meta($post_id, 'isRecommended', $isRecommended);


        return new WP_REST_Response(array('message' => 'Product review created successfully.'), 200);
    } else {
        return new WP_REST_Response(array('error' => 'Failed to create product review.'), 500);
    }
}

// Register custom REST route for retrieving product reviews in JSON format
function register_product_review_json_rest_route()
{
    register_rest_route(
        'product-review/v1',
        '/reviews',
        array(
            'methods' => 'GET',
            'callback' => 'get_product_reviews_json',
        )
    );
}
add_action('rest_api_init', 'register_product_review_json_rest_route');

// Callback function for retrieving product reviews in JSON format
// Callback function for retrieving product reviews in JSON format
function get_product_reviews_json($request)
{
    // Get the product_id parameter from the request
    $product_id = $request->get_param('product_id');
    $email = $request->get_param('email');

    // Prepare query arguments
    $query_args = array(
        'post_type' => 'product_review',
        'posts_per_page' => -1, // Retrieve all posts
    );

    // If product_id parameter is provided, add meta query
    if ($product_id) {
        $query_args['meta_query'] = array(
            array(
                'key' => 'product_id',
                'value' => $product_id,
                'compare' => '=',
            ),
        );
    }

    // Query product review posts
    $product_reviews = get_posts($query_args);

    // Prepare array to hold product review data
    $reviews_data = array();

    // Loop through product reviews and store data in array
    foreach ($product_reviews as $review) {
        $reviews_data[] = array(
            'id' => $review->ID,
            'title' => $review->post_title,
            'description' => $review->post_content,
            'ratings' => get_post_meta($review->ID, 'ratings', true), // Assuming ratings are saved as post meta
            'product_id' => get_post_meta($review->ID, 'product_id', true),
            'name' => get_post_meta($review->ID, 'name', true), // Get name from post meta
            'email' => get_post_meta($review->ID, 'email', true), // Get email from post meta
            'isRecommended' => get_post_meta($review->ID, 'isRecommended', true),
        );
    }

    return new WP_REST_Response($reviews_data, 200);
}

// Add custom tab for reviews
function add_custom_review_tab($tabs) {
    $tabs['custom_reviews_tab'] = array(
        'title'     => __('Custom Reviews', 'text-domain'),
        'priority'  => 50,
        'callback'  => 'display_custom_reviews_tab_content'
    );
    return $tabs;
}
add_filter('woocommerce_product_tabs', 'add_custom_review_tab');

// Display content for custom reviews tab
// Display content for custom reviews tab
function display_custom_reviews_tab_content() {
    global $product;

    // Get the product ID
    $product_id = $product->get_id();

    // Query arguments
    $args = array(
        'post_type' => 'product_review', // Custom post type name
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => 'product_id', // Meta key for product ID
                'value' => $product_id,
                'compare' => '=',
            ),
        ),
    );

    // Retrieve reviews for the product
    $reviews_query = new WP_Query($args);

    // Display reviews
    if ($reviews_query->have_posts()) {
        echo '<ul class="commentlist">'; // Opening ul tag for comments list

        while ($reviews_query->have_posts()) {
            $reviews_query->the_post();
            ?>
            <ul class="list-group">
            <li class="review list-group-item mb-3">
                <div id="comment-<?php the_ID(); ?>" class="comment_container">

                    <?php echo get_avatar(get_the_author_meta('ID'), 60); ?>

                    <div class="comment-text mt-3">
                        <div class="star-rating" role="img" aria-label="Rated <?php echo get_post_meta(get_the_ID(), 'ratings', true); ?> out of 5">
                            <span style="width: <?php echo intval(get_post_meta(get_the_ID(), 'ratings', true)) * 20; ?>%"></span>
                        </div>
                        <p class="meta">
                            <strong class="woocommerce-review__author"><?php the_author(); ?> </strong>
                            <span class="woocommerce-review__dash">–</span>
                            <time class="woocommerce-review__published-date" datetime="<?php echo get_the_date('c'); ?>"><?php echo get_the_date(); ?></time>
                        </p>
                        <div class="description"><?php the_content(); ?></div>
                    </div>
                </div>
            </li>
        </ul>
            <?php
        }

        echo '</ul>'; // Closing ul tag for comments list
        wp_reset_postdata();
    } else {
        echo '<p>There are no reviews yet.</p>';
    }
}

sdfdfdf