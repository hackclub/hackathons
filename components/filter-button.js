import { Button } from 'theme-ui'

const FilterButton = ({ children, sx, color, onClick, filter }) => {
  return (
    <Button
      variant="outline"
      sx={{
        display: 'inline-block',
        borderRadius: 6,
        boxShadow: 'none',
        borderColor: color,
        ...sx
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default FilterButton
