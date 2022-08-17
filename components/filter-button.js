import { Button } from 'theme-ui'

const FilterButton = ({ children, sx, color, onClick, filter, filterName }) => {
  return (
    <Button
      variant="outline"
      sx={{
        borderRadius: 10,
        boxShadow: 'none',
        borderColor: color,
        color: filter == filterName ? 'white' : color,
        bg: filter == filterName ? color : 'none',
        boxShadow: 'none',
        borderWidth: '1px',
        transition: 'none',
        ':hover': {
          transform: 'none',
          bg: color,
          color: 'white',
          borderColor: color
        },
        ':focus': {
          transform: 'scale(1)'
        },
        ...sx
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default FilterButton
