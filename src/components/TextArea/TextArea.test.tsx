import React from 'react'
import { render, screen } from '@testing-library/react'
import { TextArea } from '@/components'

describe('<TextArea/>', () => {
  it('deve renderizar o TextArea com estado "default" e verificar as classes do container', () => {
    render(<TextArea placeholder="Digite algo" state="default" />)
    const textAreaElement = screen.getByPlaceholderText('Digite algo')
    expect(textAreaElement).toBeInTheDocument()

    const container = textAreaElement
    expect(container).toHaveClass('focus:border-green-200')
    expect(container).toHaveClass('focus:ring-green-400')
  })

  it('deve renderizar a textArea com estado "negative" e verificar as classes do container', () => {
    render(<TextArea placeholder="Digite algo" state="negative" />)
    const textAreaElement = screen.getByPlaceholderText('Digite algo')
    expect(textAreaElement).toBeInTheDocument()

    const container = textAreaElement
    expect(container).toHaveClass('border-red-900')
    expect(container).toHaveClass('bg-error-200')
  })

  it('deve corresponder ao snapshot', () => {
    const { asFragment } = render(
      <TextArea state="default" placeholder="Digite algo" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
