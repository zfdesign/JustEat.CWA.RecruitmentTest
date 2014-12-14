// Namespace:: ZFD
var zfd = {};

///
zfd.FormValidator = function (_target, validationEvents) {
    var that = this;
    var _elements = _target || document.forms;
    var _events = validationEvents || ['submit'];

    for (var i = 0; i < _elements.length; i++) {
        for (var j in _events) {

            var _element = _elements[i],
                _event = _events[j];

            _element.addEventListener(_event, function (e) {
                    e.preventDefault();
                    that.validate(_element, _event);
                }, false);
        }

        this.getTheForm(_element).setAttribute('novalidate', '');
    }
};

zfd.FormValidator.prototype.getTheForm = function(_element){
    if (!!_element.nodeName.toLowerCase().match('form')) {
        return _element;
    } // Cheating perf
    else if (document.forms.length === 1) {
        return document.forms[0];
    }
    else if (_element.parentNode) {
        if (!!_element.parentNode.nodeName.toLowerCase().match('form|body')) {
            return _element.parentNode;
        }
        else {
            this.getTheForm(_element.parentNode);
        }
    }
    else {
        console.log('No Form tag found!');
        return document.body;
    }
};

zfd.FormValidator.prototype.displayError = function (_element, message) {
    // TODO: Remove ALERTS!!!
    alert(_element + ': \n' + message);
};

zfd.FormValidator.prototype.validate = function (_element, _event) {
    // FORM
    if (_element.nodeName.toLowerCase() === 'form') {
        if (_element.checkValidity()){
            _element.submit();
        }
        else {
            this.displayError(_element.nodeName, 'Not valid!');
        }
    } else { // Individual form Elements
        if (!_element.willValidate) {
        this.displayError(_element, _element.validationMessage);
        return _element.willValidate;
        }
    }
};

var loginValidator = new zfd.FormValidator(document.querySelectorAll('#Login'));
