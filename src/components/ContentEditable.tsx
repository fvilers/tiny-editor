import React, { memo, useEffect, type FC, type CSSProperties, type RefCallback, type RefObject } from 'react'
import deepEqual from 'fast-deep-equal'

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

function normalizeHtml (str: string): string {
  return str?.replace(/&nbsp;|\u202F|\u00A0/g, ' ').replace(/<br \/>/g, '<br>')
}

function replaceCaret (el: HTMLElement): undefined {
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
  console.log('SimpleContentEditable', lastHtml, html)
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
  if (children != null) {
    console.log('CHILDREN set - why?', children)
  }
  return React.createElement(
    tagName,
    {
      ...props,
      ref,
      onInput: emitChange,
      onBlur: props.onBlur ?? emitChange,
      onKeyUp: props.onKeyUp ?? emitChange,
      onKeyDown: props.onKeyDown ?? emitChange,
      contentEditable: props.disabled === false,
      dangerouslySetInnerHTML: { __html: html }
    })
}

function relevantPropsEqual (props: Props, nextProps: Props): boolean {
  // We need not rerender if the change of props simply reflects the user's edits.
  // Rerendering in this case would make the cursor/caret jump

  // Rerender if there is no element yet... (somehow?)
  // if (!incoming.innerRef?.current) {
  //    return false;
  // }

  if (normalizeHtml(nextProps.html) !== normalizeHtml(props.html)) {
    return false
  }
  if (props.disabled !== nextProps.disabled) {
    return false
  }
  if (props.tagName !== nextProps.tagName) {
    return false
  }
  if (props.className !== nextProps.className) {
    return false
  }
  if (props.innerRef !== nextProps.innerRef) {
    return false
  }
  if (props.placeholder !== nextProps.placeholder) {
    return false
  }
  if (deepEqual(props.style, nextProps.style)) {
    return false
  }
  return true
}

const ContentEditable: FC<Props> = memo(SimpleContentEditable, relevantPropsEqual)

export default ContentEditable
