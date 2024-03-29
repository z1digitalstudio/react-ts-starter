/// <reference types="Cypress" />
//
// **** Kitchen Sink Tests ****
//
// This app was developed to demonstrate
// how to write tests in Cypress utilizing
// all of the available commands
//
// Feel free to modify this spec in your
// own application as a jumping off point

// Please read our "Introduction to Cypress"
// https://on.cypress.io/introduction-to-cypress

describe('Kitchen Sink', () => {
  it('.should() - assert that <title> is correct', () => {
    // https://on.cypress.io/visit
    cy.visit('https://example.cypress.io');

    // Here we've made our first assertion using a '.should()' command.
    // An assertion is comprised of a chainer, subject, and optional value.

    // https://on.cypress.io/should
    // https://on.cypress.io/and

    // https://on.cypress.io/title
    cy.title().should('include', 'Kitchen Sink');
    //   ↲               ↲            ↲
    // subject        chainer      value
  });

  context('Querying', () => {
    beforeEach(() => {
      // Visiting our app before each test removes any state build up from
      // previous tests. Visiting acts as if we closed a tab and opened a fresh one
      cy.visit('https://example.cypress.io/commands/querying');
    });

    // Let's query for some DOM elements and make assertions
    // The most commonly used query is 'cy.get()', you can
    // think of this like the '$' in jQuery

    it('cy.get() - query DOM elements', () => {
      // https://on.cypress.io/get

      // Get DOM elements by id
      cy.get('#query-btn').should('contain', 'Button');

      // Get DOM elements by class
      cy.get('.query-btn').should('contain', 'Button');

      cy.get('#querying .well>button:first').should('contain', 'Button');
      //              ↲
      // Use CSS selectors just like jQuery
    });

    it('cy.contains() - query DOM elements with matching content', () => {
      // https://on.cypress.io/contains
      cy.get('.query-list')
        .contains('bananas').should('have.class', 'third');

      // we can pass a regexp to `.contains()`
      cy.get('.query-list')
        .contains(/^b\w+/).should('have.class', 'third');

      cy.get('.query-list')
        .contains('apples').should('have.class', 'first');

      // passing a selector to contains will yield the selector containing the text
      cy.get('#querying')
        .contains('ul', 'oranges').should('have.class', 'query-list');

      // `.contains()` will favor input[type='submit'],
      // button, a, and label over deeper elements inside them
      // this will not yield the <span> inside the button,
      // but the <button> itself
      cy.get('.query-button')
        .contains('Save Form').should('have.class', 'btn');
    });

    it('.within() - query DOM elements within a specific element', () => {
      // https://on.cypress.io/within
      cy.get('.query-form').within(() => {
        cy.get('input:first').should('have.attr', 'placeholder', 'Email');
        cy.get('input:last').should('have.attr', 'placeholder', 'Password');
      });
    });

    it('cy.root() - query the root DOM element', () => {
      // https://on.cypress.io/root
      // By default, root is the document
      cy.root().should('match', 'html');

      cy.get('.query-ul').within(() => {
        // In this within, the root is now the ul DOM element
        cy.root().should('have.class', 'query-ul');
      });
    });
  });

  context('Traversal', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/traversal');
    });

    // Let's query for some DOM elements and make assertions

    it('.children() - get child DOM elements', () => {
      // https://on.cypress.io/children
      cy.get('.traversal-breadcrumb').children('.active')
        .should('contain', 'Data');
    });

    it('.closest() - get closest ancestor DOM element', () => {
      // https://on.cypress.io/closest
      cy.get('.traversal-badge').closest('ul')
        .should('have.class', 'list-group');
    });

    it('.eq() - get a DOM element at a specific index', () => {
      // https://on.cypress.io/eq
      cy.get('.traversal-list>li').eq(1).should('contain', 'siamese');
    });

    it('.filter() - get DOM elements that match the selector', () => {
      // https://on.cypress.io/filter
      cy.get('.traversal-nav>li').filter('.active').should('contain', 'About');
    });

    it('.find() - get descendant DOM elements of the selector', () => {
      // https://on.cypress.io/find
      cy.get('.traversal-pagination').find('li').find('a')
        .should('have.length', 7);
    });

    it('.first() - get first DOM element', () => {
      // https://on.cypress.io/first
      cy.get('.traversal-table td').first().should('contain', '1');
    });

    it('.last() - get last DOM element', () => {
      // https://on.cypress.io/last
      cy.get('.traversal-buttons .btn').last().should('contain', 'Submit');
    });

    it('.next() - get next sibling DOM element', () => {
      // https://on.cypress.io/next
      cy.get('.traversal-ul').contains('apples').next().should('contain', 'oranges');
    });

    it('.nextAll() - get all next sibling DOM elements', () => {
      // https://on.cypress.io/nextall
      cy.get('.traversal-next-all').contains('oranges')
        .nextAll().should('have.length', 3);
    });

    it('.nextUntil() - get next sibling DOM elements until next el', () => {
      // https://on.cypress.io/nextuntil
      cy.get('#veggies').nextUntil('#nuts').should('have.length', 3);
    });

    it('.not() - remove DOM elements from set of DOM elements', () => {
      // https://on.cypress.io/not
      cy.get('.traversal-disabled .btn').not('[disabled]').should('not.contain', 'Disabled');
    });

    it('.parent() - get parent DOM element from DOM elements', () => {
      // https://on.cypress.io/parent
      cy.get('.traversal-mark').parent().should('contain', 'Morbi leo risus');
    });

    it('.parents() - get parent DOM elements from DOM elements', () => {
      // https://on.cypress.io/parents
      cy.get('.traversal-cite').parents().should('match', 'blockquote');
    });

    it('.parentsUntil() - get parent DOM elements from DOM elements until el', () => {
      // https://on.cypress.io/parentsuntil
      cy.get('.clothes-nav').find('.active').parentsUntil('.clothes-nav')
        .should('have.length', 2);
    });

    it('.prev() - get previous sibling DOM element', () => {
      // https://on.cypress.io/prev
      cy.get('.birds').find('.active').prev().should('contain', 'Lorikeets');
    });

    it('.prevAll() - get all previous sibling DOM elements', () => {
      // https://on.cypress.io/prevAll
      cy.get('.fruits-list').find('.third').prevAll().should('have.length', 2);
    });

    it('.prevUntil() - get all previous sibling DOM elements until el', () => {
      // https://on.cypress.io/prevUntil
      cy.get('.foods-list').find('#nuts').prevUntil('#veggies');
    });

    it('.siblings() - get all sibling DOM elements', () => {
      // https://on.cypress.io/siblings
      cy.get('.traversal-pills .active').siblings().should('have.length', 2);
    });
  });

  context('Actions', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/actions');
    });

    // Let's perform some actions on DOM elements
    // https://on.cypress.io/interacting-with-elements

    it('.type() - type into a DOM element', () => {
      // https://on.cypress.io/type
      cy.get('.action-email')
        .type('fake@email.com').should('have.value', 'fake@email.com')

        // .type() with special character sequences
        .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
        .type('{del}{selectall}{backspace}')

        // .type() with key modifiers
        .type('{alt}{option}') // these are equivalent
        .type('{ctrl}{control}') // these are equivalent
        .type('{meta}{command}{cmd}') // these are equivalent
        .type('{shift}')

        // Delay each keypress by 0.1 sec
        .type('slow.typing@email.com', { delay: 100 })
        .should('have.value', 'slow.typing@email.com');

      cy.get('.action-disabled')
        // Ignore error checking prior to type
        // like whether the input is visible or disabled
        .type('disabled error checking', { force: true })
        .should('have.value', 'disabled error checking');
    });

    it('.focus() - focus on a DOM element', () => {
      // https://on.cypress.io/focus
      cy.get('.action-focus').focus()
        .should('have.class', 'focus')
        .prev().should('have.attr', 'style', 'color: orange;');
    });

    it('.blur() - blur off a DOM element', () => {
      // https://on.cypress.io/blur
      cy.get('.action-blur').type('I\'m about to blur').blur()
        .should('have.class', 'error')
        .prev().should('have.attr', 'style', 'color: red;');
    });

    it('.clear() - clears an input or textarea element', () => {
      // https://on.cypress.io/clear
      cy.get('.action-clear').type('We are going to clear this text')
        .should('have.value', 'We are going to clear this text')
        .clear()
        .should('have.value', '');
    });

    it('.submit() - submit a form', () => {
      // https://on.cypress.io/submit
      cy.get('.action-form')
        .find('[type="text"]').type('HALFOFF');
      cy.get('.action-form').submit()
        .next().should('contain', 'Your form has been submitted!');
    });

    it('.click() - click on a DOM element', () => {
      // https://on.cypress.io/click
      cy.get('.action-btn').click();

      // You can click on 9 specific positions of an element:
      //  -----------------------------------
      // | topLeft        top       topRight |
      // |                                   |
      // |                                   |
      // |                                   |
      // | left          center        right |
      // |                                   |
      // |                                   |
      // |                                   |
      // | bottomLeft   bottom   bottomRight |
      //  -----------------------------------

      // clicking in the center of the element is the default
      cy.get('#action-canvas').click();

      cy.get('#action-canvas').click('topLeft');
      cy.get('#action-canvas').click('top');
      cy.get('#action-canvas').click('topRight');
      cy.get('#action-canvas').click('left');
      cy.get('#action-canvas').click('right');
      cy.get('#action-canvas').click('bottomLeft');
      cy.get('#action-canvas').click('bottom');
      cy.get('#action-canvas').click('bottomRight');

      // .click() accepts an x and y coordinate
      // that controls where the click occurs :)

      cy.get('#action-canvas')
        .click(80, 75) // click 80px on x coord and 75px on y coord
        .click(170, 75)
        .click(80, 165)
        .click(100, 185)
        .click(125, 190)
        .click(150, 185)
        .click(170, 165);

      // click multiple elements by passing multiple: true
      cy.get('.action-labels>.label').click({ multiple: true });

      // Ignore error checking prior to clicking
      // like whether the element is visible, clickable or disabled
      // this button below is covered by another element.
      cy.get('.action-opacity>.btn').click({ force: true });
    });

    it('.dblclick() - double click on a DOM element', () => {
      // Our app has a listener on 'dblclick' event in our 'scripts.js'
      // that hides the div and shows an input on double click

      // https://on.cypress.io/dblclick
      cy.get('.action-div').dblclick().should('not.be.visible');
      cy.get('.action-input-hidden').should('be.visible');
    });

    it('cy.check() - check a checkbox or radio element', () => {
      // By default, .check() will check all
      // matching checkbox or radio elements in succession, one after another

      // https://on.cypress.io/check
      cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
        .check().should('be.checked');

      cy.get('.action-radios [type="radio"]').not('[disabled]')
        .check().should('be.checked');

      // .check() accepts a value argument
      // that checks only checkboxes or radios
      // with matching values
      cy.get('.action-radios [type="radio"]').check('radio1').should('be.checked');

      // .check() accepts an array of values
      // that checks only checkboxes or radios
      // with matching values
      cy.get('.action-multiple-checkboxes [type="checkbox"]')
        .check(['checkbox1', 'checkbox2']).should('be.checked');

      // Ignore error checking prior to checking
      // like whether the element is visible, clickable or disabled
      // this checkbox below is disabled.
      cy.get('.action-checkboxes [disabled]')
        .check({ force: true }).should('be.checked');

      cy.get('.action-radios [type="radio"]')
        .check('radio3', { force: true }).should('be.checked');
    });

    it('.uncheck() - uncheck a checkbox element', () => {
      // By default, .uncheck() will uncheck all matching
      // checkbox elements in succession, one after another

      // https://on.cypress.io/uncheck
      cy.get('.action-check [type="checkbox"]')
        .not('[disabled]')
        .uncheck().should('not.be.checked');

      // .uncheck() accepts a value argument
      // that unchecks only checkboxes
      // with matching values
      cy.get('.action-check [type="checkbox"]')
        .check('checkbox1')
        .uncheck('checkbox1').should('not.be.checked');

      // .uncheck() accepts an array of values
      // that unchecks only checkboxes or radios
      // with matching values
      cy.get('.action-check [type="checkbox"]')
        .check(['checkbox1', 'checkbox3'])
        .uncheck(['checkbox1', 'checkbox3']).should('not.be.checked');

      // Ignore error checking prior to unchecking
      // like whether the element is visible, clickable or disabled
      // this checkbox below is disabled.
      cy.get('.action-check [disabled]')
        .uncheck({ force: true }).should('not.be.checked');
    });

    it('.select() - select an option in a <select> element', () => {
      // https://on.cypress.io/select

      // Select option with matching text content
      cy.get('.action-select').select('apples');

      // Select option with matching value
      cy.get('.action-select').select('fr-bananas');

      // Select options with matching text content
      cy.get('.action-select-multiple')
        .select(['apples', 'oranges', 'bananas']);

      // Select options with matching values
      cy.get('.action-select-multiple')
        .select(['fr-apples', 'fr-oranges', 'fr-bananas']);
    });

    it('.scrollIntoView() - scroll an element into view', () => {
      // https://on.cypress.io/scrollintoview

      // normally all of these buttons are hidden, because they're not within
      // the viewable area of their parent (we need to scroll to see them)
      cy.get('#scroll-horizontal button')
        .should('not.be.visible');

      // scroll the button into view, as if the user had scrolled
      cy.get('#scroll-horizontal button').scrollIntoView()
        .should('be.visible');

      cy.get('#scroll-vertical button')
        .should('not.be.visible');

      // Cypress handles the scroll direction needed
      cy.get('#scroll-vertical button').scrollIntoView()
        .should('be.visible');

      cy.get('#scroll-both button')
        .should('not.be.visible');

      // Cypress knows to scroll to the right and down
      cy.get('#scroll-both button').scrollIntoView()
        .should('be.visible');
    });

    it('cy.scrollTo() - scroll the window or element to a position', () => {

      // https://on.cypress.io/scrollTo

      // You can scroll to 9 specific positions of an element:
      //  -----------------------------------
      // | topLeft        top       topRight |
      // |                                   |
      // |                                   |
      // |                                   |
      // | left          center        right |
      // |                                   |
      // |                                   |
      // |                                   |
      // | bottomLeft   bottom   bottomRight |
      //  -----------------------------------

      // if you chain .scrollTo() off of cy, we will
      // scroll the entire window
      cy.scrollTo('bottom');

      cy.get('#scrollable-horizontal').scrollTo('right');

      // or you can scroll to a specific coordinate:
      // (x axis, y axis) in pixels
      cy.get('#scrollable-vertical').scrollTo(250, 250);

      // or you can scroll to a specific percentage
      // of the (width, height) of the element
      cy.get('#scrollable-both').scrollTo('75%', '25%');

      // control the easing of the scroll (default is 'swing')
      cy.get('#scrollable-vertical').scrollTo('center', { easing: 'linear' });

      // control the duration of the scroll (in ms)
      cy.get('#scrollable-both').scrollTo('center', { duration: 2000 });
    });

    it('.trigger() - trigger an event on a DOM element', () => {
      // To interact with a range input (slider), we need to set its value and
      // then trigger the appropriate event to signal it has changed

      // Here, we invoke jQuery's val() method to set the value
      // and trigger the 'change' event

      // Note that some implementations may rely on the 'input' event,
      // which is fired as a user moves the slider, but is not supported
      // by some browsers

      // https://on.cypress.io/trigger
      cy.get('.trigger-input-range')
        .invoke('val', 25)
        .trigger('change')
        .get('input[type=range]').siblings('p')
        .should('have.text', '25');

      // See our example recipes for more examples of using trigger
      // https://on.cypress.io/examples
    });
  });

  context('Window', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/window');
    });

    it('cy.window() - get the global window object', () => {
      // https://on.cypress.io/window
      cy.window().should('have.property', 'top');
    });

    it('cy.document() - get the document object', () => {
      // https://on.cypress.io/document
      cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
    });

    it('cy.title() - get the title', () => {
      // https://on.cypress.io/title
      cy.title().should('include', 'Kitchen Sink');
    });
  });

  context('Viewport', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/viewport');
    });

    it('cy.viewport() - set the viewport size and dimension', () => {

      cy.get('#navbar').should('be.visible');

      // https://on.cypress.io/viewport
      cy.viewport(320, 480);

      // the navbar should have collapse since our screen is smaller
      cy.get('#navbar').should('not.be.visible');
      cy.get('.navbar-toggle').should('be.visible').click();
      cy.get('.nav').find('a').should('be.visible');

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999);

      // cy.viewport() accepts a set of preset sizes
      // to easily set the screen to a device's width and height

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)

      cy.viewport('macbook-15');
      cy.wait(200);
      cy.viewport('macbook-13');
      cy.wait(200);
      cy.viewport('macbook-11');
      cy.wait(200);
      cy.viewport('ipad-2');
      cy.wait(200);
      cy.viewport('ipad-mini');
      cy.wait(200);
      cy.viewport('iphone-6+');
      cy.wait(200);
      cy.viewport('iphone-6');
      cy.wait(200);
      cy.viewport('iphone-5');
      cy.wait(200);
      cy.viewport('iphone-4');
      cy.wait(200);
      cy.viewport('iphone-3');
      cy.wait(200);

      // cy.viewport() accepts an orientation for all presets
      // the default orientation is 'portrait'
      cy.viewport('ipad-2', 'portrait');
      cy.wait(200);
      cy.viewport('iphone-4', 'landscape');
      cy.wait(200);

      // The viewport will be reset back to the default dimensions
      // in between tests (the  default is set in cypress.json)
    });
  });

  context('Location', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/location');
    });

    // We look at the url to make assertions
    // about the page's state

    it('cy.hash() - get the current URL hash', () => {
      // https://on.cypress.io/hash
      cy.hash().should('be.empty');
    });

    it('cy.location() - get window.location', () => {
      // https://on.cypress.io/location
      cy.location().should((location) => {
        expect(location.hash).to.be.empty;
        expect(location.href).to.eq('https://example.cypress.io/commands/location');
        expect(location.host).to.eq('example.cypress.io');
        expect(location.hostname).to.eq('example.cypress.io');
        expect(location.origin).to.eq('https://example.cypress.io');
        expect(location.pathname).to.eq('/commands/location');
        expect(location.port).to.eq('');
        expect(location.protocol).to.eq('https:');
        expect(location.search).to.be.empty;
      });
    });

    it('cy.url() - get the current URL', () => {
      // https://on.cypress.io/url
      cy.url().should('eq', 'https://example.cypress.io/commands/location');
    });
  });

  context('Navigation', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io');
      cy.get('.navbar-nav').contains('Commands').click();
      cy.get('.dropdown-menu').contains('Navigation').click();
    });

    it('cy.go() - go back or forward in the browser\'s history', () => {
      cy.location('pathname').should('include', 'navigation');

      // https://on.cypress.io/go
      cy.go('back');
      cy.location('pathname').should('not.include', 'navigation');

      cy.go('forward');
      cy.location('pathname').should('include', 'navigation');

      // equivalent to clicking back
      cy.go(-1);
      cy.location('pathname').should('not.include', 'navigation');

      // equivalent to clicking forward
      cy.go(1);
      cy.location('pathname').should('include', 'navigation');
    });

    it('cy.reload() - reload the page', () => {
      // https://on.cypress.io/reload
      cy.reload();

      // reload the page without using the cache
      cy.reload(true);
    });

    it('cy.visit() - visit a remote url', () => {
      // Visit any sub-domain of your current domain
      // https://on.cypress.io/visit

      // Pass options to the visit
      cy.visit('https://example.cypress.io/commands/navigation', {
        timeout: 50000, // increase total time for the visit to resolve
        onBeforeLoad (contentWindow: Window): void {
          // contentWindow is the remote page's window object
        },
        onLoad (contentWindow: Window): void {
          // contentWindow is the remote page's window object
        },
      });
      });
  });

  context('Assertions', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/assertions');
    });

    describe('Implicit Assertions', () => {

      it('.should() - make an assertion about the current subject', () => {
        // https://on.cypress.io/should
        cy.get('.assertion-table')
          .find('tbody tr:last').should('have.class', 'success');
      });

      it('.and() - chain multiple assertions together', () => {
        // https://on.cypress.io/and
        cy.get('.assertions-link')
          .should('have.class', 'active')
          .and('have.attr', 'href')
          .and('include', 'cypress.io');
      });
    });

    describe('Explicit Assertions', () => {
      // https://on.cypress.io/assertions
      it('expect - assert shape of an object', () => {
        const person = {
          name: 'Joe',
          age: 20,
        };
        expect(person).to.have.all.keys('name', 'age');
      });

      it('expect - make an assertion about a specified subject', () => {
        // We can use Chai's BDD style assertions
        expect(true).to.be.true;

        // Pass a function to should that can have any number
        // of explicit assertions within it.
        cy.get('.assertions-p').find('p')
        .should(($p) => {
          // return an array of texts from all of the p's
          let texts = $p.map((i, el) => {
            // https://on.cypress.io/$
            return Cypress.$(el).text();
          });

          // jquery map returns jquery object
          // and .get() convert this to simple array
          texts = <any> texts.get();

          // array should have length of 3
          expect(texts).to.have.length(3);

          // set this specific subject
          expect(texts).to.deep.eq([
            'Some text from first p',
            'More text from second p',
            'And even more text from third p',
          ]);
        });
      });
    });
  });

  context('Misc', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/misc');
    });

    it('.end() - end the command chain', () => {
      // cy.end is useful when you want to end a chain of commands
      // and force Cypress to re-query from the root element

      // https://on.cypress.io/end
      cy.get('.misc-table').within(() => {
        // ends the current chain and yields null
        cy.contains('Cheryl').click().end();

        // queries the entire table again
        cy.contains('Charles').click();
      });
    });

    it('cy.exec() - execute a system command', () => {
      // cy.exec allows you to execute a system command.
      // so you can take actions necessary for your test,
      // but outside the scope of Cypress.

      // https://on.cypress.io/exec
      cy.exec('echo Jane Lane')
        .its('stdout').should('contain', 'Jane Lane');

      // we can use Cypress.platform string to
      // select appropriate command
      // https://on.cypress/io/platform
      cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`);

      if (Cypress.platform === 'win32') {
        cy.exec('print cypress.json')
          .its('stderr').should('be.empty');
      } else {
        cy.exec('cat cypress.json')
          .its('stderr').should('be.empty');

        cy.exec('pwd')
          .its('code').should('eq', 0);
      }
    });

    it('cy.focused() - get the DOM element that has focus', () => {
      // https://on.cypress.io/focused
      cy.get('.misc-form').find('#name').click();
      cy.focused().should('have.id', 'name');

      cy.get('.misc-form').find('#description').click();
      cy.focused().should('have.id', 'description');
    });

    it('cy.screenshot() - take a screenshot', () => {
      // https://on.cypress.io/screenshot
      cy.screenshot('my-image');
    });

    it('cy.wrap() - wrap an object', () => {
      // https://on.cypress.io/wrap
      cy.wrap({ foo: 'bar' })
        .should('have.property', 'foo')
        .and('include', 'bar');
    });
  });

  context('Connectors', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/connectors');
    });

    it('.each() - iterate over an array of elements', () => {
      // https://on.cypress.io/each
      cy.get('.connectors-each-ul>li')
        .each(($el, index, $list) => {
          console.log($el, index, $list);
        });
    });

    it('.its() - get properties on the current subject', () => {
      // https://on.cypress.io/its
      cy.get('.connectors-its-ul>li')
        // calls the 'length' property yielding that value
        .its('length')
        .should('be.gt', 2);
    });

    it('.invoke() - invoke a function on the current subject', () => {
      // our div is hidden in our script.js
      // $('.connectors-div').hide()

      // https://on.cypress.io/invoke
      cy.get('.connectors-div').should('be.hidden')

        // call the jquery method 'show' on the 'div.container'
        .invoke('show')
        .should('be.visible');
    });

    it('.spread() - spread an array as individual args to callback function', () => {
      // https://on.cypress.io/spread
      let arr = ['foo', 'bar', 'baz'];

      cy.wrap(arr).spread((foo, bar, baz) => {
        expect(foo).to.eq('foo');
        expect(bar).to.eq('bar');
        expect(baz).to.eq('baz');
      });
    });

    it('.then() - invoke a callback function with the current subject', () => {
      // https://on.cypress.io/then
      cy.get('.connectors-list>li').then(($lis) => {
        expect($lis).to.have.length(3);
        expect($lis.eq(0)).to.contain('Walk the dog');
        expect($lis.eq(1)).to.contain('Feed the cat');
        expect($lis.eq(2)).to.contain('Write JavaScript');
      });
    });
  });

  context('Aliasing', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/aliasing');
    });

    // We alias a DOM element for use later
    // We don't have to traverse to the element
    // later in our code, we just reference it with @

    it('.as() - alias a route or DOM element for later use', () => {
      // this is a good use case for an alias,
      // we don't want to write this long traversal again

      // https://on.cypress.io/as
      cy.get('.as-table').find('tbody>tr')
        .first().find('td').first().find('button').as('firstBtn');

      // maybe do some more testing here...

      // when we reference the alias, we place an
      // @ in front of it's name
      cy.get('@firstBtn').click();

      cy.get('@firstBtn')
        .should('have.class', 'btn-success')
        .and('contain', 'Changed');
    });
  });

  context('Waiting', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/waiting');
    });
    // BE CAREFUL of adding unnecessary wait times.

    // https://on.cypress.io/wait
    it('cy.wait() - wait for a specific amount of time', () => {
      cy.get('.wait-input1').type('Wait 1000ms after typing');
      cy.wait(1000);
      cy.get('.wait-input2').type('Wait 1000ms after typing');
      cy.wait(1000);
      cy.get('.wait-input3').type('Wait 1000ms after typing');
      cy.wait(1000);
    });

    // Waiting for a specific resource to resolve
    // is covered within the cy.route() test below
  });

  context('Network Requests', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/network-requests');
    });

    // Manage AJAX / XHR requests in your app
    
    it('cy.server() - control behavior of network requests and responses', () => {
      // https://on.cypress.io/server
      cy.server().should((server: any) => {
        // the default options on server
        // you can override any of these options
                
        expect(server.delay).to.eq(0);
        expect(server.method).to.eq('GET');
        expect(server.status).to.eq(200);
        expect(server.headers).to.be.null;
        expect(server.response).to.be.null;
        expect(server.onRequest).to.be.undefined;
        expect(server.onResponse).to.be.undefined;
        expect(server.onAbort).to.be.undefined;
      
        // These options control the server behavior
        // affecting all requests

        // pass false to disable existing route stubs
        expect(server.enable).to.be.true;
        // forces requests that don't match your routes to 404
        expect(server.force404).to.be.false;
        // whitelists requests from ever being logged or stubbed
        expect(server.whitelist).to.be.a('function');
      });

      cy.server({
        method: 'POST',
        delay: 1000,
        status: 422,
        response: {},
      });
      // any route commands will now inherit the above options
      // from the server. anything we pass specifically
      // to route will override the defaults though.
    });

    it('cy.request() - make an XHR request', () => {
      // https://on.cypress.io/request
      cy.request('https://jsonplaceholder.typicode.com/comments')
        .should(response => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.length(500);
          expect(response).to.have.property('headers');
          expect(response).to.have.property('duration');
        });
    });

    it('cy.route() - route responses to matching requests', () => {
      let message = 'whoa, this comment doesn\'t exist';
      cy.server();

      // **** GET comments route ****

      // https://on.cypress.io/route
      cy.route(/comments\/1/).as('getComment');

      // we have code that fetches a comment when
      // the button is clicked in scripts.js
      cy.get('.network-btn').click();

      // **** Wait ****

      // Wait for a specific resource to resolve
      // continuing to the next command

      // https://on.cypress.io/wait
      cy.wait('@getComment').its('status').should('eq', 200);

      // **** POST comment route ****

      // Specify the route to listen to method 'POST'
      cy.route('POST', '/comments').as('postComment');

      // we have code that posts a comment when
      // the button is clicked in scripts.js
      cy.get('.network-post').click();
      cy.wait('@postComment');

      // get the route
      cy.get('@postComment').then((xhr: any) => {
        expect(xhr.requestBody).to.include('email');
        expect(xhr.requestHeaders).to.have.property('Content-Type');
        expect(xhr.responseBody).to.have.property('name', 'Using POST in cy.route()');
      });

      // **** Stubbed PUT comment route ****
      cy.route({
        method: 'PUT',
        url: /comments\/\d+/,
        status: 404,
        response: { error: message },
        delay: 500,
      }).as('putComment');

      // we have code that puts a comment when
      // the button is clicked in scripts.js
      cy.get('.network-put').click();

      cy.wait('@putComment');

      // our 404 statusCode logic in scripts.js executed
      cy.get('.network-put-comment').should('contain', message);
    });
  });

  context('Files', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/files');
    });
    it('cy.fixture() - load a fixture', () => {
      // Instead of writing a response inline you can
      // connect a response with a fixture file
      // located in fixtures folder.

      cy.server();

      // https://on.cypress.io/fixture
      cy.fixture('example.json').as('comment');

      cy.route(/comments/, '@comment').as('getComment');

      // we have code that gets a comment when
      // the button is clicked in scripts.js
      cy.get('.fixture-btn').click();

      cy.wait('@getComment').its('responseBody')
        .should('have.property', 'name')
        .and('include', 'Using fixtures to represent data');

      // you can also just write the fixture in the route
      cy.route(/comments/, 'fixture:example.json').as('getComment');

      // we have code that gets a comment when
      // the button is clicked in scripts.js
      cy.get('.fixture-btn').click();

      cy.wait('@getComment').its('responseBody')
        .should('have.property', 'name')
        .and('include', 'Using fixtures to represent data');

      // or write fx to represent fixture
      // by default it assumes it's .json
      cy.route(/comments/, 'fx:example').as('getComment');

      // we have code that gets a comment when
      // the button is clicked in scripts.js
      cy.get('.fixture-btn').click();

      cy.wait('@getComment').its('responseBody')
        .should('have.property', 'name')
        .and('include', 'Using fixtures to represent data');
    });

    it('cy.readFile() - read a files contents', () => {
      // You can read a file and yield its contents
      // The filePath is relative to your project's root.

      // https://on.cypress.io/readfile
      cy.readFile('cypress.json').then(json => {
        expect(json).to.be.an('object');
      });

    });

    it('cy.writeFile() - write to a file', () => {
      // You can write to a file with the specified contents

      // Use a response from a request to automatically
      // generate a fixture file for use later
      cy.request('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          // https://on.cypress.io/writefile
          cy.writeFile('e2e/fixtures/users.json', response.body);
        });
      cy.fixture('users').should(users => {
        expect(users[0].name).to.exist;
      });

      // JavaScript arrays and objects are stringified and formatted into text.
      cy.writeFile('e2e/fixtures/profile.json', {
        id: 8739,
        name: 'Jane',
        email: 'jane@example.com',
      });

      cy.fixture('profile').should(profile => {
        expect(profile.name).to.eq('Jane');
      });
    });
  });

  context('Local Storage', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/local-storage');
    });
    // Although local storage is automatically cleared
    // to maintain a clean state in between tests
    // sometimes we need to clear the local storage manually

    it('cy.clearLocalStorage() - clear all data in local storage', () => {
      // https://on.cypress.io/clearlocalstorage
      cy.get('.ls-btn').click().should(() => {
        expect(localStorage.getItem('prop1')).to.eq('red');
        expect(localStorage.getItem('prop2')).to.eq('blue');
        expect(localStorage.getItem('prop3')).to.eq('magenta');
      });

      // clearLocalStorage() yields the localStorage object
      cy.clearLocalStorage().should((ls: any) => {
        expect(ls.getItem('prop1')).to.be.null;
        expect(ls.getItem('prop2')).to.be.null;
        expect(ls.getItem('prop3')).to.be.null;
      });

      // **** Clear key matching string in Local Storage ****
      cy.get('.ls-btn').click().should(() => {
        expect(localStorage.getItem('prop1')).to.eq('red');
        expect(localStorage.getItem('prop2')).to.eq('blue');
        expect(localStorage.getItem('prop3')).to.eq('magenta');
      });

      cy.clearLocalStorage('prop1').should((ls: any) => {
        expect(ls.getItem('prop1')).to.be.null;
        expect(ls.getItem('prop2')).to.eq('blue');
        expect(ls.getItem('prop3')).to.eq('magenta');
      });

      // **** Clear key's matching regex in Local Storage ****
      cy.get('.ls-btn').click().should(() => {
        expect(localStorage.getItem('prop1')).to.eq('red');
        expect(localStorage.getItem('prop2')).to.eq('blue');
        expect(localStorage.getItem('prop3')).to.eq('magenta');
      });

      cy.clearLocalStorage(/prop1|2/).should((ls: any) => {
        expect(ls.getItem('prop1')).to.be.null;
        expect(ls.getItem('prop2')).to.be.null;
        expect(ls.getItem('prop3')).to.eq('magenta');
      });
    });
  });

  context('Cookies', () => {
    beforeEach(() => {
      Cypress.Cookies.debug(true);

      cy.visit('https://example.cypress.io/commands/cookies');

      // clear cookies again after visiting to remove
      // any 3rd party cookies picked up such as cloudflare
      cy.clearCookies();
    });

    it('cy.getCookie() - get a browser cookie', () => {
      // https://on.cypress.io/getcookie
      cy.get('#getCookie .set-a-cookie').click();

      // cy.getCookie() yields a cookie object
      cy.getCookie('token').should('have.property', 'value', '123ABC');
    });

    it('cy.getCookies() - get browser cookies', () => {
      // https://on.cypress.io/getcookies
      cy.getCookies().should('be.empty');

      cy.get('#getCookies .set-a-cookie').click();

      // cy.getCookies() yields an array of cookies
      cy.getCookies().should('have.length', 1).should(cookies => {

        // each cookie has these properties
        expect(cookies[0]).to.have.property('name', 'token');
        expect(cookies[0]).to.have.property('value', '123ABC');
        expect(cookies[0]).to.have.property('httpOnly', false);
        expect(cookies[0]).to.have.property('secure', false);
        expect(cookies[0]).to.have.property('domain');
        expect(cookies[0]).to.have.property('path');
      });
    });

    it('cy.setCookie() - set a browser cookie', () => {
      // https://on.cypress.io/setcookie
      cy.getCookies().should('be.empty');

      cy.setCookie('foo', 'bar');

      // cy.getCookie() yields a cookie object
      cy.getCookie('foo').should('have.property', 'value', 'bar');
    });

    it('cy.clearCookie() - clear a browser cookie', () => {
      // https://on.cypress.io/clearcookie
      cy.getCookie('token').should('be.null');

      cy.get('#clearCookie .set-a-cookie').click();

      cy.getCookie('token').should('have.property', 'value', '123ABC');

      // cy.clearCookies() yields null
      cy.clearCookie('token').should('be.null');

      cy.getCookie('token').should('be.null');
    });

    it('cy.clearCookies() - clear browser cookies', () => {
      // https://on.cypress.io/clearcookies
      cy.getCookies().should('be.empty');

      cy.get('#clearCookies .set-a-cookie').click();

      cy.getCookies().should('have.length', 1);

      // cy.clearCookies() yields null
      cy.clearCookies();

      cy.getCookies().should('be.empty');
    });
  });

  context('Spies, Stubs, and Clock', () => {
    it('cy.spy() - wrap a method in a spy', () => {
      // https://on.cypress.io/spy
      cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');

      let obj = {
        foo (): void { 
          // Some logic  
        },
      };

      let spy = cy.spy(obj, 'foo').as('anyArgs');

      obj.foo();

      expect(spy).to.be.called;

    });

    it('cy.stub() - create a stub and/or replace a function with a stub', () => {
      // https://on.cypress.io/stub
      cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');

      let obj = {
        foo (a: string, b: string): void { 
          // Some logic  
        },
      };

      let stub = cy.stub(obj, 'foo').as('foo');

      obj.foo('foo', 'bar');

      expect(stub).to.be.called;

    });

    it('cy.clock() - control time in the browser', () => {
      // create the date in UTC so its always the same
      // no matter what local timezone the browser is running in
      let now = new Date(Date.UTC(2017, 2, 14)).getTime();

      // https://on.cypress.io/clock
      cy.clock(now);
      cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
      cy.get('#clock-div').click()
        .should('have.text', '1489449600');
    });

    it('cy.tick() - move time in the browser', () => {
      // create the date in UTC so its always the same
      // no matter what local timezone the browser is running in
      let now = new Date(Date.UTC(2017, 2, 14)).getTime();

      // https://on.cypress.io/tick
      cy.clock(now);
      cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
      cy.get('#tick-div').click()
        .should('have.text', '1489449600');
      cy.tick(10000); // 10 seconds passed
      cy.get('#tick-div').click()
        .should('have.text', '1489449610');
    });
  });

  context('Utilities', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/utilities');
    });

    it('Cypress._.method() - call a lodash method', () => {
      // use the _.chain, _.map, _.take, and _.value functions
      // https://on.cypress.io/_
      cy.request('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          let ids = Cypress._.chain(response.body).map('id').take(3).value();

          expect(ids).to.deep.eq([1, 2, 3]);
        });
    });

    it('Cypress.$(selector) - call a jQuery method', () => {
      // https://on.cypress.io/$
      let $li = Cypress.$('.utility-jquery li:first');

      cy.wrap($li)
        .should('not.have.class', 'active')
        .click()
        .should('have.class', 'active');
    });

    it('Cypress.moment() - format or parse dates using a moment method', () => {
      // use moment's format function
      // https://on.cypress.io/cypress-moment
      let time = Cypress.moment().utc('2014-04-25T19:38:53.196Z').format('h:mm A');

      cy.get('.utility-moment').contains('3:38 PM')
        .should('have.class', 'badge');
    });

    it('Cypress.Blob.method() - blob utilities and base64 string conversion', () => {
      cy.get('.utility-blob').then($div => {
        // https://on.cypress.io/blob
        // https://github.com/nolanlawson/blob-util#imgSrcToDataURL
        // get the dataUrl string for the javascript-logo
        return Cypress.Blob
        .imgSrcToDataURL('https://example.cypress.io/assets/img/javascript-logo.png', undefined, 'anonymous')
        .then(dataUrl => {
            // create an <img> element and set its src to the dataUrl
            let img = Cypress.$('<img />', { src: dataUrl });
            // need to explicitly return cy here since we are initially returning
            // the Cypress.Blob.imgSrcToDataURL promise to our test
            // append the image
            $div.append(img);

            cy.get('.utility-blob img').click()
            .should('have.attr', 'src', dataUrl);
          });
      });
    });

    it('new Cypress.Promise(function) - instantiate a bluebird promise', () => {
      // https://on.cypress.io/promise
      let waited = false;

      function waitOneSecond (): any {
        // return a promise that resolves after 1 second
        return new Cypress.Promise((resolve, reject) => {
          setTimeout(() => {
            // set waited to true
            waited = true;

            // resolve with 'foo' string
            resolve('foo');
                  }, 1000);
        });
      }

      cy.then(() => {
        // return a promise to cy.then() that
        // is awaited until it resolves
        return waitOneSecond().then((str: any) => {
          expect(str).to.eq('foo');
          expect(waited).to.be.true;
        });
      });
    });
  });

  context('Cypress.config()', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api/config');
    });

    it('Cypress.config() - get and set configuration options', () => {
      // https://on.cypress.io/config
      let myConfig = Cypress.config();

      expect(myConfig).to.have.property('animationDistanceThreshold', 5);
      expect(myConfig).to.have.property('baseUrl', null);
      expect(myConfig).to.have.property('defaultCommandTimeout', 4000);
      expect(myConfig).to.have.property('requestTimeout', 5000);
      expect(myConfig).to.have.property('responseTimeout', 30000);
      expect(myConfig).to.have.property('viewportHeight', 660);
      expect(myConfig).to.have.property('viewportWidth', 1000);
      expect(myConfig).to.have.property('pageLoadTimeout', 60000);
      expect(myConfig).to.have.property('waitForAnimations', true);

      expect(Cypress.config('pageLoadTimeout')).to.eq(60000);

      // this will change the config for the rest of your tests!
      Cypress.config('pageLoadTimeout', 20000);

      expect(Cypress.config('pageLoadTimeout')).to.eq(20000);

      Cypress.config('pageLoadTimeout', 60000);
    });
  });

  context('Cypress.env()', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api/env');
    });

    // We can set environment variables for highly dynamic values

    // https://on.cypress.io/environment-variables
    it('Cypress.env() - get environment variables', () => {
      // https://on.cypress.io/env
      // set multiple environment variables
      Cypress.env({
        host: 'veronica.dev.local',
        api_server: 'http://localhost:8888/v1/',
      });

      // get environment variable
      expect(Cypress.env('host')).to.eq('veronica.dev.local');

      // set environment variable
      Cypress.env('api_server', 'http://localhost:8888/v2/');
      expect(Cypress.env('api_server')).to.eq('http://localhost:8888/v2/');

      // get all environment variable
      expect(Cypress.env()).to.have.property('host', 'veronica.dev.local');
      expect(Cypress.env()).to.have.property('api_server', 'http://localhost:8888/v2/');
    });
  });

  context('Cypress.Cookies', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api/cookies');
    });

    // https://on.cypress.io/cookies
    it('Cypress.Cookies.debug() - enable or disable debugging', () => {
      Cypress.Cookies.debug(true);

      // Cypress will now log in the console when
      // cookies are set or cleared
      cy.setCookie('fakeCookie', '123ABC');
      cy.clearCookie('fakeCookie');
      cy.setCookie('fakeCookie', '123ABC');
      cy.clearCookie('fakeCookie');
      cy.setCookie('fakeCookie', '123ABC');
    });

    it('Cypress.Cookies.preserveOnce() - preserve cookies by key', () => {
      // normally cookies are reset after each test
      cy.getCookie('fakeCookie').should('not.be.ok');

      // preserving a cookie will not clear it when
      // the next test starts
      cy.setCookie('lastCookie', '789XYZ');
      Cypress.Cookies.preserveOnce('lastCookie');
    });

    it('Cypress.Cookies.defaults() - set defaults for all cookies', () => {
      // now any cookie with the name 'session_id' will
      // not be cleared before each new test runs
      Cypress.Cookies.defaults({
        whitelist: 'session_id',
      });
    });
  });

  context('Cypress.dom', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api/dom');
    });

    // https://on.cypress.io/dom
    it('Cypress.dom.isHidden() - determine if a DOM element is hidden', () => {
      let hiddenP = Cypress.$('.dom-p p.hidden').get(0);
      let visibleP = Cypress.$('.dom-p p.visible').get(0);

      // our first paragraph has css class 'hidden'
      expect(Cypress.dom.isHidden(hiddenP)).to.be.true;
      expect(Cypress.dom.isHidden(visibleP)).to.be.false;
    });
  });

  context('Cypress.Server', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api/server');
    });

    // Permanently override server options for
    // all instances of cy.server()

    // https://on.cypress.io/cypress-server
    it('Cypress.Server.defaults() - change default config of server', () => {
      Cypress.Server.defaults({
        delay: 0,
        force404: false,
        whitelist (xhr: any): void {
          // handle custom logic for whitelisting
        },
      });
    });
  });
});
