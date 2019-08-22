import React from 'react'
import ReactDOM from 'react-dom'
const ReactMarkdown = require('react-markdown')
const htmlParser = require('react-markdown/plugins/html-parser')

import {readFileSync} from 'fs'
import './index.less'

const standarder = readFileSync(__dirname + `/content/standarder.md`, 'utf-8')
const header = readFileSync(__dirname + `/content/header.md`, 'utf-8')
const list = readFileSync(__dirname + `/content/list.md`, 'utf-8')
const footer = readFileSync(__dirname + `/content/footer.md`, 'utf-8')

const parseHtml = htmlParser({isValidNode: node => node.type !== 'script'})

function flatten(text, child) {
    return typeof child === 'string'
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text)
  }
  
  function HeadingRenderer(props) {
    var children = React.Children.toArray(props.children)
    var text = children.reduce(flatten, '')
    var slug = text.toLowerCase().replace(/\W/g, '-')
    return React.createElement('h' + props.level, {id: slug}, props.children)
  }

const Index = () => {
    return (
        <>

          <div id='mini-header'>
            <img alt="NAV logo" src="./nav-logo-hvit.png" />
            <a href='#normal-header' className='menu'>
              <h3>Digitale standarder</h3>
            </a>
          </div> 
          <div className='red-header' id='normal-header'>
            <ReactMarkdown className='header container' source={ header } escapeHtml={false} />
            <ReactMarkdown className='list container' source={ list } escapeHtml={false} />
          </div>
            <ReactMarkdown className='main-content container' source={ standarder } renderers={{heading: HeadingRenderer}} escapeHtml={false} astPlugins={[parseHtml]} />
            <ReactMarkdown className='footer container' source={ footer }  escapeHtml={false} />
        </>)
}

ReactDOM.render(<Index />, document.getElementById('app'))

const onScrollEventHandler = (event) => {
  if (document.body.scrollTop > 650) {
    document.getElementById('mini-header').classList.add('visible')
  } else {
    document.getElementById('mini-header').classList.remove('visible')
  }
} 

if (window.addEventListener) {
  window.addEventListener('scroll', onScrollEventHandler, true)
} else if (window.attachEvent) {
  window.attachEvent('onscroll', onScrollEventHandler)
}

