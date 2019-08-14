import React from 'react'
import ReactDOM from 'react-dom'
const ReactMarkdown = require('react-markdown')

import {readFileSync} from 'fs'
import './index.less'

const standarder = readFileSync(__dirname + `/content/standarder.md`, 'utf-8')
const header = readFileSync(__dirname + `/content/header.md`, 'utf-8')
const list = readFileSync(__dirname + `/content/list.md`, 'utf-8')
const footer = readFileSync(__dirname + `/content/footer.md`, 'utf-8')

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
            <ReactMarkdown className='header' source={ header } escapeHtml={false} />
            <ReactMarkdown className='list' source={ list } escapeHtml={false} />
            <ReactMarkdown className='main-content' source={ standarder } renderers={{heading: HeadingRenderer}} escapeHtml={false} />
            <ReactMarkdown className='footer' source={ footer }  escapeHtml={false} />
        </>)
}

ReactDOM.render(<Index />, document.getElementById('app'))