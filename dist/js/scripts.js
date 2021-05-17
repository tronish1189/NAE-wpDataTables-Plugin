naeWpDataTables_set_x_attribute_chart_titles();

function naeWpDataTables_set_x_attribute_chart_titles() {
    document.addEventListener('load', function () {
        document.querySelectorAll('.highcharts-titles').length > 0 ?
            const data_table_titles = document.querySelectorAll('.highcharts-titles');
        data_table_titles.forEach((title) => {
            title.childNodes.forEach((child) => {
                child.nodeName == '#text' ? '' : child.setAttribute('x', '0');
            })
        })
    })
}


setTimeout(formatTitles, 0);

function formatTitles() {
    document.addEventListener('load     ', function () {
        const chartTitles = document.querySelectorAll('.highcharts-title');
        if (chartTitles.length > 0) {
            chartTitles.forEach((item) => {
                item.setAttribute('x', '0');
                item.setAttribute('text-anchor', 'left');
            });
        }
    })
}

if (typeof Highcharts != 'undefined') {
    /*Plugin to render charts as they're visible in viewport
    https://highcharts.uservoice.com/forums/55896-highcharts-javascript-api/suggestions/4457022-start-the-animation-when-the-chart-scrolls-in-to-v
    */
    (function (H) {

        var pendingRenders = [];

        // https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
        function isElementInViewport(el) {

            var rect = el.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (
                    window.innerHeight ||
                    document.documentElement.clientHeight
                ) &&
                rect.right <= (
                    window.innerWidth ||
                    document.documentElement.clientWidth
                )
            );
        }

        H.wrap(H.Series.prototype, 'render', function deferRender(proceed) {
            var series = this,
                renderTo = this.chart.container.parentNode;

            // It is appeared, render it
            if (isElementInViewport(renderTo) || !series.options.animation) {
                proceed.call(series);

                // It is not appeared, halt renering until appear
            } else {
                pendingRenders.push({
                    element: renderTo,
                    appear: function () {
                        proceed.call(series);
                    }
                });
            }
        });

        function recalculate() {
            pendingRenders.forEach(function (item) {
                if (isElementInViewport(item.element)) {
                    item.appear();
                    H.erase(pendingRenders, item);
                }
            });
        }

        if (window.addEventListener) {
            ['DOMContentLoaded', 'load', 'scroll', 'resize']
            .forEach(function (eventType) {
                addEventListener(eventType, recalculate, false);
            });
        }

    }(Highcharts));


    /*Settings to configure NAE styling for Highcharts
    https://www.highcharts.com/docs/chart-design-and-style/themeshttps://www.highcharts.com/docs/chart-design-and-style/themeshttps://www.highcharts.com/docs/chart-design-and-style/themes
    */
    Highcharts.theme = {
        colors: ['#21d279', '#393745', '#6263ed', '#8adcfc', '#fb594d', '#a0a1a5'],
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(240, 240, 255)']
                ]
            },
            events: {
                load: function (event) {
                    const credits = document.querySelectorAll('.highcharts-credits');

                    credits.forEach((credit) => {
                        if (credit.innerHTML.indexOf('Highcharts') != -1) {
                            credit.style.display = 'none';
                        }
                    });

                    function formatTitles() {
                        const chartTitles = document.querySelectorAll('.highcharts-title');
                        if (chartTitles.length > 0) {
                            chartTitles.forEach((item) => {
                                item.setAttribute('x', '0');
                                item.setAttribute('text-anchor', 'left');
                                /*if (item.hasChildNodes()) {
                                    const children = item.childNodes;
                                    for (let i = 0; i < children.length; i++) {
                                        children[i].setAttribute('x', '0');
                                    }
                                }*/
                            });
                        }
                    }
                    formatTitles();
                    window.addEventListener('resize', formatTitles)
                },
            },
            legend: {
                layout: 'vertical',
                title: {
                    text: 'City<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
                    style: {
                        fontStyle: 'italic'
                    }
                },
            },
            tooltip: {
                padding: 20,
                borderColor: 'black',
            }
        },
        credits: {
            position: {
                align: 'left',
                x: 0,
            },
            style: {
                fontFamily: 'FoundersGroteskWeb-Medium, Helvetica, Arial sans-serif',
                fontWeight: 400,
                color: '#9c9da1',
                fontSize: '16px',
                top: '10px',
                position: 'relative',
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    connectorColor: 'transparent',
                    connectorShape: 'straight',
                    distance: '5%',
                    color: 'black',
                    format: '<b>{point.name} FFFFFFF</b>: {point.percentage:.1f}%',
                    style: {
                        borderColor: 'green',
                        color: '#000',
                        fontSize: '14px',
                        fontFamily: 'FoundersGroteskTextWeb-Regular, Helvetica, Arial sans-serif',
                        textOutline: 'none'
                    },
                },
                showInLegend: true,
            }
        },
        title: {
            x: 0,
            align: 'left',
            style: {
                color: '#000',
                fontSize: '18px',
                fontFamily: 'FoundersGroteskWeb-Medium, Helvetica, Arial sans-serif',
                fontWeight: 400,
            }
        },
        subtitle: {
            style: {
                color: '#666666',
                font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        tooltip: {
            padding: 20,
            borderColor: 'black',
            shadow: false,
            style: {
                color: '#000',
                fontSize: '14px',
                fontFamily: 'FoundersGroteskTextWeb-Regular, Helvetica, Arial sans-serif'
            }
        },
        legend: {
            itemStyle: {
                color: '#000',
                fontSize: '14px',
                fontFamily: 'FoundersGroteskTextWeb-Regular, Helvetica, Arial sans-serif'
            },
            itemHoverStyle: {
                color: 'gray'
            }
        },
        xAxis: {
            labels: {
                style: {
                    color: '#9c9da1',
                    fontFamily: 'FoundersGroteskWeb-Medium, Helvetica, Arial sans-serif'
                }
            },
            title: {
                style: {
                    color: '#9c9da1',
                    fontFamily: 'FoundersGroteskWeb-Medium, Helvetica, Arial sans-serif'
                }
            }
        },
        yAxis: {
            labels: {
                style: {
                    color: '#9c9da1',
                    fontFamily: 'FoundersGroteskWeb-Medium, Helvetica, Arial sans-serif'
                }
            },
            title: {
                style: {
                    color: '#9c9da1',
                    fontFamily: 'FoundersGroteskWeb-Medium, Helvetica, Arial sans-serif'
                }
            }
        }
    };
    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);
}