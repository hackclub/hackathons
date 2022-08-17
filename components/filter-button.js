import { Button } from 'theme-ui'

const FilterButton = ({ children, sx, color, onClick, filter, filterName }) => {
  return (
    <Button
      variant="outline"
      sx={{
        borderRadius: '0',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        boxShadow: 'none',
        borderColor: filter == filterName ? color : 'muted',
        color: color,
        boxShadow: 'none',
        borderWidth: '4px',
        transition: '.125s ease-in-out',
        ':hover': {
          transform: 'none',
          borderColor: filter == filterName ? color : 'slate',
          boxShadow: 'none'
        },
        ':focus': {
          transform: 'scale(1)',
          boxShadow: 'none'
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
