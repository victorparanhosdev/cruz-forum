import { render, screen } from '@testing-library/react'
import { Comentarios } from './'

describe('<Comentarios/>', () => {
  it('deverá renderizar o componente Comentarios', () => {
    render(<Comentarios data-testid="custom-element" />)
    const element = screen.getByTestId('custom-element')
    expect(element).toBeInTheDocument()
  })

  it('receberá uma nova className', () => {
    render(<Comentarios className="bg-black" data-testid="custom-element" />)
    const element = screen.getByTestId('custom-element')

    expect(element).toHaveClass('bg-black')
  })

  it('deve corresponder ao snapshot', () => {
    const { asFragment } = render(<Comentarios />)
    expect(asFragment()).toMatchSnapshot()
  })
})
