import { Button } from '@/components'
import { Trash } from '@phosphor-icons/react/dist/ssr'
import { fireEvent, render, screen } from '@testing-library/react'

describe('<Button/>', () => {
  it('deverá renderizar o botão', () => {
    render(<Button>Clique aqui</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('deverá renderizar ícones esquerdo e direito quando fornecidos', () => {
    render(
      <Button iconLeft={Trash} iconRight={Trash}>
        Clique aqui
      </Button>,
    )

    const iconLeft = screen.getByTestId('icon-left')
    const iconRight = screen.getByTestId('icon-right')

    expect(iconLeft).toBeInTheDocument()
    expect(iconRight).toBeInTheDocument()
  })

  it('deverá renderizar um botão desabilitado', () => {
    render(<Button disabled>Clique aqui</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('deverá clicar no botão', () => {
    const clickButton = jest.fn()

    render(<Button onClick={clickButton}>Clique aqui</Button>)

    const button = screen.getByRole('button', { name: /clique aqui/i })
    fireEvent.click(button)
    expect(clickButton).toHaveBeenCalledTimes(1)
  })

  it('deverá ativar o botão ao acionar isActive', () => {
    render(<Button isActive>Clique aqui</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-state', 'true')
  })

  it('não deve renderizar ícone esquerdo ou direito quando não fornecido', () => {
    render(<Button>Clique aqui</Button>)
    expect(screen.queryByTestId('icon-left')).not.toBeInTheDocument()
    expect(screen.queryByTestId('icon-right')).not.toBeInTheDocument()
  })

  it('não deve chamar onClick se o botão estiver desabilitado', () => {
    const clickButton = jest.fn()

    render(
      <Button onClick={clickButton} disabled>
        Clique aqui
      </Button>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(clickButton).not.toHaveBeenCalled()
  })

  it('deverá renderizar o botão com o estado correto', () => {
    const { rerender } = render(
      <Button state="outline-negative">Clique aqui</Button>,
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border-red-900')

    rerender(<Button state="menu">Clique aqui</Button>)
    expect(button).toHaveClass('data-[state=true]:bg-green-900')

    rerender(<Button state="transparent">Clique aqui</Button>)
    expect(button).toHaveClass('hover:enabled:text-green-200')
  })

  it('deverá aplicar classes personalizadas passadas via className', () => {
    render(<Button className="bg-red-500">Clique aqui</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-red-500')
  })

  it('deve corresponder ao snapshot', () => {
    const { asFragment } = render(<Button>Clique aqui</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('deverá definir corretamente o atributo aria-pressed', () => {
    render(<Button isActive>Clique aqui</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('deverá sobrescrever estilos padrão com className personalizada', () => {
    render(<Button className="bg-blue-500">Clique aqui</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-blue-500')
    expect(button).not.toHaveClass('bg-green-950')
  })

  it('não deve quebrar quando iconRight for undefined', () => {
    render(<Button iconRight={undefined}>Clique aqui</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('deve renderizar aria-disabled apenas quando o botão estiver desabilitado', () => {
    const { rerender } = render(<Button disabled>Clique aqui</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-disabled', 'true')

    rerender(<Button disabled={false}>Clique aqui</Button>)
    expect(button).not.toHaveAttribute('aria-disabled')
  })

  it('deve garantir que "disabled" reflete o estado corretamente', () => {
    const { rerender } = render(<Button disabled>Clique aqui</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    rerender(<Button disabled={false}>Clique aqui</Button>)
    expect(button).toBeEnabled()
  })

  it('deve renderizar o ícone esquerdo com peso "bold" quando isActive for true', () => {
    render(
      <Button iconLeft={Trash} isActive>
        Clique aqui
      </Button>,
    )
    const iconLeft = screen.getByTestId('icon-left')
    expect(iconLeft).toHaveAttribute('data-weight', 'bold')
  })

  it('deve renderizar o ícone esquerdo com peso "regular" quando isActive for false', () => {
    render(<Button iconLeft={Trash}>Clique aqui</Button>)
    const iconLeft = screen.getByTestId('icon-left')
    expect(iconLeft).toHaveAttribute('data-weight', 'regular')
  })

  it('deve renderizar o ícone direito com o peso correto', () => {
    const { getByTestId, rerender } = render(
      <Button iconRight={Trash} isActive>
        Ola
      </Button>,
    )

    const iconRight = getByTestId('icon-right')
    expect(iconRight).toHaveAttribute('data-weight', 'bold')

    rerender(<Button iconRight={Trash}>Ola</Button>)
    expect(iconRight).toHaveAttribute('data-weight', 'regular')
  })
})
