import React, { useEffect, useState } from 'react'

// Types
import {
  AnimatedProps,
  TransientAnimatedProps,
  AnimatedComponent,
  TransientAnimatedComponent,
} from '../../@types/animated'
import {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from 'react-polymorphic-types'

/*








*/

const AnimatedInternal: PolymorphicForwardRefExoticComponent<AnimatedProps, 'div'> = React.forwardRef(
  <T extends React.ElementType = 'div'>(
    { as, children, ...rest }: PolymorphicPropsWithoutRef<AnimatedProps, T>,
    ref: React.ForwardedRef<Element>,
  ) => {
    const Element: React.ElementType = as || 'div'

    const [shouldRender, setRender] = useState<boolean>(rest.show)

    const [mountId, setMountId] = useState<string>('')
    const [unmountId, setUnmountId] = useState<string>('')
    const [styleSheet, setStyleSheet] = useState<any>(null)

    const cleanedProps: Omit<
      PolymorphicPropsWithoutRef<Partial<AnimatedProps>, T>,
      'as' | 'children'
    > = Object.assign({}, rest)

    delete cleanedProps['show']
    delete cleanedProps['time']
    delete cleanedProps['unmountTime']
    delete cleanedProps['delay']
    delete cleanedProps['unmountDelay']
    delete cleanedProps['mountAnim']
    delete cleanedProps['unmountAnim']
    delete cleanedProps['mountAnimId']
    delete cleanedProps['unmountAnimId']
    delete cleanedProps['onAnimationEnd']
    delete cleanedProps['onMountEnd']
    delete cleanedProps['onUnmountEnd']
    delete cleanedProps['mountTimingFunction']
    delete cleanedProps['unmountTimingFunction']

    useEffect(() => {
      if (typeof document !== 'undefined') {
        let newStyleSheet: any = document.styleSheets[0]
        if (!newStyleSheet) {
          newStyleSheet = document.createElement('style')
          document.head.appendChild(newStyleSheet)
        }
        setStyleSheet(document.styleSheets[0])
      }
    }, [])

    useEffect(() => {
      if (!styleSheet) return
      if (!!rest.mountAnimId && typeof rest.mountAnimId === 'string') {
        setMountId(rest.mountAnimId)
      } else {
        let newMountId = `mount-${makeId(8)}`
        const keyframes = `@-webkit-keyframes ${newMountId} {
          ${rest.mountAnim}
      }
      `
        styleSheet.insertRule(keyframes, styleSheet.cssRules ? styleSheet.cssRules.length : 0)
        setMountId(newMountId)
      }

      if (!!rest.unmountAnimId && typeof rest.unmountAnimId === 'string') {
        setUnmountId(rest.unmountAnimId)
      } else {
        let newUnmountId = `mount-${makeId(8)}`
        const keyframes = `@-webkit-keyframes ${newUnmountId} {
        ${rest.unmountAnim ? rest.unmountAnim : rest.mountAnim}
      }
      `
        styleSheet.insertRule(keyframes, styleSheet.cssRules ? styleSheet.cssRules.length : 0)
        setUnmountId(newUnmountId)
      }
    }, [styleSheet, rest.mountAnim, rest.unmountAnim, rest.mountAnimId, rest.unmountAnimId])

    useEffect(() => {
      if (rest.show) {
        if (rest.delay && typeof rest.delay === 'number') {
          setTimeout(() => {
            setRender(true)
          }, rest.delay * 1000)
        } else {
          setRender(true)
        }
      }
    }, [rest.show, rest.delay])

    const onAnimationEnd = () => {
      if (!rest.show) setRender(false)
      if (rest.onMountEnd && rest.show) {
        rest.onMountEnd()
      }
      if (rest.onUnmountEnd && !rest.show) {
        rest.onUnmountEnd()
      }
      if (rest.onAnimationEnd) {
        rest.onAnimationEnd()
      }
    }

    return (
      <>
        {shouldRender && (
          <Element
            ref={ref}
            {...cleanedProps}
            style={{
              animationName: `${rest.show ? mountId : unmountId}`,
              animationDuration: `${
                rest.unmountTime !== undefined && !rest.show ? rest.unmountTime : rest.time ? rest.time : 1
              }s`,
              animationDirection:
                rest.show || !!rest.unmountAnim || !!rest.unmountAnimId ? 'normal' : 'reverse',
              animationDelay: `${rest.unmountDelay !== undefined && !rest.show ? rest.unmountDelay : 0}s`,
              animationTimingFunction:
                rest.unmountTimingFunction !== undefined && !rest.show
                  ? rest.unmountTimingFunction
                  : rest.mountTimingFunction,
              ...rest.style,
            }}
            onAnimationEnd={onAnimationEnd}
          >
            {children}
          </Element>
        )}
      </>
    )
  },
)

const makeId = (length: number) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

const AnimatedInternalFactory = <T extends React.ElementType = 'div'>(
  props: PolymorphicPropsWithRef<AnimatedProps, T>,
): JSX.Element => <AnimatedInternal {...props} />

const TransientAnimatedInternalFactory = <T extends React.ElementType = 'div'>(
  props: PolymorphicPropsWithRef<TransientAnimatedProps, T>,
): JSX.Element => {
  const cleaned = {}

  for (const key in props) {
    const t = key.startsWith('$') ? key.substring(1) : key
    cleaned[t] = props[key]
  }

  return <AnimatedInternal {...(cleaned as PolymorphicPropsWithRef<AnimatedProps, T>)} />
}

const Animated: AnimatedComponent = {
  a: AnimatedInternalFactory,
  abbr: AnimatedInternalFactory,
  address: AnimatedInternalFactory,
  area: AnimatedInternalFactory,
  article: AnimatedInternalFactory,
  aside: AnimatedInternalFactory,
  audio: AnimatedInternalFactory,
  b: AnimatedInternalFactory,
  base: AnimatedInternalFactory,
  bdi: AnimatedInternalFactory,
  bdo: AnimatedInternalFactory,
  big: AnimatedInternalFactory,
  blockquote: AnimatedInternalFactory,
  body: AnimatedInternalFactory,
  br: AnimatedInternalFactory,
  button: AnimatedInternalFactory,
  canvas: AnimatedInternalFactory,
  caption: AnimatedInternalFactory,
  cite: AnimatedInternalFactory,
  code: AnimatedInternalFactory,
  col: AnimatedInternalFactory,
  colgroup: AnimatedInternalFactory,
  data: AnimatedInternalFactory,
  datalist: AnimatedInternalFactory,
  dd: AnimatedInternalFactory,
  del: AnimatedInternalFactory,
  details: AnimatedInternalFactory,
  dfn: AnimatedInternalFactory,
  dialog: AnimatedInternalFactory,
  div: AnimatedInternalFactory,
  dl: AnimatedInternalFactory,
  dt: AnimatedInternalFactory,
  em: AnimatedInternalFactory,
  embed: AnimatedInternalFactory,
  fieldset: AnimatedInternalFactory,
  figcaption: AnimatedInternalFactory,
  figure: AnimatedInternalFactory,
  footer: AnimatedInternalFactory,
  form: AnimatedInternalFactory,
  h1: AnimatedInternalFactory,
  h2: AnimatedInternalFactory,
  h3: AnimatedInternalFactory,
  h4: AnimatedInternalFactory,
  h5: AnimatedInternalFactory,
  h6: AnimatedInternalFactory,
  head: AnimatedInternalFactory,
  header: AnimatedInternalFactory,
  hgroup: AnimatedInternalFactory,
  hr: AnimatedInternalFactory,
  html: AnimatedInternalFactory,
  i: AnimatedInternalFactory,
  iframe: AnimatedInternalFactory,
  img: AnimatedInternalFactory,
  input: AnimatedInternalFactory,
  ins: AnimatedInternalFactory,
  kbd: AnimatedInternalFactory,
  keygen: AnimatedInternalFactory,
  label: AnimatedInternalFactory,
  legend: AnimatedInternalFactory,
  li: AnimatedInternalFactory,
  link: AnimatedInternalFactory,
  main: AnimatedInternalFactory,
  map: AnimatedInternalFactory,
  mark: AnimatedInternalFactory,
  menu: AnimatedInternalFactory,
  menuitem: AnimatedInternalFactory,
  meta: AnimatedInternalFactory,
  meter: AnimatedInternalFactory,
  nav: AnimatedInternalFactory,
  noindex: AnimatedInternalFactory,
  noscript: AnimatedInternalFactory,
  object: AnimatedInternalFactory,
  ol: AnimatedInternalFactory,
  optgroup: AnimatedInternalFactory,
  option: AnimatedInternalFactory,
  output: AnimatedInternalFactory,
  p: AnimatedInternalFactory,
  param: AnimatedInternalFactory,
  picture: AnimatedInternalFactory,
  pre: AnimatedInternalFactory,
  progress: AnimatedInternalFactory,
  q: AnimatedInternalFactory,
  rp: AnimatedInternalFactory,
  rt: AnimatedInternalFactory,
  ruby: AnimatedInternalFactory,
  s: AnimatedInternalFactory,
  samp: AnimatedInternalFactory,
  slot: AnimatedInternalFactory,
  script: AnimatedInternalFactory,
  section: AnimatedInternalFactory,
  select: AnimatedInternalFactory,
  small: AnimatedInternalFactory,
  source: AnimatedInternalFactory,
  span: AnimatedInternalFactory,
  strong: AnimatedInternalFactory,
  style: AnimatedInternalFactory,
  sub: AnimatedInternalFactory,
  summary: AnimatedInternalFactory,
  sup: AnimatedInternalFactory,
  table: AnimatedInternalFactory,
  template: AnimatedInternalFactory,
  tbody: AnimatedInternalFactory,
  td: AnimatedInternalFactory,
  textarea: AnimatedInternalFactory,
  tfoot: AnimatedInternalFactory,
  th: AnimatedInternalFactory,
  thead: AnimatedInternalFactory,
  time: AnimatedInternalFactory,
  title: AnimatedInternalFactory,
  tr: AnimatedInternalFactory,
  track: AnimatedInternalFactory,
  u: AnimatedInternalFactory,
  ul: AnimatedInternalFactory,
  var: AnimatedInternalFactory,
  video: AnimatedInternalFactory,
  wbr: AnimatedInternalFactory,
  webview: AnimatedInternalFactory,
  svg: AnimatedInternalFactory,
  circle: AnimatedInternalFactory,
  ellipse: AnimatedInternalFactory,
  image: AnimatedInternalFactory,
  mask: AnimatedInternalFactory,
  path: AnimatedInternalFactory,
  rect: AnimatedInternalFactory,
}

const $Animated: TransientAnimatedComponent = {
  a: TransientAnimatedInternalFactory,
  abbr: TransientAnimatedInternalFactory,
  address: TransientAnimatedInternalFactory,
  area: TransientAnimatedInternalFactory,
  article: TransientAnimatedInternalFactory,
  aside: TransientAnimatedInternalFactory,
  audio: TransientAnimatedInternalFactory,
  b: TransientAnimatedInternalFactory,
  base: TransientAnimatedInternalFactory,
  bdi: TransientAnimatedInternalFactory,
  bdo: TransientAnimatedInternalFactory,
  big: TransientAnimatedInternalFactory,
  blockquote: TransientAnimatedInternalFactory,
  body: TransientAnimatedInternalFactory,
  br: TransientAnimatedInternalFactory,
  button: TransientAnimatedInternalFactory,
  canvas: TransientAnimatedInternalFactory,
  caption: TransientAnimatedInternalFactory,
  cite: TransientAnimatedInternalFactory,
  code: TransientAnimatedInternalFactory,
  col: TransientAnimatedInternalFactory,
  colgroup: TransientAnimatedInternalFactory,
  data: TransientAnimatedInternalFactory,
  datalist: TransientAnimatedInternalFactory,
  dd: TransientAnimatedInternalFactory,
  del: TransientAnimatedInternalFactory,
  details: TransientAnimatedInternalFactory,
  dfn: TransientAnimatedInternalFactory,
  dialog: TransientAnimatedInternalFactory,
  div: TransientAnimatedInternalFactory,
  dl: TransientAnimatedInternalFactory,
  dt: TransientAnimatedInternalFactory,
  em: TransientAnimatedInternalFactory,
  embed: TransientAnimatedInternalFactory,
  fieldset: TransientAnimatedInternalFactory,
  figcaption: TransientAnimatedInternalFactory,
  figure: TransientAnimatedInternalFactory,
  footer: TransientAnimatedInternalFactory,
  form: TransientAnimatedInternalFactory,
  h1: TransientAnimatedInternalFactory,
  h2: TransientAnimatedInternalFactory,
  h3: TransientAnimatedInternalFactory,
  h4: TransientAnimatedInternalFactory,
  h5: TransientAnimatedInternalFactory,
  h6: TransientAnimatedInternalFactory,
  head: TransientAnimatedInternalFactory,
  header: TransientAnimatedInternalFactory,
  hgroup: TransientAnimatedInternalFactory,
  hr: TransientAnimatedInternalFactory,
  html: TransientAnimatedInternalFactory,
  i: TransientAnimatedInternalFactory,
  iframe: TransientAnimatedInternalFactory,
  img: TransientAnimatedInternalFactory,
  input: TransientAnimatedInternalFactory,
  ins: TransientAnimatedInternalFactory,
  kbd: TransientAnimatedInternalFactory,
  keygen: TransientAnimatedInternalFactory,
  label: TransientAnimatedInternalFactory,
  legend: TransientAnimatedInternalFactory,
  li: TransientAnimatedInternalFactory,
  link: TransientAnimatedInternalFactory,
  main: TransientAnimatedInternalFactory,
  map: TransientAnimatedInternalFactory,
  mark: TransientAnimatedInternalFactory,
  menu: TransientAnimatedInternalFactory,
  menuitem: TransientAnimatedInternalFactory,
  meta: TransientAnimatedInternalFactory,
  meter: TransientAnimatedInternalFactory,
  nav: TransientAnimatedInternalFactory,
  noindex: TransientAnimatedInternalFactory,
  noscript: TransientAnimatedInternalFactory,
  object: TransientAnimatedInternalFactory,
  ol: TransientAnimatedInternalFactory,
  optgroup: TransientAnimatedInternalFactory,
  option: TransientAnimatedInternalFactory,
  output: TransientAnimatedInternalFactory,
  p: TransientAnimatedInternalFactory,
  param: TransientAnimatedInternalFactory,
  picture: TransientAnimatedInternalFactory,
  pre: TransientAnimatedInternalFactory,
  progress: TransientAnimatedInternalFactory,
  q: TransientAnimatedInternalFactory,
  rp: TransientAnimatedInternalFactory,
  rt: TransientAnimatedInternalFactory,
  ruby: TransientAnimatedInternalFactory,
  s: TransientAnimatedInternalFactory,
  samp: TransientAnimatedInternalFactory,
  slot: TransientAnimatedInternalFactory,
  script: TransientAnimatedInternalFactory,
  section: TransientAnimatedInternalFactory,
  select: TransientAnimatedInternalFactory,
  small: TransientAnimatedInternalFactory,
  source: TransientAnimatedInternalFactory,
  span: TransientAnimatedInternalFactory,
  strong: TransientAnimatedInternalFactory,
  style: TransientAnimatedInternalFactory,
  sub: TransientAnimatedInternalFactory,
  summary: TransientAnimatedInternalFactory,
  sup: TransientAnimatedInternalFactory,
  table: TransientAnimatedInternalFactory,
  template: TransientAnimatedInternalFactory,
  tbody: TransientAnimatedInternalFactory,
  td: TransientAnimatedInternalFactory,
  textarea: TransientAnimatedInternalFactory,
  tfoot: TransientAnimatedInternalFactory,
  th: TransientAnimatedInternalFactory,
  thead: TransientAnimatedInternalFactory,
  time: TransientAnimatedInternalFactory,
  title: TransientAnimatedInternalFactory,
  tr: TransientAnimatedInternalFactory,
  track: TransientAnimatedInternalFactory,
  u: TransientAnimatedInternalFactory,
  ul: TransientAnimatedInternalFactory,
  var: TransientAnimatedInternalFactory,
  video: TransientAnimatedInternalFactory,
  wbr: TransientAnimatedInternalFactory,
  webview: TransientAnimatedInternalFactory,
  svg: TransientAnimatedInternalFactory,
  circle: TransientAnimatedInternalFactory,
  ellipse: TransientAnimatedInternalFactory,
  image: TransientAnimatedInternalFactory,
  mask: TransientAnimatedInternalFactory,
  path: TransientAnimatedInternalFactory,
  rect: TransientAnimatedInternalFactory,
}

export { $Animated }
export default Animated
