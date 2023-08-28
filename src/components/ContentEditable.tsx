import React, { memo, useEffect, type FC, type CSSProperties, type RefCallback, type RefObject } from 'react'

export type ContentEditableEvent = React.SyntheticEvent<any, Event> & { target: { value: string } }

type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R

type DivProps = Modify<JSX.IntrinsicElements['div'], { onChange:((event: ContentEditableEvent) => void) }>

export interface Props extends DivProps {
  html: string
  disabled?: boolean
  tagName?: string
  className?: string
  style?: CSSProperties
  innerRef?: RefObject<HTMLElement> | RefCallback<HTMLElement>
}

export function replaceCaret (el: HTMLElement): undefined {
  // Place the caret at the end of the element
  const target = document.createTextNode('')
  el.appendChild(target)
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el
  if (target?.nodeValue !== null && isTargetFocused) {
    const sel = window.getSelection()
    if (sel !== null) {
      const range = document.createRange()
      range.setStart(target, target.nodeValue.length)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
    if (el instanceof HTMLElement) {
      el.focus()
    }
  }
}

/**
 * A simple component for an html element with editable contents.
 */
const SimpleContentEditable: FC<Props> = ({ tagName, html, innerRef, tabIndex, children, ...props }) => {
  let lastHtml: string = html
  const el: any = typeof innerRef === 'function' ? { current: null } : React.createRef<HTMLElement>()

  const getEl = (): HTMLElement => (innerRef != null && typeof innerRef !== 'function' ? innerRef : el).current

  const emitChange = (originalEvt: React.SyntheticEvent<any>): undefined => {
    const el = getEl()
    if (el == null) return

    const html = el.innerHTML
    if (props.onChange != null && html !== lastHtml) {
      // Clone event with Object.assign to avoid
      // "Cannot assign to read only property 'target' of object"
      const evt = Object.assign({}, originalEvt, {
        target: {
          value: html
        }
      })
      props.onChange(evt)
    }
    lastHtml = html
  }

  useEffect(() => {
    const el = getEl()
    if (el == null) return

    // Perhaps React (whose VDOM gets outdated because we often prevent
    // rerendering) did not update the DOM. So we update it manually now.
    if (html !== el.innerHTML) {
      el.innerHTML = html
    }
    lastHtml = html
    replaceCaret(el)
  }, [])

  let ref
  if (typeof innerRef === 'function') {
    ref = (current: HTMLElement) => {
      innerRef(current)
      el.current = current
    }
  } else if (innerRef != null) {
    ref = innerRef
  } else {
    ref = el
  }
  return <div ref={ref}
  {...props}
   onInput={emitChange}
   onBlur={props.onBlur ?? emitChange}
   onKeyUp={props.onKeyUp ?? emitChange}
   onKeyDown={props.onKeyDown ?? emitChange}
   contentEditable={true}
   dangerouslySetInnerHTML={{ __html: html }}
  >
  </div>
}

const ContentEditable: FC<Props> = memo(SimpleContentEditable)

export default ContentEditable

/*
not working
  if (tagName == null) {
    return <div ref={ref}
    {...props}
     onInput={emitChange}
     onBlur={props.onBlur ?? emitChange}
     onKeyUp={props.onKeyUp ?? emitChange}
     onKeyDown={props.onKeyDown ?? emitChange}
     contentEditable={true}
     dangerouslySetInnerHTML={{ __html: html }}
    >
    </div>
  }
  const options = {
    ...props,
    ref,
    onInput: emitChange,
    onBlur: props.onBlur ?? emitChange,
    onKeyUp: props.onKeyUp ?? emitChange,
    onKeyDown: props.onKeyDown ?? emitChange,
    contentEditable: props.disabled === false,
  }
  if (children != null && html != null) {
    console.log('CHILDREN and HTML set - why?', children, html)
  } else if (children != null) {
    return React.createElement(tagName, options, children)
  }
  if (html != null) {
    options.dangerouslySetInnerHTML = { __html: html }
  }
  return React.createElement(tagName, options)
}

*/
