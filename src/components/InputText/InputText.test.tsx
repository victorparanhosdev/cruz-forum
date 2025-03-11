import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input, InputMsgErro } from '@/components' // ajuste o caminho se necessário

describe('Componente Input', () => {
  it('deve renderizar o input com estado "default" e verificar as classes do container', () => {
    render(<Input placeholder="Digite algo" state="default" />)
    const inputElement = screen.getByPlaceholderText('Digite algo')
    expect(inputElement).toBeInTheDocument()

    const container = inputElement.parentElement
    expect(container).toHaveClass('focus-within:border-green-200')
    expect(container).toHaveClass('focus-within:ring-green-400')
  })

  it('deve renderizar o input com estado "negative" e verificar as classes do container', () => {
    render(<Input placeholder="Digite algo" state="negative" />)
    const inputElement = screen.getByPlaceholderText('Digite algo')
    expect(inputElement).toBeInTheDocument()

    const container = inputElement.parentElement
    expect(container).toHaveClass('border-red-900')
    expect(container).toHaveClass('bg-error-200')
  })

  it('deve renderizar o ícone quando a propriedade withIcon é fornecida', () => {
    render(
      <Input
        placeholder="Digite algo"
        state="default"
        withIcon={<span data-testid="icone">Ícone</span>}
      />,
    )

    const iconElement = screen.getByTestId('icone')
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveTextContent('Ícone')
  })
})

describe('Componente InputMsgErro', () => {
  it('deve renderizar a mensagem de erro corretamente', () => {
    render(<InputMsgErro text="Erro de validação" data-testid="msg-erro" />)
    const msgErroElement = screen.getByTestId('msg-erro')
    expect(msgErroElement).toBeInTheDocument()
    expect(msgErroElement).toHaveTextContent('Erro de validação')

    expect(msgErroElement.className).toMatch(/text-red-500/)
    expect(msgErroElement.className).toMatch(/text-xs/)
  })

  it('deve corresponder ao snapshot', () => {
    const { asFragment } = render(
      <Input state="default" placeholder="Digite algo" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
