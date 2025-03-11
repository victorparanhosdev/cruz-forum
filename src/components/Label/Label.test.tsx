import React from 'react'
import { render, screen } from '@testing-library/react'
import { Label } from '@/components/Label' // ajuste o caminho conforme necessário

describe('Componente Label', () => {
  it('deve renderizar o label com as props corretas e corresponder ao snapshot final', () => {
    const { asFragment } = render(
      <Label htmlFor="input-id" className="custom-class">
        Meu Label
      </Label>,
    )

    const labelElement = screen.getByText('Meu Label')
    expect(labelElement).toBeInTheDocument()

    expect(labelElement).toHaveAttribute('for', 'input-id')

    expect(labelElement).toHaveClass('mb-2', 'text-xs', 'block', 'custom-class')

    expect(asFragment()).toMatchSnapshot()
  })
})
