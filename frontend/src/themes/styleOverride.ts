export default function componentStyleOverrides(theme:any) {
    const bgColor = theme.colors?.paper;
    return {
      MuiButton: {
        styleOverrides: {
          root: {
            width: '124px',
            padding: '10px',
            fontWeight: '100 !important',
            borderRadius: '25px',
            boxShadow:'none',
            '&:hover': {
              boxShadow:'none'
            },
            '&.MuiButton-containedSuccess': {
              color:theme.colors?.paper,
              '&:hover': {
                backgroundColor: theme.colors?.successMain
              },
            }
          },
          contained: {
            color:'#fff !important',
          }
        }
      },
      MuiAppBar:{
        styleOverrides: {
          root: {
            backgroundColor:'#fff',
            boxShadow:'0px 1px 18px 1px #BFD5EB'
          }
      }
    },
      MuiContainer: {
        styleOverrides: {
          root: {
            padding:'40px !important',
            margin:'0 !important'
          }
        }
      },

      MuiInputBase: {
        styleOverrides: {
          input: {
            color: theme.textDark,
            '&::placeholder': {
              color: theme.darkTextSecondary,
              fontSize: '0.875rem'
            }
          }
        }
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            background: bgColor,
            // borderRadius: `${theme?.customization?.borderRadius}px`,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.colors?.grey200
            },
            '&:hover $notchedOutline': {
              borderColor: theme.colors?.primaryLight
            },
            '&.MuiInputBase-multiline': {
              padding: 1
            }
          },
          input: {
            background: bgColor,
            padding: '15.5px 14px',
            // borderRadius: `${theme?.customization?.borderRadius}px`,
            '&.MuiInputBase-inputSizeSmall': {
              padding: '10px 14px',
              '&.MuiInputBase-inputAdornedStart': {
                paddingLeft: 0
              }
            }
          },
          inputAdornedStart: {
            paddingLeft: 4
          },
          notchedOutline: {
            // borderRadius: `10px`
          }
        }
      },
     
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: theme.divider,
            opacity: 1
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
           marginBottom:0
          }
        }
      }, 
      MuiCheckbox: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: theme.colors?.primaryDark
            },
            "&.MuiCheckbox-indeterminate": {
              color: theme.colors?.primaryDark
            }
          }
  
        }
      },
      MuiTableRow:{
        styleOverrides: {
          root: {
            "&.td": {
              backgroundColor:'none !important'
            }
          }
        }
      },
      
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            // Controls default (unchecked) color for the thumb
            color:  theme.colors?.grey800
          },
          colorPrimary: {
            "&.Mui-checked": {
              // Controls checked color for the thumb
              color: theme.colors?.primaryDark
            }
          },
          track: {
            // Controls default (unchecked) color for the track
            opacity: 1,
            backgroundColor: '#E6E6E6 !important',
            ".Mui-checked.Mui-checked + &": {
              // Controls checked color for the track
              opacity: 1,
              backgroundColor: theme.colors?.grey700
            }
          }
        }
      },
    };
  }
  