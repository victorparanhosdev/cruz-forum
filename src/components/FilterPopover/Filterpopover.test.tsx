import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Button, FilterPopover } from '@/components'
import { ChakraUIProvider } from '../../providers/chakra-ui'

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
const FilterPopoverProvider = (
  <ChakraUIProvider>
    <FilterPopover>
      <Button data-testid="trigger-button">Abrir Filtro</Button>
    </FilterPopover>
  </ChakraUIProvider>
)

describe('<FilterPopover />', () => {
  it('deve abrir o popover ao clicar no trigger e fechar ao clicar novamente', async () => {
    render(FilterPopoverProvider)
    const buttonElement = screen.getByTestId('trigger-button')

    fireEvent.click(buttonElement)

    await waitFor(() => {
      expect(buttonElement).toHaveAttribute('data-state', 'open')
    })
    fireEvent.click(document.body)

    await waitFor(() => {
      expect(buttonElement).not.toHaveAttribute('data-state', 'closed')
    })
  })

  it('deve corresponder ao snapshot', () => {
    const { asFragment } = render(FilterPopoverProvider)

    expect(asFragment()).toMatchSnapshot()
  })
})
