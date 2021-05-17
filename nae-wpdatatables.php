<?php

/**
 * Plugin Name: NAE wpDataTables
 * Description: This plugin extends functionality the wpDataTables plugin for the NAE website
 **/


//Function to enqueue styles and scripts
function naeWpdatatables_enqueueFiles()
{
    ////*FOOTER SCRIPTS*/////
    //Enqueue config scripts
    wp_enqueue_script('script-naeWpdatatables', plugins_url('/dist/js/scripts.js', __FILE__), array('wpdatatables-highcharts'), '',  true);
}

add_action('wdt-enqueue-scripts-after-chart-render', 'naeWpdatatables_enqueueFiles');
