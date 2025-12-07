var SimpleModal = /** @class */ (function () {
    function SimpleModal(modalId, openBtnId, closeBtnId) {
        var _this = this;
        this.modal = document.getElementById(modalId);
        this.openBtn = document.getElementById(openBtnId);
        this.closeBtn = document.getElementById(closeBtnId);
        this.openBtn.addEventListener('click', function () { return _this.show(); });
        this.closeBtn.addEventListener('click', function () { return _this.hide(); });
    }
    SimpleModal.prototype.show = function () {
        this.modal.classList.add('show');
    };
    SimpleModal.prototype.hide = function () {
        this.modal.classList.remove('show');
    };
    return SimpleModal;
}());
new SimpleModal('myModal', 'openBtn', 'closeBtn');
