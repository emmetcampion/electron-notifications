const electron = require('electron')

const { remote } = electron

class NotificationView {
  constructor (title, options) {
    this.element = document.getElementById('notification')
    this.iconEl = document.getElementById('icon')
    this.titleEl = document.getElementById('title')
    this.messageEl = document.getElementById('message')
    this.closeEl = document.getElementById('close')
    this.title = title
    this.options = options
  }

  render () {
    this.titleEl.innerHTML = this.title
    this.iconEl.src = this.options.icon || 'electron.png'

    if (this.options.message) {
      this.messageEl.innerHTML = this.options.message
    } else {
      const parent = this.messageEl.parentElement
      parent.classList.add('onlyTitle')
      parent.removeChild(this.messageEl)
    }

    this.setupCloseButton()
    this.decorateClasses()
  }

  setupCloseButton () {
    this.closeEl.addEventListener('click', (event) => {
      const mainWindow = remote.getCurrentWindow()
      mainWindow.emit('closeButtonClicked')
    })
  }

  decorateClasses () {
    if (this.options.flat) {
      this.element.classList.add('flat')
      this.iconEl.classList.add('flat')
      this.titleEl.classList.add('flat')
      this.messageEl.classList.add('flat')
    }
  }
}

module.exports = NotificationView
