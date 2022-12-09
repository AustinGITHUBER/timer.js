/*
! timer.js © 2022 by AustinGITHUBER is licensed under CC BY 4.0. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ 
*/
// uses strict mode
'use strict'
// gets seconds portion of time
let getSeconds = (date = new Date()) => date.getSeconds()
// gets minutes portion of time
let getMinutes = (date = new Date()) => date.getMinutes()
// gets hour portion of time
let getHours = (date = new Date()) => date.getHours()
// returns array of str but parsed into 3 float values
let parseTime = (str = '00:00:00') => str.split(':').map(part => parseFloat(part))
// to create elements
Node.prototype.createElements = function(...types) {
    // creates variable elems which is just types but mapped into elements with types type
    let elems = types.map(type => document.createElement(type))
    // creates document fragment
    let fragment = document.createDocumentFragment()
    // appends elements onto fragment
    fragment.append(...elems)
    // appends fragment to this node
    this.append(fragment)
    // returns elems
    return elems
}
// refreshes html into html&head&body
let refreshHTML = () => {
    // removes html element if there is one
    document.querySelector('html')?.remove()
    // creates document fragment
    let fragment = document.createDocumentFragment()
    // appends an html element onto the fragment
    let html = fragment.createElements('html')[0]
    // appends head and body in html
    html.createElements('head', 'body')
    // appends fragment onto the document
    document.append(fragment)
}
// creates audio and a source element inside
Element.prototype.createAudioAndSource = function(src = '.', loop = true, autoplay = true) {
    // creates audio element
    let audio = document.createElement('audio')
    // appends source to audio
    let source = audio.createElements('source')[0]
    // sets source source to src
    source.src = src
    // sets audio loop to loop
    audio.loop = loop
    // sets audio autoplay to autoplay
    audio.autoplay = autoplay
    // creates fragment
    let fragment = document.createDocumentFragment()
    // appends audio into fragment
    fragment.append(audio)
    // appends fragment to this element
    this.append(fragment)
    // returns audio
    return audio
}
// starts timer
var timerStart = (time24hr = '00:00:00', audioSrc = 'https://raw.githubusercontent.com/AustinGITHUBER/timer-sound-thing/main/download.mp3', _function = audio => audio) => {
    // checks if time24hr is invalid and returns if true
    if (time24hr.replace(/[^:]/g, '').length !== 2 || !parseTime(time24hr).every(part => !isNaN(part))) return
    // creates interval variable
    let interval = setInterval(() => {
        // creates timeInfo array with hours, minutes, seconds
        let timeInfo = [getHours(), getMinutes(), getSeconds()]
        // checks if every timeInfo elements are equal to time24hr parsed elements
        if (timeInfo.every((elem, i) => elem === parseTime(time24hr)[i])) {
            // clears interval
            clearInterval(interval)
            // calls _function with argument created audio with source audioSrc
            _function(document.body.createAudioAndSource(audioSrc))
        }
    // per millisecond
    }, 1)
    // returns interval
    return interval
}
// creates gui
var timer = () => {
    // refreshes html
    refreshHTML()
    // creates document fragment
    let fragment = document.createDocumentFragment()
    // appends div onto fragment
    let div = fragment.createElements('div')[0]
    // appends input and button into div
    let elems = div.createElements('input', 'button')
    // creates undefined variable named restartElems
    let restartElems
    // sets input display to block
    elems[0].style.display = 'block'
    // sets button text to Start
    elems[1].innerText = 'Start'
    // sets cursor when hovering button to pointer
    elems[1].style.cursor = 'pointer'
    // appends fragment to body
    document.body.append(fragment)
    // defines onclickFunction
    let onclickFunction = () => {
        // starts timer with time24hr input value, audioSrc default, _function gets audio and sets button onclick to...
        let interval = timerStart(elems[0].value, undefined, audio => elems[1].onclick = () => {
            // remove audio
            audio.remove()
            // sets button text to Start, enables input, resets button onclick
            restartElems()
        })
        // if interval is falsy (undefined), return
        if (!interval) return
        // make input disabled
        elems[0].disabled = true
        // sets button text to End
        elems[1].innerText = 'End'
        // sets button onclick to
        elems[1].onclick = () => {
            // clear interval interval
            clearInterval(interval)
            // sets button text to Start, enables input, resets button onclick like said above
            restartElems()
        }
    }
    // sets button text to Start, enables input, resets button onclick like said above
    restartElems = () => {
        // sets button text to Start
        elems[1].innerText = 'Start'
        // enables input
        elems[0].disabled = false
        // resets button onclick
        elems[1].onclick = onclickFunction
    }
    // sets button onclick to onclickFunction
    elems[1].onclick = onclickFunction
}
