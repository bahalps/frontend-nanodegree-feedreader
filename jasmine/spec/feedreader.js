$(function () {
    describe('RSS Feeds', function () {
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has url', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                // Make sure feed url is a string so it can't be null, false, or
                // any other value that could be "empty".
                expect(typeof feed.url).toBe('string');
                // Now that feed url must be a string, make sure it isn't empty.
                expect(feed.url).not.toBe('');
            });
        });

        it('has name', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                // Make sure feed name is a string so it can't be null, false, 
                //or any other value that could be "empty".
                expect(typeof feed.name).toBe('string');
                // Now that feed name must be a string, make sure it isn't empty
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The Menu', function () {
        it('hidden menu', function () {
            var menuLeft = $('.menu').offset().left;
            var menuRight = menuLeft + $('.menu').width();
            // Display of menu is controlled by adding or removing 'menu-hidden'
            // class to the body.  This changes the css transform property of
            // the menu, which moves it onto or off of the screen.

            // Menu should be hidden initially, so body should have
            // the 'menu-hidden' class.
            expect($('body').hasClass('menu-hidden')).toBe(true);
            // To make sure the 'menu-hidden' class is working properly
            // (no one has changed the css) check if the menu's left and right
            // edges are to the left of the left edge of the screen.
            expect(menuLeft <= 0).toBe(true);
            expect(menuRight <= 0).toBe(true);
        });

        it('should toggle', function () {
            var menuIcon = $('.menu-icon-link');

            // Add 'notransition' class to the menu to make testing easier.
            // The transform changes will now be instant and can be tested
            // without the use of any asynchronous testing.
            $('.menu').addClass('notransition');

            menuIcon.trigger('click');
            var menuLeft = $('.menu').offset().left;
            var menuRight = menuLeft + $('.menu').width();
            // Confirm body loses menu-hidden class after first click.
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // Confirm menu's left and right edges are now to the right of
            // the left edge of the screen (visible).
            expect(menuLeft >= 0).toBe(true);
            expect(menuRight >= 0).toBe(true);

            menuIcon.trigger('click');
            menuLeft = $('.menu').offset().left;
            menuRight = menuLeft + $('.menu').width();
            // Confirm body gains menu-hidden class after second click.
            expect($('body').hasClass('menu-hidden')).toBe(true);
            // Confirm menu's left and right edges are now to the left of
            // the left edge of the screen (hidden).
            expect(menuLeft <= 0).toBe(true);
            expect(menuRight <= 0).toBe(true);

            // Done with this test, so remove 'notransition' class.
            $('.menu').removeClass('notransition');
            // Make sure the notransition class was actually removed.
            expect($('.menu').hasClass('notransition')).toBe(false);
        });
    });

    describe('Initial Entries', function () {
        beforeAll(function (done) {
            loadFeed(1, done);
        });

        it('should add entries', function (done) {
            var entries = $('.feed a').children('.entry');
            // If there is a '.entry' element loaded, the length of the
            // the selector will be greater than 0.
            expect(entries.length).toBeGreaterThan(0);
            done();
        });

        // Cleanup after the test, go back to the first feed.
        afterAll(function (done) {
            loadFeed(0, done);
        });
    });

    describe('New Feed Selection', function () {
        var beforeContent,
            afterContent;

        beforeAll(function (done) {
            beforeContent = $('.feed a').children('.entry');
            loadFeed(2, done);
        });

        it('should change content', function (done) {
            afterContent = $('.feed a').children('.entry');
            // ".entry" elements loaded should be different after loadFeed
            // completes.
            expect(beforeContent).not.toBe(afterContent);
            done();
        });

        // Cleanup after the test, go back to the first feed.
        afterAll(function (done) {
            loadFeed(0, done);
        });
    });
}());