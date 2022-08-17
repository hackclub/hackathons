import { Button } from 'theme-ui'

const FilterButton = ({ children, sx, color, onClick, filter, filterName }) => {
  return (
    <Button
      variant="outline"
      sx={{
        borderRadius: 10,
        boxShadow: 'none',
        borderColor: color,
        color: filter === filterName ? 'white' : color,
        bg: filter === filterName ? color : null,
        boxShadow: 'none',
        borderWidth: '1px',
        ':hover': {
          transform: "none",
          bg: color,
          color: 'white',
          borderColor: color
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
