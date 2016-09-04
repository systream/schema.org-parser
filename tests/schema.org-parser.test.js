(function () {
    'use strict';

    document.body.innerHTML += '<div id="playground"></div>';

    function addHtmlToPlayground(html) {
        document.getElementById('playground').innerHTML = html;
    }

    function assertMicroFormat(expectedOutput, htmlInput, itMsg) {
        addHtmlToPlayground(htmlInput);
        var microformats = getMicroformats();
        it(itMsg, function () {
            expect(microformats).toBe(expectedOutput);
        });
    }

    describe('No microformat', function () {
        assertMicroFormat([], '<a href="foo">Bar</a>');
    });

    describe('One microformat', function () {
        var result = [
            {
                itemType: 'Product',
                category: 'category name',
                color: 'black or white',
                name: 'product name',
                url: 'http://foo.bar'
            }
        ];

        assertMicroFormat(result, '<div itemscope itemtype="http://schema.org/Product">' +
            '<span itemprop="category">category name</span>' +
            '<span itemprop="color">black or white</span>' +
            '<span itemprop="name">product name</span>' +
            '<span itemprop="url">http://foo.bar</span>' +
            '</div>');
    });


    describe('One microformat trim', function () {
        var result = [
            {
                itemType: 'Product',
                name: 'product name'
            }
        ];

        assertMicroFormat(result, '<div itemscope ' +
            'itemtype="http://schema.org/Product">' +
            '<span itemprop="name">       product name   </span>' +
            '</div>');
    });

    describe('One microformat trim break line', function () {
        var result = [
            {
                itemType: 'Product',
                name: "product name"
            }
        ];

        assertMicroFormat(result, '<div itemscope itemtype="http://schema.org/Product">' +
            '<span itemprop="name">product' +
            "\r\n name</span>" +
            '</div>');
    });


    /*
    describe('Two microformat', function () {
        assertMicroFormat([], '<html><body><a href="foo">Bar</a></body></html>');
    });

    describe('One with sub microformat', function () {
        assertMicroFormat([], '<html><body><a href="foo">Bar</a></body></html>');
    });

    describe('Two with one sub microformat', function () {
        assertMicroFormat([], '<html><body><a href="foo">Bar</a></body></html>');
    });

    describe('One with 3 level sub microformat', function () {
        assertMicroFormat([], '<html><body><a href="foo">Bar</a></body></html>');
    });*/

})();