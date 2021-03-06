const intro = require('intro.js');

const hintDirective = {

    bind() {

        const name = this.arg;
        const viewModel = this.vm;
        const tours = viewModel.intro.tours;

        if (!tours.hasOwnProperty(name)) {

            let options = viewModel.intro.defaults;
            let tour = tours[name] = intro.introJs();

            // Setup the tour hooks.
            this.setupHooks(tour);

            // Set the tour options.
            tour.setOptions(options);
        }
    },

    setupHooks(tour) {

        const viewModel = this.vm;

        tour.onhintclick(function() {
            viewModel.$dispatch('hint:click', arguments);
        });

        tour.onhintsadded(function() {
            viewModel.$dispatch('hint:added', arguments);
        });

        tour.onhintclose(function() {
            viewModel.$dispatch('hint:close', arguments);
        });
    },

    update(newValue, oldValue) {

        const name = this.arg;
        const element = this.el;
        const viewModel = this.vm;
        const tours = viewModel.intro.tours;
        const hint = Object.assign({}, newValue, {element: element});

        if (!tours[name]._options.hasOwnProperty('hints')) {
            tours[name]._options.hints = [];
        }

        tours[name]._options.hints.push(hint);
        tours[name].refresh();
    },

    unbind() {

        const name = this.arg;
        const viewModel = this.vm;
        const tours = viewModel.intro.tours;

        if (tours.hasOwnProperty(name)) {
            delete tours[name];
        }
    }
};

module.exports = hintDirective;
