import React from 'react'
import styles from './Section.module.css'
import { Button2 } from './Button/Button'
import { Icon } from './Icon'

interface SectionProps extends React.PropsWithChildren {
  title?: JSX.Element | string
  stuff?: JSX.Element | string
}

export function Section({ title, stuff, children }: SectionProps) {
  return (
    <section className={styles.section}>
      {(title || stuff) && (
        <div className={styles.header}>
          <h2>
            {title}
          </h2>
          <div>
            {stuff}
          </div>
        </div>
      )}
      {children}
    </section>
  )
}

export function SlideSection({ stuff, children, ...rest }: SectionProps) {
  const ref = React.useRef<HTMLDivElement>(null!)

  const scroll = (x: number) => {
    ref.current.scrollBy({ left: 1 * x, behavior: 'smooth' })
  }

  return (
    <Section
      {...rest}
      stuff={
        <>
          {stuff}
          <div className={styles.sliderArrows}>
            <Button2 size="small" variant="ghost" onClick={() => scroll(-1)}>
              <Icon.ArrowLeft />
            </Button2>
            <Button2 size="small" variant="ghost" onClick={() => scroll(1)}>
              <Icon.ArrowRight />
            </Button2>
          </div>
        </>
      }
    >
      <div className={styles.slideContent} ref={ref}>
        {children}
      </div>
    </Section>
  )
}