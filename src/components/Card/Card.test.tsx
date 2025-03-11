import { render, screen } from '@testing-library/react'
import { Card } from './'

describe('<Card/>', () => {
  const mockCardId = '123'

  it('deverá renderizar o card e receber o ID do Card', () => {
    render(<Card data-testid="custom-element" cardId={mockCardId} />)
    const element = screen.getByTestId('custom-element')
    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('href', `/topicos/123`)
    expect(element).toBeInTheDocument()
  })

  it('receberá uma nova className', () => {
    render(
      <Card
        className="bg-black"
        data-testid="custom-element"
        cardId={mockCardId}
      />,
    )
    const element = screen.getByTestId('custom-element')

    expect(element).toHaveClass('bg-black')
  })

  it('deve corresponder ao snapshot', () => {
    const { asFragment } = render(<Card cardId={mockCardId} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
