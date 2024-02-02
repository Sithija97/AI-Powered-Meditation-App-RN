
export default function themeTypography(theme:any) {
  return {
    fontFamily: "poppins",
    smalltext: {
      color: theme.heading,
      fontSize: '0.75rem' //12px
    },
    mediumtext: {
      color: theme.heading,
      fontSize: '0.875rem' //14px
    },
    para: {
      color: theme.heading,
      fontSize: '0.938rem' //15px
    },
    h4: {
      fontSize: '1.125rem', //18px
      color: theme.heading,
    },
    h3: {
      fontSize: '1.25rem', //20px
      color: theme.heading,
    },
    h2: {
      fontSize: '1.5rem', //24px
      color: theme.heading,
    },
    h1: {
      fontSize: '1.75rem', //28px
      color: theme.heading,
    },
    subtitle3: {
      fontSize: '1.875rem',
      color: theme.heading,
    },
  };
}
