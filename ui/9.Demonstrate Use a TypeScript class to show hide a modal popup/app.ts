class SimpleModal {
  modal: HTMLDivElement;
  openBtn: HTMLButtonElement;
  closeBtn: HTMLButtonElement;

  constructor(modalId: string, openBtnId: string, closeBtnId: string) {
    this.modal = document.getElementById(modalId) as HTMLDivElement;
    this.openBtn = document.getElementById(openBtnId) as HTMLButtonElement;
    this.closeBtn = document.getElementById(closeBtnId) as HTMLButtonElement;

    this.openBtn.addEventListener('click', () => this.show());
    this.closeBtn.addEventListener('click', () => this.hide());
  }

  show() {
    this.modal.classList.add('show');
  }

  hide() {
    this.modal.classList.remove('show');
  }
}

new SimpleModal('myModal', 'openBtn', 'closeBtn');
