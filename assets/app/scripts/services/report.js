'use strict';

angular.module('app')
    .factory('ReportingService', function() {
        return {
            printData: function(divToPrint) {
                var newWin = window.open('', 'Print-Window', 'width=800,height=600');

                var content = '<!DOCTYPE html>\
                    <html xmlns="http://www.w3.org/1999/xhtml">\
                    <head>\
                        <meta charset="utf-8">\
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                        <meta name="description" content="">\
                        <meta name="author" content="">\
                        <title>Print Directory</title>\
                        <link rel="stylesheet" href="assets/libs/jquery/bootstrap/dist/css/bootstrap.min.css">\
                        <link rel="stylesheet" href="assets/font-awesome/css/font-awesome.min.css">\
                        <style type="text/css" media="screen">body {padding-top: 50px; }</style>\
                    </head>\
                    <body>\
                    <div class="container">\
                        <div class="row">\
                            <div class="col-xs-12">\
                                <div class="text-center">\
                                <img src="assets/img/printLogo.png" alt="Logo" class="img-responsive" style="width:300px;height:100px;">\
                            </div>\
                            <div class="row">\
                                <div class="col-xs-12"> ' + divToPrint.innerHTML + '</div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <br></br>\
                            <div class="col-xs-12 col-xs-offset-2">\
                            </div>\
                        </div>\
                        </body>\
                        </html>';


                newWin.document.open();
                newWin.document.write(content);
                newWin.document.close();
            },

            normalPrint: function(divToPrint) {
                var newWin = window.open('', 'Print-Window', 'width=920,height=600, resizable=0');

                var content = '<!DOCTYPE html>\
                    <html xmlns="http://www.w3.org/1999/xhtml">\
                    <head>\
                        <meta charset="utf-8">\
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                        <meta name="description" content="">\
                        <meta name="author" content="">\
                        <title>J3 Print Certificate</title>\
                        <link rel="stylesheet" href="assets/libs/jquery/bootstrap/dist/css/bootstrap.min.css">\
                        <link rel="stylesheet" href="assets/font-awesome/css/font-awesome.min.css">\
                        <link rel="stylesheet"  href="assets/app/styles/myfont.css">\
                        <style type="text/css" media="screen">body {padding-top: 50px; } .text-wrap-left {float: left;margin: 10px;}</style>\
                        <style type="text/css">@media print { @page { margin: 0; } }</style>\
                    </head>\
                    <body onload="window.print()">\
                    <div class="container" style="magrin: 3%;">\
                        <div class="col-lg-12"> ' + divToPrint.innerHTML + '</div>\
                    </div>\
                    </body>\
                    </html>';


                newWin.document.open();
                newWin.document.write(content);
                newWin.document.close();
            },

            printCertificate: function(divToPrint) {
                var newWin = window.open('', 'Print-Window', 'width=920,height=600, resizable=0');

                var content = '<!DOCTYPE html>\
                    <head>\
                        <link rel="stylesheet"  href="assets/app/styles/myfont.css">\
                        <style type="text/css">@media print { @page { margin: 0; width:100%; height:100%; page-break-after:always } }</style>\
                    </head>\
                    <body onload="window.print()">\
                        <div> ' + divToPrint.innerHTML + '</div>\
                    </body>\
                    </html>';


                newWin.document.open();
                newWin.document.write(content);
                newWin.document.close();
            }
        };
    });