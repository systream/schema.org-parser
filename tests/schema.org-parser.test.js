(function () {
    'use strict';

    document.body.innerHTML += '<div id="playground"></div>';

    function addHtmlToPlayground(html) {
        document.getElementById('playground').innerHTML = html;
    }

    function assertMicroFormat(expectedOutput, htmlInput, itMsg) {
        addHtmlToPlayground(htmlInput);
        var microformats = getMicroFormats();
        it(itMsg, function () {
            expect(microformats).toEqual(expectedOutput);
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
            '<a itemprop="url" href="http://foo.bar">Foo bar</a>' +
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
            '<span itemprop="name">product ' +
            "\r\n name</span>" +
            '</div>');
    });

    describe('One microformat trim itemprop name', function () {
        var result = [
            {
                itemType: 'Product',
                name: "product name"
            }
        ];

        assertMicroFormat(result, '<div itemscope itemtype="http://schema.org/Product">' +
            '<span itemprop=" name ">product ' +
            "\r\n name</span>" +
            '</div>');
    });

    describe('One microformat break line itemprop name', function () {
        var result = [
            {
                itemType: 'Product',
                name: "product name"
            }
        ];

        assertMicroFormat(result, '<div itemscope itemtype="http://schema.org/Product">' +
            '<span itemprop=" name \r\n ' +
            '">product ' +
            "\r\n name</span>" +
            '</div>');
    });

    describe('Two microformat', function () {
        var result = [
            {
                itemType: 'Product',
                category: 'category name',
                color: 'black or white',
                name: 'product name',
                url: 'http://foo.bar'
            },
            {
                itemType: 'Product',
                category: 'category name2',
                color: 'black or white2',
                name: 'product name2',
                url: 'http://foo.bar2'
            }

        ];

        assertMicroFormat(result,
            '<div itemscope itemtype="http://schema.org/Product">' +
            '<span itemprop="category">category name</span>' +
            '<span itemprop="color">black or white</span>' +
            '<span itemprop="name">product name</span>' +
            '<link itemprop="url" href="http://foo.bar">Foo bar</link>' +
            '</div>' +
            '<div itemscope itemtype="http://schema.org/Product">' +
            '<span itemprop="category">category name2</span>' +
            '<span itemprop="color">black or white2</span>' +
            '<span itemprop="name">product name2</span>' +
            '<link itemprop="url" href="http://foo.bar2">Foo bar2</link>' +
            '</div>'
        );
    });

    describe('Two microformat with sub microformat', function () {
        var result = [
            {
                itemType: 'Product',
                category: 'category name',
                color: 'black or white',
                name: 'product name',
                url: 'http://foo.bar',
                brand: {
                    itemType: 'Brand',
                    url: 'http://brand.foo.bar',
                    name: 'brand'
                }
            },
            {
                itemType: 'Product',
                category: 'category name2',
                color: 'black or white2',
                name: 'product name2',
                url: 'http://foo.bar2'
            }

        ];

        assertMicroFormat(result,
            '<div itemscope itemtype="http://schema.org/Product">' +
            '<span itemprop="category">category name</span>' +
            '<span itemprop="color">black or white</span>' +
            '<span itemprop="name">product name</span>' +
            '<link itemprop="url" href="http://foo.bar">Foo bar</link>' +
            '<strong itemprop="brand" itemscope="" itemtype="http://schema.org/Brand">' +
            '<a href="http://brand.foo.bar" itemprop="url">' +
            '<div itemprop="name">brand</div>' +
            '</a>' +
            '</strong>' +
            '</div>' +
            '<div itemscope itemtype="http://schema.org/Product">' +
            '<span itemprop="category">category name2</span>' +
            '<span itemprop="color">black or white2</span>' +
            '<span itemprop="name">product name2</span>' +
            '<link itemprop="url" href="http://foo.bar2">123</link>' +
            '</div>'
        );
    });

})();