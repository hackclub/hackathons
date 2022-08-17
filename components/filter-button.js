import { Button } from 'theme-ui'

const FilterButton = ({ children, sx, color, onClick, filter }) => {
  return (
    <Button
      variant="outline"
      sx={{
        borderRadius: 6,
        boxShadow: 'none',
        borderColor: color,
        color: color,
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
